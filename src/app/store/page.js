'use client';
import Link from 'next/link';

export default function StorePage() {
    return (
        <div
            className="bg-green-50 text-gray-800 px-4 py-12"
            style={{ minHeight: 'calc(100vh - 60px)' }}
        >
            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">
                    🧠 Descubre el Agente de IA en tu Cesta
                </h1>
                <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                    No siempre sabemos qué regalar o qué comprar. Por eso, ahora en El Corte Inglés, puedes usar nuestra
                    inteligencia artificial para que te sugiera productos según tus gustos, necesidades y presupuesto.
                </p>

                <div className="bg-white border border-green-200 shadow-md rounded-xl p-6 mb-12 text-left max-w-3xl mx-auto">
                    <h2 className="text-xl text-green-700 font-semibold mb-2">
                        ¿Cómo funciona?
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Escribe en la cesta algo como: <br />
                            <span className="italic text-green-800">“Quiero hacer un regalo de cumpleaños por menos de 30€, es para una persona que le gusta la música.”</span>
                        </li>
                        <li>El asistente pensará y te propondrá ideas únicas en segundos.</li>
                        <li>Puedes ajustar lo que dices tantas veces como quieras.</li>
                        <li>Y si te gusta algo, lo añades a la cesta con un clic.</li>
                    </ul>
                </div>

                <Link
                    href="/cesta"
                    className="inline-block bg-green-700 text-white text-lg px-6 py-3 rounded hover:bg-green-800 transition"
                >
                    Probar el Asistente de IA
                </Link>
            </div>
        </div>
    );
}
