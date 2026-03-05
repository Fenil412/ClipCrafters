import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Film, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../hooks/useAuth';
import GradientBlob from '../components/ui/GradientBlob';
import AnimatedImage from '../components/common/AnimatedImage';
import PageTransition from '../components/common/PageTransition';
import { unsplash, IMAGES } from '../utils/imageLoader';
import { staggerContainer, fadeUpVariant, slideInLeftVariant, slideInRightVariant } from '../utils/animations';

// ⚠️ MUST be defined OUTSIDE component — defining inside causes unmount/remount on every keystroke
function FormField({ label, id, type = 'text', Icon, error, placeholder, value, onChange, extra }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold mb-1.5 uppercase tracking-widest gradient-text">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={id}
          className="w-full pl-10 pr-12 py-3.5 rounded-xl text-sm outline-none transition-colors"
          style={{
            background: 'rgba(124,58,237,0.07)',
            border: `1px solid ${error ? '#f87171' : 'var(--color-border)'}`,
            color: 'var(--color-text-primary)',
          }}
          onFocus={e => { e.target.style.borderColor = 'rgba(124,58,237,0.5)'; }}
          onBlur={e => { e.target.style.borderColor = error ? '#f87171' : 'var(--color-border)'; }}
        />
        {extra}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          className="text-xs text-red-400 mt-1"
        >{error}</motion.p>
      )}
    </div>
  );
}

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.password || form.password.length < 8) e.password = 'Password must be 8+ characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await register(form);
      toast.success('Account created! Welcome to ClipCrafters 🎬');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-row-reverse">
        {/* Right visual panel */}
        <motion.div
          variants={slideInRightVariant} initial="hidden" animate="visible"
          className="hidden lg:flex flex-1 relative overflow-hidden"
        >
          <AnimatedImage src={unsplash(IMAGES.ai, 900, 1200)} alt="AI" className="absolute inset-0" aspectRatio="auto" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(225deg,rgba(6,182,212,0.8),rgba(124,58,237,0.7))' }} />
          <div className="relative z-10 flex flex-col justify-center p-12 text-white">
            <Sparkles className="w-10 h-10 mb-6 text-cyan-300" />
            <h2 className="font-display font-black text-4xl leading-tight mb-3">
              Join 10,000+<br />creators today
            </h2>
            <p className="text-white/75">Start free. No credit card required.</p>
          </div>
        </motion.div>

        {/* Left form panel */}
        <motion.div
          variants={slideInLeftVariant} initial="hidden" animate="visible"
          className="flex-1 relative flex items-center justify-center p-8"
          style={{ background: 'var(--color-surface)' }}
        >
          <GradientBlob />
          <div className="relative z-10 w-full max-w-md">
            {/* Header — animates only once on mount */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-7">
              <motion.div variants={fadeUpVariant} className="flex items-center gap-2 mb-3 lg:hidden">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-accent)' }}>
                  <Film className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold gradient-text">ClipCrafters</span>
              </motion.div>
              <motion.h1 variants={fadeUpVariant} className="font-display font-black text-3xl sm:text-4xl mb-1">
                Create account
              </motion.h1>
              <motion.p variants={fadeUpVariant} className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Start your AI video journey
              </motion.p>
            </motion.div>

            {/* Form — plain <form>, NO motion stagger on fields to prevent re-animation */}
            <form onSubmit={submit} className="space-y-4">
              <FormField
                id="name" label="Full Name" Icon={Film}
                error={errors.name} placeholder="Jane Doe"
                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
              <FormField
                id="email" label="Email" type="email" Icon={Mail}
                error={errors.email} placeholder="you@example.com"
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
              <FormField
                id="password" label="Password" type={showPass ? 'text' : 'password'} Icon={Lock}
                error={errors.password} placeholder="min 8 characters"
                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                extra={
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />

              <motion.button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 text-sm flex items-center justify-center gap-2 mt-2"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {loading ? 'Creating account…' : 'Create Free Account'}
              </motion.button>
            </form>

            <p className="text-center text-sm mt-5" style={{ color: 'var(--color-text-muted)' }}>
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                Sign in <ArrowRight className="w-3.5 h-3.5 inline" />
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
