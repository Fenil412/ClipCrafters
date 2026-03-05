import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, GripVertical } from 'lucide-react';

export default function ScenePanel({ scenes = [], activeId, onSelect, onReorder }) {
    return (
        <div className="flex flex-col h-full" style={{ background: 'var(--color-surface-2)', borderRight: '1px solid var(--color-border)' }}>
            <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0" style={{ borderColor: 'var(--color-border)' }}>
                <h3 className="font-display font-bold text-sm">Scenes <span className="ml-1 text-xs font-mono text-purple-400">({scenes.length})</span></h3>
                <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--gradient-accent)' }}>
                    <Plus className="w-4 h-4 text-white" />
                </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {scenes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 gap-2 text-center">
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>No scenes yet</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Generate video to create scenes</p>
                    </div>
                ) : (
                    scenes.map((scene, i) => (
                        <motion.div
                            key={scene._id || i}
                            onClick={() => onSelect?.(scene._id)}
                            className="group relative flex items-center gap-2 p-2.5 rounded-xl transition-all"
                            style={{ background: activeId === scene._id ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.02)', border: activeId === scene._id ? '1px solid rgba(124,58,237,0.4)' : '1px solid transparent', cursor: 'pointer' }}
                            whileHover={{ background: 'rgba(124,58,237,0.12)' }}
                        >
                            <GripVertical className="w-4 h-4 opacity-0 group-hover:opacity-40 transition-opacity flex-shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                            <div className="w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-900/50 to-cyan-900/30 flex items-center justify-center">
                                <span className="font-mono text-xs text-purple-400">{String(i + 1).padStart(2, '0')}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold truncate">{scene.title || `Scene ${i + 1}`}</p>
                                <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
                                    {scene.scriptText?.slice(0, 35) || 'No script'}{scene.scriptText?.length > 35 ? '…' : ''}
                                </p>
                            </div>
                            {activeId === scene._id && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-r bg-purple-400" />
                            )}
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
