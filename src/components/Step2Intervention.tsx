import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Store, ShoppingCart, Globe, ShoppingBag, CheckCircle2, Info, X } from 'lucide-react';
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

export function Step2Intervention() {
    const [activeInfo, setActiveInfo] = useState<string | null>(null);
    const [contextContent, setContextContent] = useState<{ title: string, content: string } | null>(null);

    const nodes = [
        { icon: Store, name: "Store A", color: "#3B82F6", info: "Physical store now connected to the central hub. Inventory updates sync in real-time." },
        { icon: ShoppingBag, name: "Store B", color: "#3B82F6", info: "Second store location now shares inventory visibility with all other channels." },
        { icon: ShoppingCart, name: "Amazon", color: "#F97316", info: "E-commerce channel now receives real-time stock updates, preventing overselling." },
        { icon: Globe, name: "ONDC", color: "#14B8A6", info: "Open network integration enables India-wide e-commerce with accurate inventory." },
    ];

    return (
        <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full flex flex-col items-center justify-center select-none"
        >
            {/* Strategy Beacons - Strategic Density */}
            <StrategyBeacon
                title="Portfolio Logic"
                position="top-24 left-10"
                delay={1.5}
                onClick={() => setContextContent({
                    title: "Abstracting the Logic",
                    content: "This central hub architecture is not specific to retail. We are demonstrating a 'Central Nervous System' pattern that applies equally to Healthcare (SyncOne Care) for staff rostering and Manufacturing (SyncOne Factory) for supply chain visibility. By mastering this unified state management in retail, we prove the core capability required for the entire portfolio strategy."
                })}
            />

            <StrategyBeacon
                title="Implementation Strategy"
                position="bottom-32 right-10"
                delay={2}
                onClick={() => setContextContent({
                    title: "The 'Wrapper' Approach",
                    content: "Enterprises fear 'rip-and-replace'. SyncOne avoids this by acting as a non-invasive wrapper layer. We use low-code connectors to hook into existing legacy ERPs (SAP, Oracle, Tally) without disturbing their core operations. This allows for rapid deployment (weeks, not months) and significantly lowers the barrier to adoption for large traditional retailers."
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
            {nodes.map(node => (
                <InfoPanel
                    key={node.name}
                    title={node.name}
                    content={node.info}
                    isOpen={activeInfo === node.name}
                    onClose={() => setActiveInfo(null)}
                />
            ))}
            <InfoPanel
                title="Solution: Unified Intelligence Layer"
                content="SyncOne connects the 4 silos (Store A, Store B, Amazon, ONDC) into a single real-time network. 
                It acts as the central brain that:
                1) Aggregates inventory visibility.
                2) Prevents overselling on digital channels.
                3) Enables cross-channel fulfillment."
                isOpen={activeInfo === "hub"}
                onClose={() => setActiveInfo(null)}
            />

            {/* Top Row - Store A & Store B */}
            <div className="flex justify-center gap-20 mb-8">
                {nodes.slice(0, 2).map((node, i) => (
                    <motion.div
                        key={node.name}
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2, duration: 0.5 }}
                        onClick={() => setActiveInfo(node.name)}
                        className="flex flex-col items-center gap-3 cursor-pointer group"
                    >
                        <div className="relative">
                            <div
                                className="p-4 bg-white rounded-2xl shadow-lg border-2 transition-all group-hover:shadow-xl"
                                style={{ borderColor: node.color }}
                            >
                                <node.icon className="w-8 h-8" style={{ color: node.color }} />
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.5 + i * 0.2 }}
                                className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1"
                            >
                                <CheckCircle2 className="w-4 h-4 text-white" />
                            </motion.div>
                        </div>
                        <span className="text-sm font-bold text-slate-700">{node.name}</span>
                    </motion.div>
                ))}
            </div>

            {/* Connection Lines - SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {/* Lines will be drawn by CSS or positioned elements */}
            </svg>

            {/* Central Hub - Master Interaction */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", duration: 0.8 }}
                onClick={() => setActiveInfo("hub")}
                className="relative z-10 cursor-pointer group"
            >
                {/* Pulsing Rings */}
                {[1, 2, 3].map((ring) => (
                    <motion.div
                        key={ring}
                        className="absolute rounded-full border-2 border-blue-400/30"
                        style={{
                            width: 200 + ring * 30,
                            height: 200 + ring * 30,
                            left: `calc(50% - ${(200 + ring * 30) / 2}px)`,
                            top: `calc(50% - ${(200 + ring * 30) / 2}px)`,
                        }}
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 2, delay: ring * 0.3, repeat: Infinity }}
                    />
                ))}

                {/* Main Hub */}
                <div className="relative w-[200px] h-[200px] rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-2xl shadow-blue-500/40 flex flex-col items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    {/* Scanning Line */}
                    <motion.div
                        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        animate={{ top: [0, 200, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Hub Content */}
                    <div className="text-center text-white z-10">
                        <Layers className="w-12 h-12 mx-auto mb-2" />
                        <h2 className="text-lg font-bold">SyncOne Retail</h2>
                        <p className="text-blue-200 text-xs font-medium">Unified Intelligence</p>

                        {/* Processing dots */}
                        <div className="mt-3 flex items-center justify-center gap-1">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-white rounded-full"
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Persistent Click CTA */}
                    <div className="absolute bottom-6 bg-white/20 backdrop-blur w-full py-1 flex justify-center">
                        <span className="text-[10px] text-white font-bold uppercase tracking-wider">Click for Strategy</span>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Row - Amazon & ONDC */}
            <div className="flex justify-center gap-20 mt-8">
                {nodes.slice(2).map((node, i) => (
                    <motion.div
                        key={node.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.2, duration: 0.5 }}
                        onClick={() => setActiveInfo(node.name)}
                        className="flex flex-col items-center gap-3 cursor-pointer group"
                    >
                        <span className="text-sm font-bold text-slate-700">{node.name}</span>
                        <div className="relative">
                            <div
                                className="p-4 bg-white rounded-2xl shadow-lg border-2 transition-all group-hover:shadow-xl"
                                style={{ borderColor: node.color }}
                            >
                                <node.icon className="w-8 h-8" style={{ color: node.color }} />
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.5 + i * 0.2 }}
                                className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1"
                            >
                                <CheckCircle2 className="w-4 h-4 text-white" />
                            </motion.div>
                            {/* Click hint */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                <span className="text-xs text-blue-600 font-medium">Click for info</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="mt-12 text-center relative z-10"
            >
                <p className="text-lg text-slate-600 font-medium">
                    Creating a unified <span className="text-blue-600 font-bold">single source of truth</span> above existing silos.
                </p>
            </motion.div>
        </motion.div>
    );
}
