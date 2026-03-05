import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wand2, Save, Loader2 } from 'lucide-react';
import { backdropVariant, modalVariant } from '../../utils/animations';
import { videoService } from '../../services/video.service';
import { toast } from 'sonner';

export default function SceneEditModal({ scene, open, onClose, onSaved }) {
    const [script, setScript] = useState(scene?.scriptText || '');
    const [prompt, setPrompt] = useState(scene?.visualPrompt || '');
    const [saving, setSaving] = useState(false);

    const save = async () => {
        if (!scene) return;
        setSaving(true);
        try {
            await videoService.updateScene(scene._id, { editType: 'script', scriptText: script, visualPrompt: prompt });
            toast.success('Scene saved!');
            onSaved?.({ ...scene, scriptText: script, visualPrompt: prompt });
            onClose();
        } catch {
            toast.error('Failed to save scene');
        } finally {
            setSaving(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div variants={backdropVariant} initial="hidden" animate="visible" exit="hidden"
                        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm" onClick={onClose} />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div variants={modalVariant} initial="hidden" animate="visible" exit="exit"
                            className="w-full max-w-2xl glass-dark rounded-2xl border overflow-hidden pointer-events-auto"
                            style={{ borderColor: 'rgba(124,58,237,0.3)' }}
                            onClick={e => e.stopPropagation()}>

                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                                <div>
                                    <h2 className="font-display font-bold text-lg">Edit Scene</h2>
                                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{scene?.title || 'Untitled Scene'}</p>
                                </div>
                                <motion.button onClick={onClose} whileHover={{ scale: 1.08, rotate: 90 }} whileTap={{ scale: 0.9 }}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/8 transition-colors">
                                    <X className="w-4 h-4 text-gray-400" />
                                </motion.button>
                            </div>

                            <div className="p-6 space-y-5">
                                <div>
                                    <label className="block text-xs font-semibold mb-2 gradient-text uppercase tracking-widest">Script</label>
                                    <textarea value={script} onChange={e => setScript(e.target.value)} rows={6}
                                        className="w-full rounded-xl p-4 text-sm font-mono resize-none outline-none transition-all"
                                        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                                        onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.5)'}
                                        onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                                        placeholder="Write your scene script here…" />
                                    <p className="text-xs mt-1 text-right" style={{ color: 'var(--color-text-muted)' }}>{script.length}/2000</p>
                                </div>

                                <div>
                                    <label className="flex items-center gap-1.5 text-xs font-semibold mb-2 gradient-text uppercase tracking-widest">
                                        <Wand2 className="w-3 h-3" /> Visual Prompt
                                    </label>
                                    <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={3}
                                        className="w-full rounded-xl p-4 text-sm resize-none outline-none transition-all"
                                        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                                        onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.5)'}
                                        onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                                        placeholder="Describe the visuals for this scene…" />
                                </div>

                                {/* Waveform preview */}
                                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid var(--color-border)' }}>
                                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Audio preview</span>
                                    <div className="flex items-center gap-1">
                                        {[...Array(18)].map((_, i) => (
                                            <span key={i} className="waveform-bar"
                                                style={{ height: `${8 + Math.random() * 20}px`, animationDelay: `${i * 0.08}s` }} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 px-6 pb-6">
                                <motion.button onClick={onClose} className="btn-ghost flex-1 py-3 text-sm" whileHover={{ scale: 1.02 }}>Cancel</motion.button>
                                <motion.button onClick={save} disabled={saving} className="btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2" whileHover={{ scale: 1.02 }}>
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {saving ? 'Saving…' : 'Save Changes'}
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
