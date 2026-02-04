import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';

interface LayoutProps {
    children: ReactNode;
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onSetStep?: (step: number) => void;
    canAdvance?: boolean;
}

export default function Layout({
    children,
    currentStep,
    totalSteps,
    onNext,
    onSetStep,
    canAdvance = true
}: LayoutProps) {

    const stepLabels = ["Fragmentation", "Intervention", "Insight", "Decision", "Outcome"];

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50 text-slate-900">
            {/* Subtle Grid Background */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-50 px-8 py-6">
                <div className="flex items-center justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        {/* Custom Logo - Sync Node */}
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-lg border border-slate-700">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                            <div className="relative flex items-center justify-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                <div className="absolute w-6 h-6 border-[1.5px] border-white/20 rounded-full" />
                                <div className="absolute w-full h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent rotate-45" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 tracking-tight font-display">
                                SyncOne
                            </h1>
                            <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                                Retail Intelligence
                            </span>
                        </div>
                    </div>

                    {/* Step Indicator */}
                    <div className="flex items-center gap-2">
                        {stepLabels.map((label, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 cursor-pointer group"
                                onClick={() => onSetStep && onSetStep(i)}
                            >
                                <motion.div
                                    className={`relative flex items-center justify-center ${i <= currentStep ? 'text-blue-600' : 'text-slate-300'
                                        }`}
                                >
                                    <motion.div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i === currentStep
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                                            : i < currentStep
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-slate-100 text-slate-400'
                                            }`}
                                        animate={i === currentStep ? { scale: [1, 1.1, 1] } : {}}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        {i + 1}
                                    </motion.div>
                                    {i === currentStep && (
                                        <motion.div
                                            className="absolute inset-0 rounded-full border-2 border-blue-400"
                                            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    )}
                                </motion.div>
                                <span className={`text-xs font-medium hidden lg:block ${i <= currentStep ? 'text-slate-600' : 'text-slate-400'
                                    }`}>
                                    {label}
                                </span>
                                {i < stepLabels.length - 1 && (
                                    <div className={`w-8 h-0.5 rounded-full ${i < currentStep ? 'bg-blue-400' : 'bg-slate-200'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative w-full h-full flex items-center justify-center z-10 px-8 pt-24 pb-28">
                <AnimatePresence mode="wait">
                    {children}
                </AnimatePresence>
            </main>

            {/* Footer */}
            <footer className="absolute bottom-0 left-0 right-0 z-50 px-8 py-6">
                <div className="flex items-center justify-between">
                    {/* Step Counter */}
                    <div className="text-sm text-slate-400 font-medium">
                        <span className="text-slate-600 font-bold">{currentStep + 1}</span> / {totalSteps}
                    </div>

                    {/* Navigation */}
                    {canAdvance && currentStep < totalSteps - 1 && (
                        <motion.button
                            onClick={onNext}
                            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-bold rounded-full shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>NEXT STEP</span>
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </motion.div>
                        </motion.button>
                    )}

                    {currentStep === totalSteps - 1 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 text-green-600 font-bold"
                        >
                            <motion.span
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                ✓
                            </motion.span>
                            Complete
                        </motion.div>
                    )}
                </div>
            </footer>
        </div>
    );
}
