import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { TrendingDown, TrendingUp, Zap, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { StrategyBeacon } from './StrategyBeacon';
import { ContextModal } from './ContextModal';

function AnimatedCounter({ value, delay = 0 }: { value: number; delay?: number }) {
    const spring = useSpring(0, { duration: 2000, bounce: 0 });
    const display = useTransform(spring, (v) => Math.round(v));
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            spring.set(value);
        }, delay * 1000);

        const unsubscribe = display.on("change", (v) => setDisplayValue(v as number));

        return () => {
            clearTimeout(timeout);
            unsubscribe();
        };
    }, [value, delay, spring, display]);

    return <>{displayValue}</>;
}

interface InfoPanelProps {
    title: string;
    content: string;
    isOpen: boolean;
    onClose: () => void;
}

function InfoPanel({ title, content, isOpen, onClose }: InfoPanelProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
                    >
                        <div className="bg-green-600 text-white p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Info className="w-5 h-5" />
                                <h3 className="font-bold text-lg">{title}</h3>
                            </div>
                            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-slate-600 leading-relaxed">{content}</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export function Step5Outcome() {
    const [activeInfo, setActiveInfo] = useState<string | null>(null);
    const [contextContent, setContextContent] = useState<{ title: string, content: string } | null>(null);

    const metrics = [
        {
            icon: TrendingDown,
            value: 35,
            label: "Stockouts Reduced",
            color: "#10B981",
            gradient: "from-green-400 to-emerald-500",
            info: "35% reduction in stockout incidents across all channels. This translates to approximately ₹2.4 Cr in prevented lost sales annually for a mid-sized retailer."
        },
        {
            icon: TrendingUp,
            value: 22,
            label: "Sell-through Improved",
            color: "#3B82F6",
            gradient: "from-blue-400 to-blue-600",
            info: "22% improvement in sell-through rate (ratio of sold inventory to received inventory). Better demand matching means less markdown and waste."
        },
        {
            icon: Zap,
            value: 18,
            label: "Working Capital Efficiency",
            color: "#8B5CF6",
            gradient: "from-purple-400 to-violet-600",
            info: "18% improvement in working capital efficiency. Reduced safety stock requirements and faster inventory turnover frees up capital for growth."
        },
    ];

    return (
        <motion.div
            key="step5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full flex flex-col items-center justify-center p-4 select-none"
        >
            {/* Strategy Beacons - Strategic Density */}
            <StrategyBeacon
                title="Validation Logic: The Projection"
                position="top-24 left-10"
                delay={2}
                onClick={() => setContextContent({
                    title: "Theoretical Basis",
                    content: "Since historical SKU data wasn't provided, these figures are projected using established Inventory Theory:\n\n1) 35% Stockout Reduction: Based on the 'Portfolio Effect'—pooling inventory variance across 4 nodes statistically reduces stockout probability.\n2) 18% Capital Efficiency: Derived from the 'Square Root Law of Inventory' (Safety Stock ∝ √N). Unifying 4 silos theoretically yields ~50% lower variance; we projected a conservative 18% realization."
                })}
            />

            <StrategyBeacon
                title="Platform Moat: India Stack"
                position="top-24 right-10"
                delay={2.5}
                onClick={() => setContextContent({
                    title: "The ONDC Advantage",
                    content: "While competitors like SAP and Salesforce offer robust ERPs, they lack deep, native integration with India's digital public infrastructure (ONDC, UPI). SyncOne's 'India Stack Fabric' is not just a feature; it's a defensive moat. It allows for hyper-local discovery and lower-cost logistics that global giants simply cannot replicate without rebuilding their core architecture for the Indian market."
                })}
            />

            {/* Context Modal */}
            <ContextModal
                isOpen={contextContent !== null}
                onClose={() => setContextContent(null)}
                title={contextContent?.title || ""}
                content={contextContent?.content || ""}
            />

            {/* Info Panels */}
            {metrics.map(m => (
                <InfoPanel
                    key={m.label}
                    title={m.label}
                    content={m.info}
                    isOpen={activeInfo === m.label}
                    onClose={() => setActiveInfo(null)}
                />
            ))}
            <InfoPanel
                title="Business Impact: Operational Excellence"
                content="SyncOne delivers compounding value:
                1) Reduced stockouts (+35%) directly boosts revenue.
                2) Improved sell-through (+22%) minimizes markdown losses. 
                3) Better capital efficiency (+18%) frees up cash flow.
                Total estimated impact: ₹4.5 Cr annual improvement."
                isOpen={activeInfo === "impact"}
                onClose={() => setActiveInfo(null)}
            />

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-8 mb-12">
                {metrics.map((metric, i) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2, duration: 0.5 }}
                        onClick={() => setActiveInfo(metric.label)}
                        className="relative bg-white rounded-3xl shadow-xl p-8 text-center cursor-pointer hover:shadow-2xl transition-all group overflow-hidden"
                    >
                        {/* Top Gradient Bar */}
                        <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${metric.gradient}`} />

                        {/* Success Badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.2 + 0.5 }}
                            className="absolute top-3 right-3 p-1 bg-green-500 rounded-full"
                        >
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </motion.div>

                        {/* Icon */}
                        <motion.div
                            className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${metric.gradient} shadow-lg flex items-center justify-center mb-6`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                            <metric.icon className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Value */}
                        <div className="flex items-baseline justify-center gap-1 mb-2">
                            <span className="text-5xl font-bold" style={{ color: metric.color }}>
                                <AnimatedCounter value={metric.value} delay={i * 0.3 + 0.5} />
                            </span>
                            <span className="text-3xl font-bold" style={{ color: metric.color }}>%</span>
                        </div>

                        {/* Label */}
                        <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                            {metric.label}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Impact Statement */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-center max-w-3xl mb-8"
            >
                <h2 className="text-3xl font-bold text-slate-900 mb-3 leading-tight">
                    Vertical workflows create{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                        compounding operational value
                    </span>
                </h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="text-lg text-slate-500 font-medium"
                >
                    The future of retail is synchronized.
                </motion.p>
            </motion.div>

            {/* Brand Footer - Interactive Master Button */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
                onClick={() => setActiveInfo("impact")}
                className="flex items-center gap-3 px-6 py-3 bg-white border border-blue-100 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all group"
            >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                    <span className="block text-xs text-slate-400 font-medium uppercase tracking-wider">View Summary</span>
                    <span className="block text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">SyncOne Retail Impact</span>
                </div>
                <Info className="w-5 h-5 text-blue-400 group-hover:text-blue-600" />
            </motion.button>
        </motion.div>
    );
}
