import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Save, Zap, Loader2, AlignLeft, Edit3 } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import Sidebar from '../components/layout/Sidebar';
import ScenePanel from '../components/editor/ScenePanel';
import VideoPreview from '../components/editor/VideoPreview';
import TimelineBar from '../components/editor/TimelineBar';
import SceneEditModal from '../components/editor/SceneEditModal';
import { videoService } from '../services/video.service';
import { fadeUpVariant } from '../utils/animations';

export default function VideoEditor() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [scenes, setScenes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const activeScene = scenes.find(s => s._id === activeId);

  useEffect(() => {
    const load = async () => {
      try {
        const [vidRes, sceneRes] = await Promise.all([
          videoService.getOne(id),
          videoService.getScenes(id),
        ]);
        setVideo(vidRes.data.data);
        const sc = sceneRes.data.data || [];
        setScenes(sc);
        if (sc.length > 0) setActiveId(sc[0]._id);
      } catch {
        toast.error('Failed to load editor');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const saveScene = async () => {
    if (!activeScene) return;
    setSaving(true);
    try {
      await videoService.updateScene(activeScene._id, { editType: 'script', scriptText: activeScene.scriptText });
      toast.success('Scene saved!');
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
    </div>
  );

  return (
    <PageTransition>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        {/* Three-panel editor */}
        <div className="flex flex-1 md:ml-[240px] min-w-0">
          {/* Left: Scenes */}
          <div className="w-56 flex-shrink-0 hidden md:block">
            <ScenePanel scenes={scenes} activeId={activeId} onSelect={setActiveId} />
          </div>

          {/* Center: Preview */}
          <div className="flex-1 flex flex-col min-w-0 border-x" style={{ borderColor: 'var(--color-border)' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-2)' }}>
              <h2 className="font-display font-bold text-sm truncate">{video?.title || 'Video Editor'}</h2>
              <motion.button onClick={() => setModalOpen(true)} disabled={!activeScene}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs glow-border disabled:opacity-40"
                whileHover={{ scale: 1.04 }}>
                <Edit3 className="w-3 h-3 text-purple-400" /> Edit Scene
              </motion.button>
            </div>
            <div className="flex-1 p-4">
              <VideoPreview title={video?.title} />
            </div>
            <TimelineBar scenes={scenes} activeId={activeId} onSeek={setActiveId} />
          </div>

          {/* Right: Properties */}
          <div className="w-64 flex-shrink-0 hidden lg:flex flex-col border-l" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-2)' }}>
            <div className="px-4 py-3 border-b flex-shrink-0 flex items-center gap-2" style={{ borderColor: 'var(--color-border)' }}>
              <AlignLeft className="w-4 h-4 text-purple-400" />
              <h3 className="font-display font-bold text-sm">Properties</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {!activeScene ? (
                <p className="text-xs text-center mt-8" style={{ color: 'var(--color-text-muted)' }}>Select a scene to edit</p>
              ) : (
                <>
                  <motion.div variants={fadeUpVariant} initial="hidden" animate="visible">
                    <label className="block text-xs font-semibold mb-1.5 gradient-text uppercase tracking-widest">Script</label>
                    <textarea value={activeScene.scriptText || ''}
                      onChange={e => setScenes(sc => sc.map(s => s._id === activeId ? { ...s, scriptText: e.target.value } : s))}
                      rows={8} className="w-full px-3 py-2.5 rounded-xl text-xs font-mono resize-none outline-none"
                      style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }} />
                  </motion.div>

                  <motion.button onClick={saveScene} disabled={saving}
                    className="btn-primary w-full py-2.5 text-xs flex items-center justify-center gap-1.5" whileHover={{ scale: 1.02 }}>
                    {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                    {saving ? 'Saving…' : 'Save'}
                  </motion.button>

                  <motion.button className="btn-ghost w-full py-2.5 text-xs flex items-center justify-center gap-1.5" whileHover={{ scale: 1.02 }}>
                    <Zap className="w-3 h-3 text-purple-400" /> Regenerate Scene
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>

        <SceneEditModal scene={activeScene} open={modalOpen} onClose={() => setModalOpen(false)}
          onSaved={updated => setScenes(sc => sc.map(s => s._id === updated._id ? updated : s))} />
      </div>
    </PageTransition>
  );
}
