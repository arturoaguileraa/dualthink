'use client';
import { useState } from 'react';

export default function CartPage() {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSend = async () => {
        if (!message.trim()) return;

        setLoading(true);
        setError('');
        setProducts([]);

        const prompt = `
Eres un asistente de compras de El Corte Inglés. Devuelve una lista de ideas de regalo en formato JSON. Recuerda que no solo se trata de productos, sino de experiencias, servicios, etc.
Cada objeto debe tener: "title", "description", "price" (en euros, sin símbolo). No expliques nada fuera del JSON. Si el usuario te da un presupuesto la suma de los productos debe ser aproximado a lo que pide, a poder ser menor.
Si el mensaje del usuario no tiene nada que ver devuelve error.
Ejemplo de respuesta:
[
  {
    "title": "Set de vinos seleccionados",
    "description": "Caja regalo con 3 botellas de Rioja y Ribera del Duero.",
    "price": 35.90
  },
  ...
]

Mensaje del usuario: ${message}
    `.trim();

        try {
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            // Extraemos intento de JSON de la respuesta
            const match = data.content.match(/\[.*\]/s);
            if (!match) throw new Error('No JSON found');

            const parsed = JSON.parse(match[0]);
            setProducts(parsed);
        } catch (err) {
            setError('Ups!! No lo he podido hacer. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const total = products.reduce((sum, p) => sum + p.price, 0);

    return (
        <div
            className="bg-green-50 text-gray-800 px-4 py-9"
            style={{ minHeight: 'calc(100vh - 60px)' }}
        >
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-green-800 text-center">Tu Cesta 🛍️</h1>

                {products.length > 0 && (
                    <p className="text-center text-gray-700 mb-6">
                        {products.length} producto{products.length > 1 ? 's' : ''} –{' '}
                        <span className="text-green-800 font-semibold">
                            Total: {total.toFixed(2)} €
                        </span>
                    </p>
                )}

                {error && (
                    <p className="text-center text-red-500 font-medium mb-6">{error}</p>
                )}

                {products.length === 0 && !loading && (
                    <p className="text-center text-gray-500 mb-12">
                        Tu cesta está vacía… pero puedo ayudarte a llenarla 😉
                    </p>
                )}

                {loading && (
                    <div className="flex justify-center items-center mb-8 text-green-700 font-medium text-lg">
                        <span className="animate-pulse">Pensando</span>
                        <span className="animate-bounce mx-1 delay-100">.</span>
                        <span className="animate-bounce mx-1 delay-200">.</span>
                        <span className="animate-bounce mx-1 delay-300">.</span>
                    </div>
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

                {/* Chat input */}
                <div className="fixed bottom-15 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
                    <div className="max-w-4xl mx-auto flex items-center gap-2">
                        <textarea
                            placeholder="Describe lo que necesitas…"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={1}
                            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300 resize-none overflow-hidden leading-snug"
                            onInput={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
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
