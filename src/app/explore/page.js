'use client';
import { useEffect, useState, useRef } from 'react';
import { FaHeart, FaPaperPlane } from 'react-icons/fa';
import { DESCRIPTIONS } from '@/data/descriptions';
import ShareModal from '@/components/ShareModal';


export default function ExplorePage() {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [likes, setLikes] = useState({});
    const [likeCounts, setLikeCounts] = useState({});
    const [descriptions, setDescriptions] = useState({});
    const [shareVideo, setShareVideo] = useState(null);
    const loaderRef = useRef(null);
    const apiKey = 'y60bvwgVJxUkNNUUr3LD9hxQXR7s6VOjLyFPdhBQ5N3xaykfIqaQqbWt';

    // Obtener videos
    useEffect(() => {
        const fetchVideos = async () => {
            const res = await fetch(
                `https://api.pexels.com/videos/search?query=fashion&orientation=portrait&per_page=10&page=${page}`,
                {
                    headers: { Authorization: apiKey },
                }
            );
            const data = await res.json();
            const newLikes = {};
            const newCounts = {};
            const newDescriptions = {};
            data.videos.forEach((video) => {
                newLikes[video.id] = false;
                newCounts[video.id] = Math.floor(Math.random() * (20000 - 700 + 1)) + 700;
                newDescriptions[video.id] = DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)];
            });
            setLikes((prev) => ({ ...prev, ...newLikes }));
            setLikeCounts((prev) => ({ ...prev, ...newCounts }));
            setVideos((prev) => [...prev, ...data.videos]);
            setDescriptions((prev) => ({ ...prev, ...newDescriptions }));
        };

        fetchVideos();
    }, [page]);

    // Scroll infinito
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1 }
        );
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, []);

    const toggleLike = (id) => {
        setLikes((prev) => {
            const newState = !prev[id];
            if (newState) {
                setLikeCounts((counts) => ({ ...counts, [id]: counts[id] + 0.5 }));
            } else {
                setLikeCounts((counts) => ({ ...counts, [id]: counts[id] - 0.5 }));
            }
            return { ...prev, [id]: newState };
        });
    };

    const handleDoubleTap = (id) => {
        if (!likes[id]) toggleLike(id);
    };

    return (
        <div className="h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar">
            {videos.map((video, index) => (
                <div
                    key={`${video.id}-${index}`}
                    className="h-[calc(100vh-60px)] w-screen snap-start relative flex items-center justify-center"
                    onDoubleClick={() => handleDoubleTap(video.id)}
                >
                    <video
                        src={video.video_files[0].link}
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        playsInline
                        loop
                        controls={false}
                    />
                    {shareVideo?.id === video.id && (
                        <ShareModal video={shareVideo} onClose={() => setShareVideo(null)} />
                    )}

                    {/* ❤️ Botón Me gusta + Probador Virtual + Compartir */}
                    <div className="absolute right-4 top-2/3 transform -translate-y-1/2 flex flex-col items-center gap-3">
                        {/* Like */}
                        <div className="flex items-center flex-col gap-1">
                            <button
                                onClick={() => toggleLike(video.id)}
                                className={`text-2xl p-2 rounded-full border-2 ${likes[video.id] ? 'border-red-500' : 'border-white/70'
                                    } bg-white/10 backdrop-blur-md`}
                            >
                                <FaHeart className={likes[video.id] ? 'text-red-500' : 'text-white'} />
                            </button>
                            <p className="text-white text-xs">{likeCounts[video.id]?.toLocaleString()}</p>
                        </div>

                        {/* Probador Virtual */}
                        <div className="flex items-center flex-col gap-1">
                            <button
                                onClick={() => alert('Probador Virtual abierto')}
                                className="p-2 rounded-full border-2 border-white/70 bg-white/10 backdrop-blur-md text-white flex items-center justify-center"
                            >
                                <AiIcon />
                            </button>
                            <p className="text-white text-xs">Probar</p>
                        </div>

                        {/* Compartir */}
                        <div className="flex items-center flex-col gap-1">
                            <button
                                onClick={() => setShareVideo(video)}
                                className="p-2 rounded-full border-2 border-white/70 bg-white/10 backdrop-blur-md text-white flex items-center justify-center"
                            >
                                <FaPaperPlane className="text-white text-lg" />
                            </button>

                            <p className="text-white text-xs">Compartir</p>
                        </div>
                    </div>




                    {/* Descripción inferior */}
                    <div className="absolute bottom-0 left-0 right-0 text-white p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <p className="text-sm font-semibold">@elcorteingles_user{index}</p>
                        <p className="text-base mb-3">
                            {descriptions[video.id] || "Descubre esta prenda ideal para primavera-verano ☀️"}
                        </p>
                    </div>
                </div>
            ))}
            <div ref={loaderRef} className="h-24" />
        </div>
    );
}


function AiIcon({ active }) {
    const color = 'white';

    return (
        <svg width="28" height="28" viewBox="0 0 32 32">
            {/* Triángulo (A) */}
            <polygon
                points="2,24 10,6 18,24"
                fill={color}
            />
            {/* Barra (I) */}
            <rect
                x="22"
                y="6"
                width="5"
                height="18"
                fill={color}
            />
        </svg>
    );
}
