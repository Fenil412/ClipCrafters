import { memo } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Eye, Trash2, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedImage from '../common/AnimatedImage';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import Tooltip from '../ui/Tooltip';
import { projectImage } from '../../utils/imageLoader';
import { formatDate } from '../../utils/formatDate';

const ProjectCard = memo(function ProjectCard({ project, index, onDelete }) {
    const imgSrc = projectImage(index);
    const progress = project.status === 'completed' ? 100 : project.status === 'processing' ? 60 : 20;

    return (
        <motion.div
            className="card overflow-hidden group hover-gradient-border"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
        >
            {/* Image */}
            <div className="relative overflow-hidden">
                <AnimatedImage src={imgSrc} alt={project.title} aspectRatio="16/9" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 gap-2">
                    <Link to={`/projects/${project._id}`}>
                        <motion.button className="btn-primary px-4 py-1.5 text-xs flex items-center gap-1.5" whileHover={{ scale: 1.05 }}>
                            <Eye className="w-3 h-3" /> View
                        </motion.button>
                    </Link>
                    {project.videoId && (
                        <Link to={`/editor/${project.videoId}`}>
                            <motion.button className="btn-ghost px-4 py-1.5 text-xs flex items-center gap-1.5 bg-white/10" whileHover={{ scale: 1.05 }}>
                                <Edit3 className="w-3 h-3" /> Edit
                            </motion.button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                    <Badge status={project.status || 'draft'} />
                    <Tooltip label="Delete project" side="left">
                        <motion.button
                            onClick={() => onDelete?.(project._id)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/8 transition-colors"
                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Trash2 className="w-3.5 h-3.5" />
                        </motion.button>
                    </Tooltip>
                </div>

                <h3 className="font-display font-bold text-base mb-1 truncate">{project.title || 'Untitled Project'}</h3>
                <div className="flex items-center gap-1.5 text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
                    <Calendar className="w-3 h-3" />
                    {formatDate(project.createdAt)}
                </div>

                <ProgressBar value={progress} />

                <div className="mt-4 flex gap-2">
                    <Link to={`/projects/${project._id}`} className="flex-1">
                        <motion.button className="w-full btn-ghost py-2 text-xs" whileHover={{ scale: 1.02 }}>
                            <Eye className="w-3 h-3 inline mr-1" /> View
                        </motion.button>
                    </Link>
                    {project.videoId && (
                        <Link to={`/editor/${project.videoId}`} className="flex-1">
                            <motion.button className="w-full btn-primary py-2 text-xs" whileHover={{ scale: 1.02 }}>
                                <Edit3 className="w-3 h-3 inline mr-1" /> Edit
                            </motion.button>
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
});

export default ProjectCard;
