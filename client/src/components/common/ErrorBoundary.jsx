import { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) { super(props); this.state = { error: null }; }
    static getDerivedStateFromError(e) { return { error: e }; }
    render() {
        if (this.state.error) return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
                <h1 className="font-display text-3xl mb-3 gradient-text">Something went wrong</h1>
                <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>{this.state.error.message}</p>
                <button onClick={() => location.reload()} className="btn-primary px-6 py-2.5 text-sm">Reload</button>
            </div>
        );
        return this.props.children;
    }
}
