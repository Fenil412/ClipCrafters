import { motion } from 'framer-motion';
import { Wand2, Zap, Sparkles, Video, Edit3, Download } from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: 'AI-Powered Editing',
    description: 'Let AI handle the heavy lifting with intelligent scene generation and editing.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate professional videos in minutes, not hours.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Sparkles,
    title: 'Smart Visuals',
    description: 'Automatically generate stunning visuals that match your content.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Video,
    title: 'Multi-Scene Support',
    description: 'Create complex videos with multiple scenes and transitions.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Edit3,
    title: 'Easy Editing',
    description: 'Intuitive interface for fine-tuning every aspect of your video.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Download,
    title: 'Export Anywhere',
    description: 'Download in multiple formats optimized for any platform.',
    gradient: 'from-pink-500 to-rose-500',
  },
];

const FeatureCards = () => {
  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to create amazing videos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="card-3d group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
