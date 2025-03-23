'use client';
import { FaCopy, FaShareAlt, FaTimes } from 'react-icons/fa';

export default function ShareModal({ onClose, video }) {
    const shareUrl = `https://www.elcorteingles.es/moda-mujer/ropa/${video.id}`;

    const handleCopy = async () => {
        const message = `Mira este artículo que he encontrado en El Corte Inglés!\n${shareUrl}`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(message);
                alert('Texto copiado al portapapeles');
                onClose();
            } catch (err) {
                console.error('Error al copiar con clipboard API', err);
            }
        } else {
            // Fallback para navegadores sin clipboard API (como Safari iOS)
            const textarea = document.createElement('textarea');
            textarea.value = message;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                alert('Texto copiado al portapapeles');
            } catch (err) {
                console.error('No se pudo copiar el texto');
            }
            document.body.removeChild(textarea);
            onClose();
        }
    };



    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Mira esta prenda',
                    text: 'Descubre este look en El Corte Inglés',
                    url: shareUrl,
                });
                onClose();
            } catch (err) {
                console.error(err);
            }
        } else {
            alert('Tu navegador no soporta compartir nativo');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-6 w-80 relative text-black text-center">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-black"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>
                <h2 className="text-lg font-semibold mb-4">Compartir</h2>
                <div className="flex flex-col gap-3">
                    <button
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                        onClick={handleCopy}
                    >
                        <FaCopy /> Copiar enlace
                    </button>
                    <button
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-100 hover:bg-blue-200 transition"
                        onClick={handleNativeShare}
                    >
                        <FaShareAlt /> Compartir en apps
                    </button>
                </div>
            </div>
        </div>
    );
}
