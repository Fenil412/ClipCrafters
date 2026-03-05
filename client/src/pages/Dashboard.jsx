import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Plus, Bell, FolderOpen, Video, Film, BarChart2, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import Sidebar from '../components/layout/Sidebar';
import StatWidget from '../components/dashboard/StatWidget';
import ProjectCard from '../components/dashboard/ProjectCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import QuickActions from '../components/dashboard/QuickActions';
import SkeletonCard from '../components/ui/SkeletonCard';
import { useAuth } from '../hooks/useAuth';
import { projectService } from '../services/project.service';
import { useCommandPalette } from '../hooks/useCommandPalette';
import CommandPalette from '../components/ui/CommandPalette';
import { staggerContainer, fadeUpVariant } from '../utils/animations';

export default function Dashboard() {
  const { user } = useAuth();
  const { open, setOpen } = useCommandPalette();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await projectService.getAll();
      setProjects(res.data.data.projects || []);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const deleteProject = async (id) => {
    try {
      await projectService.remove(id);
      setProjects(p => p.filter(x => x._id !== id));
      toast.success('Project deleted');
    } catch {
      toast.error('Failed to delete project');
    }
  };

  const greetHour = new Date().getHours();
  const greeting = greetHour < 12 ? 'Good morning' : greetHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <PageTransition>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 md:ml-[240px] min-w-0">
          {/* Header */}
          <div className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between border-b"
            style={{ background: 'rgba(8,8,16,0.85)', backdropFilter: 'blur(20px)', borderColor: 'var(--color-border)' }}>
            <div>
              <h1 className="font-display font-bold text-xl sm:text-2xl">
                {greeting}, {user?.name?.split(' ')[0] || 'Creator'} 👋
              </h1>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <QuickActions />
              <motion.button whileHover={{ scale: 1.05 }} className="relative p-2.5 glow-border rounded-xl">
                <Bell className="w-5 h-5 text-purple-400" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              </motion.button>
              <Link to="/projects/create">
                <motion.button className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Plus className="w-4 h-4" /> New Project
                </motion.button>
              </Link>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Stats */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible"
              className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: FolderOpen, label: 'Total Projects', value: projects.length, color: '#7c3aed' },
                { icon: Video, label: 'Videos Created', value: projects.filter(p => p.videoId).length, color: '#06b6d4' },
                { icon: Film, label: 'Scenes Generated', value: 0, color: '#a855f7' },
                { icon: BarChart2, label: 'Hours Saved', value: projects.length * 3, suffix: 'h', color: '#f59e0b' },
              ].map(s => (
                <motion.div key={s.label} variants={fadeUpVariant}>
                  <StatWidget {...s} />
                </motion.div>
              ))}
            </motion.div>

            {/* Projects */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-bold text-xl">Projects</h2>
                <motion.button onClick={fetchProjects} whileHover={{ scale: 1.06 }} className="p-2 rounded-lg glow-border">
                  <RefreshCw className="w-4 h-4 text-purple-400" />
                </motion.button>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {[...Array(6)].map((_, i) => <SkeletonCard key={i} variant="project" />)}
                </div>
              ) : projects.length === 0 ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="card p-14 text-center">
                  <FolderOpen className="w-12 h-12 mx-auto mb-4 text-purple-400/40" />
                  <p className="font-display font-bold text-lg mb-2">No projects yet</p>
                  <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>Create your first AI video project</p>
                  <Link to="/projects/create">
                    <motion.button className="btn-primary px-8 py-3 text-sm" whileHover={{ scale: 1.04 }}>
                      <Plus className="w-4 h-4 inline mr-2" /> Create Project
                    </motion.button>
                  </Link>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {projects.map((p, i) => (
                    <ProjectCard key={p._id} project={p} index={i} onDelete={deleteProject} />
                  ))}
                </div>
              )}
            </div>

            {/* Bottom */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ActivityFeed />
              </div>
              <div className="card p-6">
                <h3 className="font-display font-bold text-base mb-4">Quick Start</h3>
                <div className="space-y-3">
                  {[['Create a project', '/projects/create'], ['Generate AI video', '/projects/create'], ['Edit scenes', '/dashboard']].map(([label, to]) => (
                    <Link key={label} to={to}
                      className="flex items-center justify-between p-3 rounded-xl transition-colors hover:bg-white/5 text-sm">
                      <span>{label}</span>
                      <span className="text-purple-400 text-xs">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </PageTransition>
  );
}
