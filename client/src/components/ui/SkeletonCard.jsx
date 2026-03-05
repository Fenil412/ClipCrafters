export default function SkeletonCard({ variant = 'project' }) {
    if (variant === 'project') return (
        <div className="rounded-2xl overflow-hidden border border-white/5" style={{ background: 'var(--color-surface-3)' }}>
            <div className="skeleton h-44 rounded-none" />
            <div className="p-4 space-y-3">
                <div className="skeleton h-4 w-16 rounded-full" />
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-3 w-1/2" />
                <div className="skeleton h-1.5 w-full rounded-full" />
                <div className="flex gap-2 pt-1">
                    <div className="skeleton h-7 w-16 rounded-lg" />
                    <div className="skeleton h-7 w-16 rounded-lg" />
                </div>
            </div>
        </div>
    );

    if (variant === 'stat') return (
        <div className="card p-5 space-y-3">
            <div className="skeleton h-10 w-10 rounded-xl" />
            <div className="skeleton h-8 w-24" />
            <div className="skeleton h-3 w-20" />
        </div>
    );

    return (
        <div className="card p-5 space-y-3">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="skeleton h-4 w-4/6" />
        </div>
    );
}
