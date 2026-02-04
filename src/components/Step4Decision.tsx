import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, Truck, RotateCw, Sparkles, CheckCircle2, Info, X } from 'lucide-react';
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
                        <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
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

export function Step4Decision() {
    const [activeInfo, setActiveInfo] = useState<string | null>(null);
    const [contextContent, setContextContent] = useState<{ title: string, content: string } | null>(null);

    const actions = [
        {
            icon: ArrowLeftRight,
            title: "Inter-Store Transfer",
            subtitle: "Move 30 units from Store A",
            detail: "Store A surplus: 85 units • Distance: 3.2 km • ETA: 4 hours",
            color: "#3B82F6",
            info: "Automatically initiates a stock transfer from the nearest location with surplus inventory. The system calculates the optimal transfer quantity considering both locations' safety stock levels."
        },
        {
            icon: Truck,
            title: "Route ONDC Orders",
            subtitle: "Redirect to nearest FC",
            detail: "Bhiwandi FC stock: 200+ units • Fulfillment shift initiated",
            color: "#14B8A6",
            info: "For incoming ONDC orders, the system automatically routes fulfillment to the Bhiwandi Fulfillment Center instead of Store B. This prevents stockouts while maintaining customer delivery promises."
        },
        {
            icon: RotateCw,
            title: "Trigger Supplier Reorder",
            subtitle: "Auto-generate PO #4492",
            detail: "Vendor: Arvind Mills • Lead time: 5 days • Qty: 100 units",
            color: "#8B5CF6",
            info: "Purchase order is automatically generated and sent to the primary supplier. The reorder quantity is calculated using Economic Order Quantity (EOQ) formulas considering lead time and demand forecast."
        },
    ];

    return (
        <motion.div
            key="step4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full flex flex-col items-center justify-center p-4 select-none"
        >
            {/* Strategy Beacons - Strategic Density */}
            <StrategyBeacon
                title="Orchestration Logic"
                position="top-10 left-10"
                delay={1.5}
                onClick={() => setContextContent({
                    title: "Automated Orchestration",
                    content: "This is where the ROI happens. SyncOne doesn't just flag the problem; it fixes it. By automating the 'Inter-Store Transfer' and 'ONDC Rerouting', we eliminate the 4-hour delay typical of human decision-making. This enables 'Save the Sale' capabilities that manual systems simply cannot achieve, directly impacting the bottom line."
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
            {actions.map(action => (
                <InfoPanel
                    key={action.title}
                    title={action.title}
                    content={action.info}
                    isOpen={activeInfo === action.title}
                    onClose={() => setActiveInfo(null)}
                />
            ))}
            <InfoPanel
                title="Decision Logic: Coordinated Response"
                content="Instead of disjointed manual fixes, the Decision Engine executes three simultaneous maneuvers: 
                1) Balances local inventory via Inter-Store Transfer. 
                2) Protects customer experience by Routing ONDC orders to the Warehouse. 
                3) Replenishes global supply by Triggering a Vendor Reorder. 
                4) All actions happen instantly in parallel."
                isOpen={activeInfo === "engine"}
                onClose={() => setActiveInfo(null)}
            />

            {/* Central Hub */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                onClick={() => setActiveInfo("engine")}
                className="mb-8 cursor-pointer group relative z-10"
            >
                {/* Ripple effects */}
                {[1, 2, 3].map((ring) => (
                    <motion.div
                        key={ring}
                        className="absolute rounded-full border border-blue-300/40"
                        style={{
                            width: 80 + ring * 40,
                            height: 80 + ring * 40,
                            left: `calc(50% - ${(80 + ring * 40) / 2}px)`,
                            top: `calc(50% - ${(80 + ring * 40) / 2}px - 80px)`,
                        }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
                        transition={{ duration: 2, delay: ring * 0.3, repeat: Infinity }}
                    />
                ))}

                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-2xl shadow-blue-500/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                        <Sparkles className="w-10 h-10 text-white" />
                    </motion.div>

                    {/* Click hint tooltip - Always visible for clarity */}
                    <div className="absolute top-full mt-4 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-blue-100 whitespace-nowrap z-20">
                        Click to Explain Strategy
                    </div>
                </div>
                <div className="text-center mt-12">
                    <span className="text-lg font-bold text-blue-600 uppercase tracking-widest">Decision Engine</span>
                </div>
            </motion.div>

            {/* Action Cards - Horizontal Layout */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
                {actions.map((action, i) => (
                    <motion.div
                        key={action.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.2 }}
                        onClick={() => setActiveInfo(action.title)}
                        className="bg-white rounded-2xl shadow-lg border-2 overflow-hidden cursor-pointer hover:shadow-xl transition-all group"
                        style={{ borderColor: action.color }}
                    >
                        {/* Card Header */}
                        <div
                            className="p-4 flex items-center gap-3"
                            style={{ backgroundColor: `${action.color}10` }}
                        >
                            <div
                                className="p-2.5 rounded-xl shadow-md"
                                style={{ backgroundColor: action.color }}
                            >
                                <action.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-slate-900 text-sm">{action.title}</h3>
                                <p className="text-xs text-slate-500 truncate">{action.subtitle}</p>
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1 + i * 0.2 }}
                                className="p-1 bg-green-500 rounded-full flex-shrink-0"
                            >
                                <CheckCircle2 className="w-4 h-4 text-white" />
                            </motion.div>
                        </div>

                        {/* Card Detail */}
                        <div className="px-4 py-3 border-t border-slate-100">
                            <p className="text-xs text-slate-500 leading-relaxed">{action.detail}</p>
                        </div>

                        {/* Executing Badge */}
                        <div className="px-4 py-2 bg-green-50 flex items-center justify-between">
                            <span className="text-xs font-bold text-green-600 uppercase">Executing</span>
                            <motion.div
                                className="flex gap-1"
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            </motion.div>
                        </div>

                        {/* Click hint - Subtler */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full border border-blue-100 shadow-sm">
                                Details
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-8 text-center"
            >
                <p className="text-lg text-slate-600 font-medium">
                    From insight to <span className="text-blue-600 font-bold">coordinated action</span> within one system.
                </p>
            </motion.div>
        </motion.div>
    );
}
