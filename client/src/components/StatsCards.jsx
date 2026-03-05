import { motion } from 'framer-motion';
import { FolderOpen, Video, Film } from 'lucide-react';

const StatsCards = ({ stats = {} }) => {
  const cards = [
    {
      icon: FolderOpen,
      label: 'Total Projects',
      value: stats.projects || 0,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
    },
    {
      icon: Video,
      label: 'Videos Generated',
      value: stats.videos || 0,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
    },
    {
      icon: Film,
      label: 'Scenes Edited',
      value: stats.scenes || 0,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4, scale: 1.02 }}
          className={`card-3d relative overflow-hidden bg-gradient-to-br ${card.bgGradient} backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{card.label}</p>
              <p className="text-3xl font-display font-bold">{card.value}</p>
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient}`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
