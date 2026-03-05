import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, LogIn, Loader2, Film } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../hooks/useAuth';
import GradientBlob from '../components/ui/GradientBlob';
import AnimatedImage from '../components/common/AnimatedImage';
import PageTransition from '../components/common/PageTransition';
import { unsplash, IMAGES } from '../utils/imageLoader';
import { staggerContainer, fadeUpVariant, slideInLeftVariant, slideInRightVariant } from '../utils/animations';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex">
        {/* Left visual panel */}
        <motion.div
          variants={slideInLeftVariant} initial="hidden" animate="visible"
          className="hidden lg:flex flex-1 relative overflow-hidden"
        >
          <AnimatedImage src={unsplash(IMAGES.auth, 900, 1200)} alt="AI video" className="absolute inset-0" aspectRatio="auto" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.8),rgba(6,182,212,0.5))' }} />
          <div className="relative z-10 flex flex-col justify-end p-12 text-white">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur">
                <Film className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl">ClipCrafters</span>
            </div>
            <h2 className="font-display font-black text-4xl leading-tight mb-3">
              Create. Edit.<br />Publish. Repeat.
            </h2>
            <p className="text-white/75 text-sm">AI-powered video creation that scales with your vision.</p>
          </div>
        </motion.div>

        {/* Right form panel */}
        <motion.div
          variants={slideInRightVariant} initial="hidden" animate="visible"
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
                Welcome back
              </motion.h1>
              <motion.p variants={fadeUpVariant} className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Sign in to continue creating
              </motion.p>
            </motion.div>

            {/* Form — plain <form> with no motion variants on fields */}
            <form onSubmit={submit} className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold mb-1.5 uppercase tracking-widest gradient-text">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm outline-none transition-colors"
                    style={{
                      background: 'rgba(124,58,237,0.07)',
                      border: `1px solid ${errors.email ? '#f87171' : 'var(--color-border)'}`,
                      color: 'var(--color-text-primary)',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(124,58,237,0.5)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.email ? '#f87171' : 'var(--color-border)'; }}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-red-400 mt-1">
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="text-xs font-semibold uppercase tracking-widest gradient-text">Password</label>
                  <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
                  <input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    autoComplete="current-password"
                    className="w-full pl-10 pr-12 py-3.5 rounded-xl text-sm outline-none transition-colors"
                    style={{
                      background: 'rgba(124,58,237,0.07)',
                      border: `1px solid ${errors.password ? '#f87171' : 'var(--color-border)'}`,
                      color: 'var(--color-text-primary)',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(124,58,237,0.5)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.password ? '#f87171' : 'var(--color-border)'; }}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-red-400 mt-1">
                    {errors.password}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 text-sm flex items-center justify-center gap-2 mt-2"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                {loading ? 'Signing in…' : 'Sign In'}
              </motion.button>
            </form>

            <p className="text-center text-sm mt-5" style={{ color: 'var(--color-text-muted)' }}>
              No account?{' '}
              <Link to="/register" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                Create one free <ArrowRight className="w-3.5 h-3.5 inline" />
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
