import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedNumberProps {
    value: number;
    duration?: number;
    className?: string;
    prefix?: string;
    suffix?: string;
    delay?: number;
}

export function AnimatedNumber({
    value,
    duration = 2,
    className,
    prefix = "",
    suffix = "",
    delay = 0
}: AnimatedNumberProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const spring = useSpring(0, {
        duration: duration * 1000,
        bounce: 0,
        stiffness: 50,
        damping: 20
    });

    const displayValue = useTransform(spring, (current) => Math.round(current));

    useEffect(() => {
        if (isInView) {
            setTimeout(() => {
                spring.set(value);
            }, delay * 1000);
        }
    }, [isInView, value, delay, spring]);

    return (
        <motion.span ref={ref} className={className}>
            {prefix}
            <motion.span>{displayValue}</motion.span>
            {suffix}
        </motion.span>
    );
}
