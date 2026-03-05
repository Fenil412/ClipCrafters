import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Zap, Loader2, Trash2, Edit3, Video, ArrowLeft, RefreshCw } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import Sidebar from '../components/layout/Sidebar';
import Badge from '../components/ui/Badge';
import { projectService } from '../services/project.service';
import { videoService } from '../services/video.service';
import { formatDate } from '../utils/formatDate';
import { staggerContainer, fadeUpVariant } from '../utils/animations';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [genForm, setGenForm] = useState({ text: '', title: '' });

  useEffect(() => {
    projectService.getOne(id)
      .then(res => setProject(res.data.data))
      .catch(() => toast.error('Project not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const generate = async () => {
    if (!genForm.text.trim()) { toast.error('Please enter script text'); return; }
    setGenerating(true);
    try {
      const res = await videoService.generate({ projectId: id, text: genForm.text, title: genForm.title || project?.title });
      toast.success('Video generation started!');
      setProject(p => ({ ...p, videoId: res.data.data._id }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Generation failed');
    } finally {
      setGenerating(false);
    }
  };

  const deleteProject = async () => {
    if (!confirm('Delete this project?')) return;
    await projectService.remove(id);
    toast.success('Project deleted');
    navigate('/dashboard');
  };

  if (loading) return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 md:ml-[240px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </main>
    </div>
  );

  return (
    <PageTransition>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 md:ml-[240px] p-6">
          <div className="max-w-4xl mx-auto">
            {/* Back */}
            <Link to="/dashboard">
              <motion.button className="flex items-center gap-2 text-sm mb-6 hover:text-purple-400 transition-colors"
                style={{ color: 'var(--color-text-muted)' }} whileHover={{ x: -3 }}>
                <ArrowLeft className="w-4 h-4" /> Dashboard
              </motion.button>
            </Link>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
              {/* Header */}
              <motion.div variants={fadeUpVariant} className="flex items-start justify-between gap-4">
                <div>
                  <Badge status={project?.status || 'draft'} className="mb-3" />
                  <h1 className="font-display font-black text-3xl sm:text-4xl">{project?.title}</h1>
                  {project?.description && <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>{project.description}</p>}
                  <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>Created {formatDate(project?.createdAt)}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {project?.videoId && (
                    <Link to={`/editor/${project.videoId}`}>
                      <motion.button className="btn-primary px-4 py-2.5 text-sm flex items-center gap-1.5" whileHover={{ scale: 1.04 }}>
                        <Edit3 className="w-4 h-4" /> Edit Video
                      </motion.button>
                    </Link>
                  )}
                  <motion.button onClick={deleteProject} className="p-2.5 rounded-xl border border-red-500/25 text-red-400 hover:bg-red-500/10 transition-colors" whileHover={{ scale: 1.05 }}>
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Generate Video */}
              {!project?.videoId && (
                <motion.div variants={fadeUpVariant} className="card p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.15)' }}>
                      <Zap className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-xl">Generate Video</h2>
                      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Create AI video from script</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 gradient-text uppercase tracking-widest">Video Title</label>
                      <input value={genForm.title} onChange={e => setGenForm(f => ({ ...f, title: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                        placeholder={project?.title || 'Video title'} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 gradient-text uppercase tracking-widest">Script / Topic *</label>
                      <textarea value={genForm.text} onChange={e => setGenForm(f => ({ ...f, text: e.target.value }))} rows={5}
                        className="w-full px-4 py-3 rounded-xl text-sm resize-none outline-none font-mono transition-all"
                        style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                        placeholder="Enter your script or topic. AI will create scenes automatically…" />
                    </div>
                    <motion.button onClick={generate} disabled={generating}
                      className="btn-primary px-8 py-3.5 text-sm flex items-center gap-2"
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                      {generating ? 'Generating…' : 'Generate Video with AI'}
                    </motion.button>

                    {generating && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex items-center gap-3 p-4 rounded-xl"
                        style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid var(--color-border)' }}>
                        <div className="flex gap-1">
                          {[...Array(10)].map((_, i) => (
                            <span key={i} className="waveform-bar" style={{ height: `${10 + Math.random() * 16}px`, animationDelay: `${i * 0.1}s` }} />
                          ))}
                        </div>
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>AI is creating your video scenes…</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {project?.videoId && (
                <motion.div variants={fadeUpVariant} className="card p-8 text-center">
                  <Video className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <h3 className="font-display font-bold text-xl mb-2">Video Ready</h3>
                  <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>Your video has been generated. Open the editor to fine-tune scenes.</p>
                  <Link to={`/editor/${project.videoId}`}>
                    <motion.button className="btn-primary px-8 py-3 text-sm" whileHover={{ scale: 1.04 }}>
                      <Edit3 className="w-4 h-4 inline mr-2" /> Open Video Editor
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
