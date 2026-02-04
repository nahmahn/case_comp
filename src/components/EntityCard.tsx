import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface EntityCardProps {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    className?: string;
    accentColor?: string; // e.g. "bg-blue-500"
    delay?: number;
}

export function EntityCard({
    icon: Icon,
    title,
    subtitle,
    className,
    accentColor = "bg-blue-500",
    delay = 0
}: EntityCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                delay: delay,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }}
            className={cn(
                "relative flex items-center p-4 bg-white rounded-xl shadow-lg border border-slate-100 w-64 z-10",
                className
            )}
        >
            {/* Accent Bar */}
            <div className={cn("absolute left-0 top-3 bottom-3 w-1 rounded-r-full", accentColor)} />

            {/* Icon */}
            <div className={cn("ml-2 p-2.5 rounded-full bg-slate-50 text-slate-700 mr-4")}>
                <Icon className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="flex flex-col">
                <h3 className="text-sm font-bold text-slate-900 leading-tight">{title}</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{subtitle}</p>
            </div>
        </motion.div>
    );
}
