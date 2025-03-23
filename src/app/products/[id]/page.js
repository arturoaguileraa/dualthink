"use client";
import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { notFound } from "next/navigation";

export default function ProductPage({ params }) {
  const product = products.find((p) => p.id.toString() === params.id);

  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <header className="py-6 mb-6">
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
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Volver a productos
          </Link>
          <h1 className="text-3xl font-bold text-green-800">
            El Corte Inglés - Moda
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow p-6 md:flex gap-6">
          {/* Galería de imágenes */}
          <div className="w-full md:w-1/2">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded overflow-hidden border-2 ${
                    selectedImage === img
                      ? "border-green-600"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Miniatura ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <h2 className="text-2xl font-bold mb-2 text-gray-700">
              {product.name}
            </h2>

            <div className="flex items-center mb-4">
              <div className="flex text-amber-500 mr-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(product.rating) ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                {product.rating} ({product.reviewCount} valoraciones)
              </span>
            </div>

            <p className="text-2xl font-semibold text-green-700 mb-4">
              {product.price.toFixed(2)} €
            </p>

            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-1">Descripción:</h3>
              <p className="text-gray-600 text-sm">{product.description}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-1">Material:</h3>
              <p className="text-gray-600 text-sm">{product.material}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-1">
                Colores disponibles:
              </h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{
                      backgroundColor: color.includes("-")
                        ? color.split("-")[1]
                        : color,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-1">Tallas:</h3>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="px-3 py-1 border border-gray-300 rounded hover:border-green-600"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button className="bg-green-700 text-white py-3 px-6 rounded-full hover:bg-green-800 transition-colors flex-1">
                Añadir a la cesta
              </button>
              <button className="border border-green-700 text-green-700 py-3 px-6 rounded-full hover:bg-green-50 transition-colors flex-1">
                Añadir a favoritos
              </button>
            </div>

            {/* Opciones IA */}
            <div className="mt-8 p-4 bg-green-100 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">
                Probador Virtual y Recomendaciones
              </h3>
              <div className="flex flex-col gap-2 text-sm text-green-700">
                <button className="text-left hover:underline">
                  👗 Ver cómo me queda
                </button>
                <button className="text-left hover:underline">
                  📏 Recomendación de talla
                </button>
                <button className="text-left hover:underline">
                  🎨 Combinar con otros productos
                </button>
                <button
                  className="text-left hover:underline"
                  onClick={() => (window.location.href = "/ai-stylist")}
                >
                  Ir al Estilista Virtual
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-16 py-8 bg-white border-t text-sm text-center text-gray-500">
        <p>© 2025 El Corte Inglés. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/about" className="hover:underline">
            Sobre nosotros
          </Link>
          <Link href="/contact" className="hover:underline">
            Contacto
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacidad
          </Link>
        </div>
      </footer>
    </div>
  );
}
