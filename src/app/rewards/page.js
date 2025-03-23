'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const REWARDS = [
    {
        title: '10% de descuento en Nike en moda deportiva',
        description: 'Disponible en marcas seleccionadas durante esta semana.',
        points: 120,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYgxllRw6d6x6w2wAhrNxcerC0PSAnpGKldQ&s',
    },
    {
        title: 'Experiencia spa para 2 personas',
        description: 'Incluye circuito hidrotermal y masaje relajante.',
        points: 3500,
        image: 'https://media.smartbox.com/pim/1000002549349909126450.jpg',
    },
    {
        title: 'Corte y peinado en salón de belleza exclusivo',
        description: 'Reserva en centros seleccionados dentro de ECI.',
        points: 200,
        image: 'https://www.elcorteingles.es/centroscomerciales/uploads/service/logo/1065/Christelle%20Boe.jpg',
    },
    {
        title: 'Rafting en los Pirineos con guía experto',
        description: 'Incluye seguro, equipo y traslado desde Huesca.',
        points: 50000,
        image: 'https://media.smartbox.com/pim/1000002494400627753967.jpg',
    },
    {
        title: '20% en decoración para hogar sostenible',
        description: 'Aplica a productos eco-friendly de la colección actual.',
        points: 300,
        image: 'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg',
    }
];

export default function RewardsPage() {
    const [userPoints, setUserPoints] = useState(420);

    const handleRedeem = (reward) => {
        if (userPoints >= reward.points) {
            setUserPoints((prev) => prev - reward.points);
            alert(`Has canjeado "${reward.title}" por ${reward.points * 10} ECI-Coins 🎉`);
        } else {
            alert('No tienes suficientes puntos 😔');
        }
    };

    return (
        <div className="min-h-screen bg-green-50 text-gray-800 pb-24 px-4 py-8">
            <div className="max-w-5xl mx-auto">
                <Link
                    href="/profile"
                    className="inline-flex items-center text-sm text-green-700 hover:text-green-900 mb-4"
                >
                    <FaArrowLeft className="mr-2" /> Volver al perfil
                </Link>

                <h1 className="text-2xl font-bold text-center mb-2 text-green-800">Tus Recompensas 🎁</h1>
                <p className="text-center text-gray-600 mb-8">
                    Tienes{' '}
                    <span className="text-green-700 font-semibold">{userPoints * 10}</span>{' '}
                    ECI-Coins acumulados
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {REWARDS.map((reward, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow hover:shadow-lg transition border border-gray-200 flex flex-col"
                        >
                            <img
                                src={reward.image}
                                alt={reward.title}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-lg text-green-700 font-semibold mb-1">{reward.title}</h2>
                                    <p className="text-sm text-gray-600">{reward.description}</p>
                                </div>
                                <button
                                    onClick={() => handleRedeem(reward)}
                                    className="mt-4 w-full py-2 text-sm rounded bg-green-700 text-white hover:bg-green-800 transition"
                                >
                                    Canjear por {reward.points * 10} ECI-Coins
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
