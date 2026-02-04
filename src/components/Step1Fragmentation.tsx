import { motion, AnimatePresence } from 'framer-motion';
import { Store, ShoppingCart, Globe, ShoppingBag, AlertTriangle, X, Info } from 'lucide-react';
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

export function Step1Fragmentation() {
    const [activeInfo, setActiveInfo] = useState<string | null>(null);
    const [contextContent, setContextContent] = useState<{ title: string, content: string } | null>(null);

    const channels = [
        {
            icon: Store,
            name: "Store A",
            subtitle: "Flagship Outlet",
            color: "#3B82F6",
            info: "Physical retail store with its own inventory management system. Currently operates in isolation, unaware of stock levels at other locations."
        },
        {
            icon: ShoppingBag,
            name: "Store B",
            subtitle: "Mall Location",
            color: "#3B82F6",
            info: "Second physical location with separate inventory tracking. Cannot automatically transfer stock from Store A when running low."
        },
        {
            icon: ShoppingCart,
            name: "Amazon",
            subtitle: "Seller Central",
            color: "#F97316",
            info: "E-commerce marketplace channel. Inventory is manually updated, leading to overselling when physical stores deplete stock."
        },
        {
            icon: Globe,
            name: "ONDC",
            subtitle: "Open Network",
            color: "#14B8A6",
            info: "Open Network for Digital Commerce - India's open protocol for e-commerce. Requires real-time inventory sync which is currently missing."
        },
    ];

    return (
        <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full flex flex-col select-none"
        >
            {/* Strategy Beacons - Strategic Density */}
            <StrategyBeacon
                title="Strategic Choice: Why Retail?"
                position="top-10 right-10"
                delay={1.5}
                onClick={() => setContextContent({
                    title: "Why Retail?",
                    content: "Retail is chosen deliberately as the representative vertical because inventory fragmentation, stockouts, and multi-channel complexity are universally understandable problems that can be communicated visually in under ninety seconds. This allows judges to immediately grasp the value of a unified operations layer without requiring technical explanation."
                })}
            />

            <StrategyBeacon
                title="The Hidden Cost"
                position="bottom-32 left-10"
                delay={2}
                onClick={() => setContextContent({
                    title: "The Economics of Fragmentation",
                    content: "The 4-8% revenue loss is not just about lost sales—it's about capital inefficiency. When inventory is trapped in the wrong channel (e.g., surplus in Store A, stockout in Amazon), working capital is frozen. SyncOne unlocks this capital by virtualizing inventory across all nodes, effectively increasing available stock without increasing inventory investment."
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
            <InfoPanel
                title={channels.find(c => c.name === activeInfo)?.name || ""}
                content={channels.find(c => c.name === activeInfo)?.info || ""}
                isOpen={activeInfo !== null && activeInfo !== "problem"}
                onClose={() => setActiveInfo(null)}
            />
            <InfoPanel
                title="The Problem: Fragmentation"
                content="Current Landscape: 4 Disconnected Silos. 
                1) Stores A & B operate locally, blind to each other's stock.
                2) Amazon & ONDC are manually updated, leading to inevitable overselling. 
                Result: 4-8% revenue loss and poor customer experience due to lack of synchronization."
                isOpen={activeInfo === "problem"}
                onClose={() => setActiveInfo(null)}
            />

            {/* Main Grid - 2x2 layout for channels */}
            <div className="flex-1 grid grid-cols-2 gap-8 p-4 max-w-4xl mx-auto w-full">
                {channels.map((channel, i) => (
                    <motion.div
                        key={channel.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2, duration: 0.5 }}
                        onClick={() => setActiveInfo(channel.name)}
                        className="relative bg-white rounded-2xl p-5 shadow-lg border border-slate-200 cursor-pointer hover:shadow-xl hover:border-blue-300 transition-all group"
                    >
                        {/* Click hint */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                <Info className="w-3 h-3" />
                                Details
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="absolute -top-2 left-4 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            ISOLATED
                        </div>

                        {/* Accent Line */}
                        <div
                            className="absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full"
                            style={{ backgroundColor: channel.color }}
                        />

                        <div className="flex items-center gap-4 pl-4 mt-3">
                            <div
                                className="p-3 rounded-xl"
                                style={{ backgroundColor: `${channel.color}15` }}
                            >
                                <channel.icon className="w-7 h-7" style={{ color: channel.color }} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900">{channel.name}</h3>
                                <p className="text-sm text-slate-500">{channel.subtitle}</p>
                            </div>
                        </div>

                        {/* Status Bar */}
                        <div className="mt-4 pl-4">
                            <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-slate-400 font-medium">Inventory Sync</span>
                                <span className="text-red-500 font-bold">FAILED</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-red-400 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "35%" }}
                                    transition={{ delay: i * 0.2 + 0.5, duration: 1 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Master Interaction Trigger */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                onClick={() => setActiveInfo("problem")}
                className="mx-auto mb-6 cursor-pointer group relative z-10"
            >
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg max-w-2xl hover:scale-105 hover:shadow-2xl hover:border-red-400 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="p-3 bg-red-100 rounded-full"
                        >
                            <AlertTriangle className="w-8 h-8 text-red-500" />
                        </motion.div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold text-slate-900">System Fragmentation</h2>
                            </div>
                            <p className="text-slate-600 mt-1">
                                <span className="font-bold text-red-500">4 disconnected silos</span> causing stockouts and capital inefficiency.
                            </p>
                        </div>

                        {/* Prominent Click Badge */}
                        <div className="flex flex-col items-center justify-center pl-4 border-l border-red-200">
                            <div className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md animate-pulse whitespace-nowrap">
                                Click to Analyze
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
