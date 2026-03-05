import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const PLANS = [
    { name: 'Starter', monthlyPrice: 0, annualPrice: 0, color: '#7a7a9a', features: ['5 videos/month', '720p export', 'Basic AI scripts', 'Community support'] },
    { name: 'Pro', monthlyPrice: 29, annualPrice: 19, color: '#7c3aed', popular: true, features: ['50 videos/month', '4K export', 'Advanced AI scripts', 'Voice synthesis', 'Priority support'] },
    { name: 'Studio', monthlyPrice: 99, annualPrice: 69, color: '#06b6d4', features: ['Unlimited videos', '4K + HDR export', 'Custom AI training', 'Team collaboration', '24/7 dedicated support'] },
];

export default function PricingCards() {
    const [annual, setAnnual] = useState(false);
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section id="pricing" ref={ref} className="py-24 px-4 sm:px-8 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
                <h2 className="section-title text-4xl sm:text-5xl mb-4">Simple <span className="gradient-text">pricing</span></h2>
                <p className="mb-8" style={{ color: 'var(--color-text-muted)' }}>Start free. Scale as you grow.</p>

                {/* Toggle */}
                <div className="inline-flex items-center gap-3 p-1 rounded-xl" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid var(--color-border)' }}>
                    <button onClick={() => setAnnual(false)}
                        className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
                        style={{ background: !annual ? 'var(--gradient-accent)' : 'transparent', color: !annual ? '#fff' : 'var(--color-text-muted)' }}>
                        Monthly
                    </button>
                    <button onClick={() => setAnnual(true)}
                        className="px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                        style={{ background: annual ? 'var(--gradient-accent)' : 'transparent', color: annual ? '#fff' : 'var(--color-text-muted)' }}>
                        Annual {annual && <span className="text-xs opacity-80">Save 35%</span>}
                    </button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PLANS.map((plan, i) => (
                    <motion.div key={plan.name}
                        initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: i * 0.12, duration: 0.6 }}
                        className={`card p-8 relative ${plan.popular ? 'ring-1 ring-purple-500/40' : ''}`}
                        style={{ borderTop: `2px solid ${plan.color}` }}
                        whileHover={{ y: -8 }}
                    >
                        {plan.popular && (
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1.5"
                                style={{ background: 'var(--gradient-accent)' }}>
                                <Star className="w-3 h-3 fill-white" /> Most Popular
                            </div>
                        )}
                        <h3 className="font-display font-bold text-xl mb-1">{plan.name}</h3>
                        <div className="flex items-end gap-1 mb-1">
                            <motion.span
                                key={annual ? 'a' : 'm'}
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="font-display font-black text-5xl"
                                style={{ color: plan.color }}>
                                ${annual ? plan.annualPrice : plan.monthlyPrice}
                            </motion.span>
                            <span className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>/mo</span>
                        </div>
                        <p className="text-xs mb-6" style={{ color: 'var(--color-text-muted)' }}>{annual ? 'Billed annually' : 'Billed monthly'}</p>
                        <ul className="space-y-3 mb-8">
                            {plan.features.map(f => (
                                <li key={f} className="flex items-center gap-2.5 text-sm">
                                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: plan.color }} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <Link to="/register">
                            <motion.button
                                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${plan.popular ? 'btn-primary' : 'btn-ghost'}`}
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                {plan.monthlyPrice === 0 ? 'Start Free' : 'Get Started'}
                            </motion.button>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
