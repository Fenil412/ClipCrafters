import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Film } from 'lucide-react';
import { unsplash, IMAGES } from '../../utils/imageLoader';

export default function VideoPreview({ title = 'Untitled Video' }) {
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        <div className="flex flex-col h-full">
            <div className="relative flex-1 bg-black rounded-2xl overflow-hidden group"
                onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                {/* Poster */}
                <img src={unsplash(IMAGES.videoEditor, 1280, 720)} alt="video"
                    className="absolute inset-0 w-full h-full object-cover opacity-80" />

                {/* Center play */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                        onClick={() => setPlaying(v => !v)}
                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-glow"
                        style={{ background: 'rgba(124,58,237,0.85)', backdropFilter: 'blur(8px)' }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: hovered || !playing ? 1 : 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                    >
                        {playing ? <Pause className="w-7 h-7 text-white" /> : <Play className="w-7 h-7 text-white ml-0.5" />}
                    </motion.button>
                </div>

                {/* Title overlay */}
                <motion.div
                    className="absolute top-4 left-4 flex items-center gap-2"
                    initial={{ opacity: 0 }} animate={{ opacity: hovered ? 1 : 0 }}>
                    <Film className="w-4 h-4 text-purple-300" />
                    <span className="text-sm font-medium text-white">{title}</span>
                </motion.div>

                {/* Controls overlay */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4"
                    style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.8),transparent)' }}
                    initial={{ opacity: 0 }} animate={{ opacity: hovered ? 1 : 0 }}
                >
                    {/* Seek bar */}
                    <div className="w-full h-1 rounded-full mb-4 relative" style={{ background: 'rgba(255,255,255,0.15)' }}>
                        <div className="progress-fill absolute left-0 top-0 h-full" style={{ width: '35%' }} />
                        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-glow-sm" style={{ left: '35%', transform: 'translate(-50%,-50%)' }} />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setPlaying(v => !v)} className="text-white">
                                {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            </button>
                            <button onClick={() => setMuted(v => !v)} className="text-white">
                                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                            <span className="text-xs text-gray-300 font-mono">0:35 / 2:30</span>
                        </div>
                        <button className="text-white"><Maximize className="w-4 h-4" /></button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
