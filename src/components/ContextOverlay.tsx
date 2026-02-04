import { motion, AnimatePresence } from 'framer-motion';
// Component for displaying strategic context
import { X, Lightbulb } from 'lucide-react';

interface ContextOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
}

export function ContextOverlay({ isOpen, onClose, title, content }: ContextOverlayProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                    <Lightbulb className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-8">
                            <div className="prose prose-lg prose-slate max-w-none">
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    {content}
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-slate-50 p-4 flex justify-between items-center text-xs text-slate-400 font-medium uppercase tracking-wider">
                            <span>SyncOne Retail Strategy · Confidential</span>
                            <span>For Internal Review Only</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
