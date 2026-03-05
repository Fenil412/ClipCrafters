import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { User, Mail, Loader2, Save, Film } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import Sidebar from '../components/layout/Sidebar';
import { useAuth } from '../hooks/useAuth';
import { unsplash, IMAGES } from '../utils/imageLoader';
import { staggerContainer, fadeUpVariant } from '../utils/animations';

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [saving, setSaving] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Profile updated!');
    setSaving(false);
  };

  return (
    <PageTransition>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 md:ml-[240px] p-6">
          <div className="max-w-2xl mx-auto">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
              {/* Avatar card */}
              <motion.div variants={fadeUpVariant} className="card p-8 text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-purple-500/40 ring-offset-2 ring-offset-transparent">
                    <img src={unsplash(IMAGES.profile, 200, 200)} alt="avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--gradient-accent)' }}>
                    <Film className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h1 className="font-display font-black text-2xl">{user?.name}</h1>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{user?.email}</p>
                <div className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(124,58,237,0.12)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.25)' }}>
                  Pro Creator
                </div>
              </motion.div>

              {/* Edit form */}
              <motion.div variants={fadeUpVariant} className="card p-8">
                <h2 className="font-display font-bold text-xl mb-6">Edit Profile</h2>
                <motion.form variants={staggerContainer} onSubmit={save} className="space-y-5">
                  {[
                    { label: 'Full Name', icon: User, key: 'name', type: 'text', placeholder: 'Jane Doe' },
                    { label: 'Email', icon: Mail, key: 'email', type: 'email', placeholder: 'you@example.com' },
                  ].map(({ label, icon: Icon, key, type, placeholder }) => (
                    <motion.div key={key} variants={fadeUpVariant}>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-widest gradient-text">{label}</label>
                      <div className="relative">
                        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                        <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                          style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                          onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.5)'}
                          onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                          placeholder={placeholder} />
                      </div>
                    </motion.div>
                  ))}
                  <motion.button variants={fadeUpVariant} type="submit" disabled={saving}
                    className="btn-primary px-8 py-3.5 text-sm flex items-center gap-2" whileHover={{ scale: 1.02 }}>
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? 'Saving…' : 'Save Changes'}
                  </motion.button>
                </motion.form>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
