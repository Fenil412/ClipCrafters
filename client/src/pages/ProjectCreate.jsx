import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FilePlus, Loader2, ArrowRight, Check, FileText, Zap } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import Sidebar from '../components/layout/Sidebar';
import { projectService } from '../services/project.service';
import { staggerContainer, fadeUpVariant } from '../utils/animations';

const STEPS = [
  { icon: FileText, label: 'Details' },
  { icon: Zap, label: 'Generate' },
  { icon: Check, label: 'Done' },
];

const SOURCE_TYPES = ['text', 'research-paper', 'lecture-notes', 'report'];

export default function ProjectCreate() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', sourceType: 'text' });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || form.title.trim().length < 3) {
      toast.error('Title must be at least 3 characters');
      return;
    }
    setLoading(true);
    setStep(1);
    try {
      const res = await projectService.create(form);
      const project = res.data.data;
      setStep(2);
      setTimeout(() => {
        toast.success('Project created!');
        navigate(`/projects/${project._id}`);
      }, 800);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create project');
      setStep(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 md:ml-[240px] flex items-center justify-center p-6">
          <div className="w-full max-w-xl">
            {/* Progress steps */}
            <div className="flex items-center gap-3 mb-10">
              {STEPS.map((s, i) => (
                <div key={i} className="flex items-center gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
                      animate={{
                        background: i <= step ? 'var(--gradient-accent)' : 'rgba(124,58,237,0.1)',
                        color: i <= step ? '#fff' : 'var(--color-text-muted)',
                      }}>
                      {i < step ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                    </motion.div>
                    <span className="text-xs font-semibold hidden sm:block"
                      style={{ color: i <= step ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-px mx-2 rounded-full overflow-hidden" style={{ background: 'rgba(124,58,237,0.12)' }}>
                      <motion.div className="h-full rounded-full"
                        style={{ background: 'var(--gradient-accent)' }}
                        animate={{ width: i < step ? '100%' : '0%' }}
                        transition={{ duration: 0.5 }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="card p-8 space-y-6">
              <motion.div variants={fadeUpVariant}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'var(--gradient-accent)' }}>
                  <FilePlus className="w-6 h-6 text-white" />
                </div>
                <h1 className="font-display font-black text-2xl sm:text-3xl mb-1">New Project</h1>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Start your AI video creation journey</p>
              </motion.div>

              <motion.form variants={staggerContainer} onSubmit={submit} className="space-y-5">
                <motion.div variants={fadeUpVariant}>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-widest gradient-text">Project Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                    style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                    placeholder="My AI Video Project" />
                </motion.div>

                <motion.div variants={fadeUpVariant}>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-widest gradient-text">Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                    className="w-full px-4 py-3.5 rounded-xl text-sm outline-none resize-none transition-all"
                    style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                    placeholder="What is this project about?" />
                </motion.div>

                <motion.div variants={fadeUpVariant}>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-widest gradient-text">Source Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {SOURCE_TYPES.map(t => (
                      <motion.button key={t} type="button"
                        onClick={() => setForm(f => ({ ...f, sourceType: t }))}
                        className="py-2.5 px-3 rounded-xl text-xs font-semibold transition-all capitalize"
                        style={{ background: form.sourceType === t ? 'var(--gradient-accent)' : 'rgba(124,58,237,0.08)', color: form.sourceType === t ? '#fff' : 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        {t.replace('-', ' ')}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.button variants={fadeUpVariant} type="submit" disabled={loading}
                  className="btn-primary w-full py-4 text-sm flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  {loading ? 'Creating…' : 'Create Project'}
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
