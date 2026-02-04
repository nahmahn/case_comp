import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useState } from 'react';

interface StrategyBeaconProps {
    title: string;
    onClick: () => void;
    position?: string; // Tailwind classes for positioning (e.g., "top-10 left-10")
    delay?: number;
}

export function StrategyBeacon({ title, onClick, position = "", delay = 0 }: StrategyBeaconProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={`absolute z-20 ${position}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.8 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering parent clicks
                    onClick();
                }}
                className="group flex items-center gap-3"
            >
                {/* Pulsing Icon Node */}
                <div className="relative">
                    <motion.div
                        className="absolute inset-0 bg-blue-400 rounded-full opacity-30"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all">
                        <BookOpen className="w-5 h-5 text-blue-100" />
                    </div>
                </div>

                {/* Expanding Label */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                        width: isHovered ? "auto" : 0,
                        opacity: isHovered ? 1 : 0
                    }}
                    className="overflow-hidden"
                >
                    <div className="bg-slate-900/80 backdrop-blur-md text-white text-sm font-medium px-4 py-2 rounded-lg whitespace-nowrap shadow-xl border border-white/10">
                        {title}
                    </div>
                </motion.div>
            </button>
        </motion.div>
    );
}
