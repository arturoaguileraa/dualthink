"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { products } from "@/data/products";

export default function AIStylistPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [resultText, setResultText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [productImageBase64, setProductImageBase64] = useState(null);
  const [streamRef, setStreamRef] = useState(null);
  const [usingDefaultModel, setUsingDefaultModel] = useState(true);

  // Limpiar el stream de la cámara cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (streamRef) {
        streamRef.getTracks().forEach((track) => track.stop());
      }
    };
  }, [streamRef]);

  // Cargar la imagen del modelo por defecto
  useEffect(() => {
    if (usingDefaultModel && !userImage) {
      loadDefaultModelImage();
    }
  }, [usingDefaultModel, userImage]);

  const loadDefaultModelImage = async () => {
    try {
      // Cargar la imagen del modelo por defecto desde public
      const response = await fetch("/images/default-model.jpg");
      const blob = await response.blob();
      const file = new File([blob], "default-model.jpg", {
        type: "image/jpeg",
      });
      processUserImage(file);
    } catch (error) {
      console.error("Error al cargar la imagen del modelo por defecto:", error);
    }
  };

  const handleProductSelect = async (product) => {
    setSelectedProduct(product);
    // Cargar la imagen del producto y convertirla a base64
    try {
      const response = await fetch(product.images[0]);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result.split(",")[1];
        setProductImageBase64(base64);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error al cargar la imagen del producto:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUsingDefaultModel(false);
      processUserImage(file);
    }
  };

  const processUserImage = (file) => {
    setUserImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      // Crear una imagen para obtener dimensiones y aplicar restricciones
      const img = new Image();
      img.onload = () => {
        // Creo un canvas para redimensionar si es necesario
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Definir el ancho máximo (límite de ancho pero no de alto)
        const maxWidth = 800;
        let width = img.width;
        let height = img.height;

        // Solo redimensionar si el ancho es mayor que el máximo
        if (width > maxWidth) {
          // Mantener la proporción
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        // Configurar dimensiones del canvas
        canvas.width = width;
        canvas.height = height;

        // Dibujar la imagen en el canvas (redimensionada si era necesario)
        ctx.drawImage(img, 0, 0, width, height);

        // Obtener la imagen como data URL
        const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setImagePreview(resizedDataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const openCamera = async () => {
    try {
      setUsingDefaultModel(false);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      setStreamRef(stream);
      setIsCameraOpen(true);

      // Una vez que se muestra el componente de la cámara, configuramos el vídeo
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      setError(
        "No se pudo acceder a la cámara. Por favor, revisa los permisos."
      );
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    // Configurar el canvas con las dimensiones del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Dibujar el frame actual del video en el canvas
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convertir a data URL (base64)
    const photoDataUrl = canvas.toDataURL("image/jpeg", 0.85);

    // Detener la cámara
    if (streamRef) {
      streamRef.getTracks().forEach((track) => track.stop());
    }

    // Crear un archivo a partir del data URL para mantener consistencia con el flujo existente
    fetch(photoDataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "camera-photo.jpg", {
          type: "image/jpeg",
        });
        setUsingDefaultModel(false);
        processUserImage(file);
        setIsCameraOpen(false);
        setStreamRef(null);
      });
  };

  const closeCamera = () => {
    if (streamRef) {
      streamRef.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
    setStreamRef(null);
  };

  const handleSubmit = async () => {
    if (!selectedProduct || !imagePreview) {
      setError("Por favor selecciona un producto y sube una foto");
      return;
    }

    if (!productImageBase64) {
      setError(
        "No se pudo cargar la imagen del producto. Intenta seleccionarlo nuevamente."
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    setResultImage(null);
    setResultText(null);

    try {
      // Convert image to base64
      const base64Image = imagePreview.split(",")[1];

      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userImage: base64Image,
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          productImage: productImageBase64,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al generar la imagen");
      }

      const data = await response.json();
      setResultImage(data.imageUrl);
      if (data.responseText) {
        setResultText(data.responseText);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setError(
        "Hubo un error al generar la imagen. Por favor intenta de nuevo."
      );
      setIsLoading(false);
    }
  };

  const handleSaveImage = () => {
    if (!resultImage) return;

    // Crear un enlace temporal para descargar la imagen
    const link = document.createElement("a");
    link.href = resultImage;
    link.download = `ai-stylist-${selectedProduct.name
      .replace(/\s+/g, "-")
      .toLowerCase()}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-green-50 text-gray-800 min-h-screen flex flex-col">
      <header className="py-6">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="text-green-700 hover:underline inline-flex items-center mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Volver a Inicio
          </Link>
          <h1 className="text-3xl font-bold text-green-800">AI Dress</h1>
          <p className="text-gray-600">
            Prueba nuestros productos virtualmente con IA
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-12 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white p-6 rounded-xl shadow mb-6">
              <h2 className="text-xl font-semibold mb-4">
                1. Selecciona un producto
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`border rounded-lg p-2 cursor-pointer transition-all ${
                      selectedProduct?.id === product.id
                        ? "border-green-500 ring-2 ring-green-500"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                    onClick={() => handleProductSelect(product)}
                  >
                    <div className="aspect-square bg-gray-100 rounded-md overflow-hidden mb-2">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-green-700">{product.price}€</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">2. Sube tu foto</h2>

              {isCameraOpen ? (
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-xs mb-4 relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full rounded-lg"
                    />
                    <canvas ref={canvasRef} style={{ display: "none" }} />
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      onClick={closeCamera}
                    >
                      Cancelar
                    </button>
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      onClick={takePhoto}
                    >
                      Tomar foto
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  {imagePreview ? (
                    <div className="w-full max-w-xs mb-4">
                      <div className="bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Vista previa"
                          className="w-full object-contain max-h-96"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      {usingDefaultModel && (
                        <div className="mt-2 text-center">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Modelo por defecto
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className="w-full max-w-xs aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center mb-4 cursor-pointer border-2 border-dashed border-gray-300 hover:border-green-500"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <p className="text-sm text-gray-500">
                        Haz clic para subir tu foto
                      </p>
                    </div>
                  )}
                  <div className="flex gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <svg
                        className="h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l4-4m0 0l-4-4m4 4H4"
                        />
                      </svg>
                      {imagePreview ? "Cambiar foto" : "Subir foto"}
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      onClick={openCamera}
                    >
                      <svg
                        className="h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Usar cámara
                    </button>
                    {/*!usingDefaultModel && (
                      <button
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                        onClick={() => {
                          setUsingDefaultModel(true);
                          loadDefaultModelImage();
                        }}
                      >
                        <svg
                          className="h-5 w-5 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Modelo por defecto
                      </button>
                    )*/}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6">
              <button
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  !selectedProduct || !imagePreview
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
                onClick={handleSubmit}
                disabled={!selectedProduct || !imagePreview || isLoading}
              >
                {isLoading ? "Generando imagen..." : "Probar producto"}
              </button>
              {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-xl shadow h-full">
              <h2 className="text-xl font-semibold mb-4">3. Resultado</h2>
              {resultImage ? (
                <div className="w-full">
                  <div className="bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={resultImage}
                      alt="Resultado virtual"
                      className="w-full object-contain max-h-[70vh]"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  {resultText && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                      <p>{resultText}</p>
                    </div>
                  )}
                  <div className="mt-4 flex justify-center">
                    <button
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                      onClick={handleSaveImage}
                    >
                      <svg
                        className="h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Guardar imagen
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-[calc(100%-2rem)] flex flex-col items-center justify-center text-center">
                  {isLoading ? (
                    <div className="animate-pulse">
                      <svg
                        className="w-12 h-12 text-green-500 mx-auto mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <p className="text-gray-600">
                        Generando tu imagen con IA...
                      </p>
                      <p className="text-gray-500 text-sm mt-2">
                        Esto puede tardar unos segundos
                      </p>
                    </div>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-gray-300 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-gray-700">
                        Selecciona un producto y sube tu foto para ver cómo te
                        queda
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        Nuestra IA generará una imagen tuya con el producto
                        seleccionado
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
