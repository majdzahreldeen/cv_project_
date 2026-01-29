import { ReactNode } from 'react';
import { Lock, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProtectedPreviewProps {
    isPaid: boolean;
    children: ReactNode;
}

export default function ProtectedPreview({ isPaid, children }: ProtectedPreviewProps) {
    const navigate = useNavigate();

    if (isPaid) {
        return <>{children}</>;
    }

    return (
        <div
            className="relative w-full h-full group"
            onContextMenu={(e) => e.preventDefault()}
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
        >
            {/* The Content (Visible but Protected) */}
            <div className="w-full h-full pointer-events-none">
                {children}
            </div>

            {/* Security Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end pb-8 bg-transparent overflow-hidden pointer-events-none">

                {/* Watermark Pattern */}
                <div className="absolute inset-0 z-0 opacity-15 flex flex-wrap content-start justify-center gap-12 p-10 rotate-12 scale-110 pointer-events-none">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div key={i} className="text-4xl font-black text-slate-500 whitespace-nowrap transform -rotate-45 select-none">
                            PREVIEW ONLY
                        </div>
                    ))}
                </div>

                {/* Unlock Action Banner (Floating at bottom) */}
                <div className="relative z-20 mx-auto pointer-events-auto">
                    <div className="bg-slate-900/90 border border-cyan-500/30 p-4 rounded-xl shadow-2xl backdrop-blur-xl flex items-center gap-6 max-w-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center animate-pulse">
                                <Lock className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">Preview Mode</h3>
                                <p className="text-xs text-gray-400">Pay to remove watermarks & download</p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/pricing')}
                            className="group relative px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 transition-all flex items-center gap-2"
                        >
                            <CreditCard className="w-4 h-4" />
                            <span>Unlock</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
