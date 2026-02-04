import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';

interface ContextModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
}

export function ContextModal({ isOpen, onClose, title, content }: ContextModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-slate-900/90 backdrop-blur-xl"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-2xl w-full"
                    >
                        {/* Content Container */}
                        <div className="relative">
                            {/* Decorative Line */}
                            <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-50" />

                            <div className="mb-6 flex items-center gap-3 text-blue-400">
                                <BookOpen className="w-6 h-6" />
                                <span className="text-sm font-bold uppercase tracking-widest">Strategic Context</span>
                            </div>

                            <h2 className="text-4xl font-bold text-white mb-8 leading-tight font-serif tracking-tight">
                                {title}
                            </h2>

                            <div className="prose prose-lg prose-invert text-slate-300 leading-relaxed font-light">
                                <p>{content}</p>
                            </div>

                            {/* Close hint */}
                            <div className="mt-12 flex items-center gap-4">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-white text-sm font-medium flex items-center gap-2"
                                >
                                    <X className="w-4 h-4" />
                                    Close Context
                                </button>
                                <span className="text-slate-500 text-sm">Click anywhere to return</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
