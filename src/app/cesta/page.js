'use client';
import { useState } from 'react';

export default function CartPage() {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!message.trim()) return;

        setLoading(true);

        // Simulación de llamada a Gemini (mock de respuesta)
        setTimeout(() => {
            const fakeProducts = [
                {
                    title: 'Paletero de pádel elegante',
                    description: 'Diseño premium en piel sintética con compartimentos térmicos.',
                    price: 49.99,
                },
                {
                    title: 'Pulsera de cuero minimalista',
                    description: 'Ideal para un look elegante pero casual.',
                    price: 39.95,
                },
                {
                    title: 'Calcetines técnicos de pádel (pack 3)',
                    description: 'Transpirables y con refuerzo en talón y puntera.',
                    price: 14.99,
                },
            ];
            setProducts(fakeProducts);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-green-50 text-gray-800 pb-32 px-4 pt-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-green-800 text-center">Tu Cesta 🛍️</h1>

                {products.length === 0 && !loading && (
                    <p className="text-center text-gray-500 mb-12">
                        Tu cesta está vacía… pero puedo ayudarte a llenarla 😉
                    </p>
                )}

                {loading && (
                    <p className="text-center text-green-700 font-medium mb-8 animate-pulse">
                        Pensando ideas con Gemini…
                    </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    {products.map((product, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow border border-gray-200 hover:shadow-md transition p-4 flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-lg text-green-700 font-semibold mb-1">{product.title}</h2>
                                <p className="text-sm text-gray-600">{product.description}</p>
                            </div>
                            <p className="mt-2 text-green-800 font-bold">{product.price.toFixed(2)} €</p>
                        </div>
                    ))}
                </div>

                <div className="fixed bottom-15 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
                    <div className="max-w-4xl mx-auto flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Describe lo que necesitas…"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
                            disabled={loading}
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
