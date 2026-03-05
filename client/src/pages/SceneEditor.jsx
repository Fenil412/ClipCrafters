import { useParams } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import Sidebar from '../components/layout/Sidebar';

export default function SceneEditor() {
  const { id } = useParams();
  return (
    <PageTransition>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 md:ml-[240px] flex items-center justify-center p-6">
          <p className="gradient-text font-display text-xl">Scene Editor — {id}</p>
        </main>
      </div>
    </PageTransition>
  );
}
