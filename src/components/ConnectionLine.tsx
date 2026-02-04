import { motion } from 'framer-motion';

interface ConnectionLineProps {
    from: { x: number; y: number }; // Percentage (0-100)
    to: { x: number; y: number };   // Percentage (0-100)
    color?: string;
    dashed?: boolean;
    animate?: boolean;
    delay?: number;
    duration?: number;
    width?: number;
    className?: string; // For adding custom classes like 'opacity-50'
}

export function ConnectionLine({
    from,
    to,
    color = "#CBD5E1",
    dashed = true,
    animate = true,
    delay = 0,
    duration = 1.5,
    width = 2,
    className
}: ConnectionLineProps) {
    // SVG coordinates are 0-100, so we can use percentages easily
    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: duration,
                delay: delay,
                ease: "easeInOut" as const
            }
        },
        // For the "broken connection" effect in Step 1
        partial: {
            pathLength: 0.4,
            opacity: 1,
            transition: {
                duration: duration,
                delay: delay,
                ease: "easeOut" as const
            }
        }
    };

    return (
        <div className={`absolute inset-0 pointer-events-none z-0 ${className}`}>
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.line
                    x1={`${from.x}%`}
                    y1={`${from.y}%`}
                    x2={`${to.x}%`}
                    y2={`${to.y}%`}
                    stroke={color}
                    strokeWidth={width * 0.1} // Scaling factor for SVG
                    strokeDasharray={dashed ? "1 1" : "none"}
                    variants={pathVariants}
                    initial="hidden"
                    animate={animate ? (dashed && color.includes("red") ? "partial" : "visible") : "hidden"}
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}
