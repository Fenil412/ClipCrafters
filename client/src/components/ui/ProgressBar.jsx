export default function ProgressBar({ value = 0, className = '' }) {
    return (
        <div className={`h-1.5 rounded-full overflow-hidden ${className}`}
            style={{ background: 'rgba(124,58,237,0.12)' }}>
            <div className="progress-fill h-full" style={{ width: `${value}%` }} />
        </div>
    );
}
