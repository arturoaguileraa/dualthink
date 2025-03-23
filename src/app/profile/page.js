'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSettings } from 'react-icons/fi';

const LOOK_IMAGES = [
    "https://images.pexels.com/photos/6311586/pexels-photo-6311586.jpeg",
    "https://images.pexels.com/photos/6311583/pexels-photo-6311583.jpeg",
    "https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg",
    "https://images.pexels.com/photos/6311573/pexels-photo-6311573.jpeg",
    "https://images.pexels.com/photos/6311569/pexels-photo-6311569.jpeg",
    "https://images.pexels.com/photos/6311615/pexels-photo-6311615.jpeg",
    "https://images.pexels.com/photos/6311618/pexels-photo-6311618.jpeg",
    "https://images.pexels.com/photos/6311604/pexels-photo-6311604.jpeg",
    "https://images.pexels.com/photos/6311567/pexels-photo-6311567.jpeg"
];

export default function ProfilePage() {
    const user = {
        name: 'Laura Sánchez Arroyo',
        username: '@laurasanz',
        avatar: 'https://randomuser.me/api/portraits/women/75.jpg',
        bio: 'Amante de la moda sostenible 🌿 | Compartiendo mis looks favoritos de El Corte Inglés 👗',
        stats: {
            likes: 12890,
            shares: 242,
            tryOns: 76,
        },
        looks: Array.from({ length: 9 }, (_, i) => ({
            id: i,
            thumbnail: LOOK_IMAGES[i],
        })),
        points: 420,
        history: [
            { action: 'like_received', value: 2, date: '2025-03-22' },
            { action: 'share', value: 10, date: '2025-03-23' }
        ]
    };

    const [formattedLikes, setFormattedLikes] = useState('');

    useEffect(() => {
        setFormattedLikes(user.stats.likes.toLocaleString());
    }, []);

    const handleSettingsClick = () => {
        alert('Configuración en desarrollo...');
    };

    return (
        <div className="max-w-2xl mx-auto px-4 pt-6 pb-32 bg-green-50 min-h-screen text-gray-800 relative">
            {/* Icono de configuración */}
            <button
                onClick={handleSettingsClick}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                aria-label="Configuración"
            >
                <FiSettings size={24} />
            </button>

            {/* Avatar y nombre */}
            <div className="flex flex-col items-center text-center my-8">
                <Image
                    src={user.avatar}
                    alt="Perfil"
                    width={100}
                    height={100}
                    className="rounded-full border-4 border-white shadow-md"
                />
                <h2 className="text-xl font-semibold mt-3">{user.name}</h2>
                <p className="text-gray-500">{user.username}</p>
            </div>

            {/* Bio */}
            <p className="text-center text-sm text-gray-600 mb-4">{user.bio}</p>

            {/* Puntos */}
            <div className='flex items-center justify-around'>
                <div className="text-center my-4">
                    <p className="text-2xl font-bold text-green-600">{user.points * 10}</p>
                    <p className="text-sm text-gray-500">ECI-Coins acumulados</p>
                </div>
                <Link href="/rewards">
                    <div className="inline-block px-4 py-2 text-sm rounded-full bg-green-700 text-white hover:bg-green-800 transition shadow">
                        Canjear ECI-Coins 🎁
                    </div>
                </Link>
            </div>

            {/* Estadísticas */}
            <div className="flex justify-around text-center text-sm mb-8">
                <div>
                    <p className="font-bold">{formattedLikes}</p>
                    <p className="text-gray-500">Me gusta</p>
                </div>
                <div>
                    <p className="font-bold">{user.stats.shares}</p>
                    <p className="text-gray-500">Compartidos</p>
                </div>
                <div>
                    <p className="font-bold">{user.stats.tryOns}</p>
                    <p className="text-gray-500">Probador</p>
                </div>
            </div>

            {/* Galería de looks */}
            <h3 className="text-lg font-semibold mb-3 text-green-800">Mis Looks Compartidos</h3>
            <div className="grid grid-cols-3 gap-2">
                {user.looks.map((look) => (
                    <div key={look.id} className="aspect-[2/3] bg-gray-100 rounded overflow-hidden">
                        <img
                            src={look.thumbnail}
                            alt={`Look ${look.id}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
