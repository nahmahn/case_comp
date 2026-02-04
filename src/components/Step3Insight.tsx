import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, TrendingUp, Package, Clock, Activity, Info, X } from 'lucide-react';
import { useState } from 'react';
import { StrategyBeacon } from './StrategyBeacon';
import { ContextModal } from './ContextModal';

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
                        <div className="bg-amber-500 text-white p-4 flex items-center justify-between">
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

export function Step3Insight() {
    const [activeInfo, setActiveInfo] = useState<string | null>(null);
    const [contextContent, setContextContent] = useState<{ title: string, content: string } | null>(null);

    const metrics = [
        {
            icon: Package,
            value: "45",
            label: "Current Stock",
            color: "slate",
            info: "Current inventory count at Store B for the Denim Jacket SKU. This is determined by aggregating POS sales data and receiving records."
        },
        {
            icon: TrendingUp,
            value: "120",
            label: "7-Day Demand",
            color: "red",
            info: "Predicted demand based on historical sales velocity, seasonality, and current trends. Machine learning models analyze past 90 days of data."
        },
        {
            icon: Clock,
            value: "3",
            label: "Days to Stockout",
            color: "amber",
            info: "Calculated by dividing current stock by average daily sales velocity. This alert triggers when the value drops below the safety threshold (typically 7 days)."
        },
    ];

    return (
        <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full flex flex-col items-center justify-center p-4 select-none"
        >
            {/* Strategy Beacons - Strategic Density */}
            <StrategyBeacon
                title="Predictive Reality"
                position="top-10 right-10"
                delay={1.5}
                onClick={() => setContextContent({
                    title: "Beyond Basic BI",
                    content: "Most dashboards show what *happened*. SyncOne focuses on what *will happen*. By correlating '7-Day Demand' (120 units) against 'Current Stock' (45 units), we don't just show data points; we surface an immediate operational risk (-62.5% gap). This shift from descriptive to predictive analytics is what empowers store managers to act before a stockout occurs."
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
                title="Risk Detection"
                content="SyncOne continuously monitors inventory levels across all channels. When a potential stockout is detected (based on demand forecasting), it automatically generates an alert and prepares recommended actions. This proactive approach prevents lost sales before they happen."
                isOpen={activeInfo === "risk"}
                onClose={() => setActiveInfo(null)}
            />

            {/* Main Alert Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl"
            >
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
                    {/* Alert Header */}
                    <div
                        className="bg-gradient-to-r from-amber-50 to-red-50 border-b border-amber-100 p-5 cursor-pointer hover:from-amber-100 hover:to-red-100 transition-colors"
                        onClick={() => setActiveInfo("risk")}
                    >
                        <div className="flex items-center gap-4">
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="p-3 bg-gradient-to-br from-amber-400 to-red-500 rounded-xl shadow-lg"
                            >
                                <AlertTriangle className="w-8 h-8 text-white" />
                            </motion.div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-bold text-slate-900">Inventory Risk Detected</h2>
                                    <motion.span
                                        animate={{ opacity: [1, 0.6, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full"
                                    >
                                        CRITICAL
                                    </motion.span>
                                </div>
                                <p className="text-slate-500 font-medium mt-1">Store B · Denim Jacket (SKU: DNM-JKT-001)</p>
                            </div>
                            <div className="text-xs text-amber-600 font-medium opacity-70">Click for details</div>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="p-6 grid grid-cols-3 gap-4">
                        {metrics.map((metric, i) => (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.15 }}
                                onClick={() => setActiveInfo(metric.label)}
                                className={`rounded-2xl p-5 text-center cursor-pointer transition-all hover:shadow-lg ${metric.color === 'red'
                                    ? 'bg-red-50 border-2 border-red-200 hover:border-red-300'
                                    : metric.color === 'amber'
                                        ? 'bg-amber-50 border border-amber-200 hover:border-amber-300'
                                        : 'bg-slate-50 border border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                <metric.icon className={`w-7 h-7 mx-auto mb-2 ${metric.color === 'red' ? 'text-red-500' : metric.color === 'amber' ? 'text-amber-500' : 'text-slate-400'
                                    }`} />
                                <div className={`text-3xl font-bold ${metric.color === 'red' ? 'text-red-600' : metric.color === 'amber' ? 'text-amber-600' : 'text-slate-900'
                                    }`}>
                                    {metric.value}
                                </div>
                                <div className="text-sm text-slate-500 font-medium mt-1">{metric.label}</div>
                                <div className="text-xs text-blue-500 mt-2 opacity-0 group-hover:opacity-100">Click for info</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Risk Visualization */}
                    <div className="px-6 pb-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-slate-400" />
                                <span className="font-bold text-sm text-slate-700">Supply vs Demand Risk</span>
                            </div>
                            <span className="text-red-600 font-bold text-sm">-62.5% Gap</span>
                        </div>

                        <div className="h-5 bg-slate-100 rounded-full overflow-hidden relative">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "37.5%" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </div>

                        <div className="flex justify-between mt-2 text-xs">
                            <span className="text-green-600 font-medium">Supply: 45 units</span>
                            <span className="text-red-600 font-medium">Demand: 120 units</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-6 text-center"
            >
                <p className="text-lg text-slate-600 font-medium">
                    <span className="text-amber-600 font-bold">Proactive detection</span> replaces reactive firefighting.
                </p>
            </motion.div>
        </motion.div>
    );
}
