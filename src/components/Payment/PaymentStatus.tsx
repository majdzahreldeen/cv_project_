import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function PaymentStatus() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const sessionId = searchParams.get('session_id');
    const canceled = window.location.pathname.includes('cancel');

    const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'canceled'>(canceled ? 'canceled' : 'loading');

    useEffect(() => {
        if (canceled) return;

        if (!sessionId) {
            setStatus('error');
            return;
        }

        const verifyPayment = async () => {
            try {
                const res = await fetch(`http://localhost:4242/api/verify-session/${sessionId}`);
                const data = await res.json();

                if (data.status === 'paid') {
                    setStatus('success');
                    // For demo purposes, we persist the paid state locally
                    localStorage.setItem('cv_paid', 'true');

                    // Optional: Auto-redirect after a few seconds
                    setTimeout(() => {
                        // navigate('/'); // Uncomment to auto-redirect
                    }, 3000);
                } else {
                    // If not paid yet, maybe polling or just showing pending
                    // For this demo, we'll assume if verify returns, it's checked. 
                    // In real webhooks, there might be a delay.
                    if (data.status === 'open') {
                        // still processing
                    } else {
                        setStatus('error');
                    }
                }
            } catch (err) {
                console.error(err);
                setStatus('error');
            }
        };

        verifyPayment();
    }, [sessionId, canceled, navigate]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white">
                <Loader2 className="w-16 h-16 text-cyan-500 animate-spin mb-4" />
                <h2 className="text-2xl font-bold">Verifying Payment...</h2>
                <p className="text-gray-400">Please wait while we confirm your transaction.</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white text-center px-4">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Payment Successful!</h2>
                <p className="text-gray-400 mb-8 max-w-md">
                    Thank you for your purchase. Your credits have been updated and you can now access the premium features.
                </p>
                <button
                    onClick={() => window.location.href = '/'} // using window.location to reset state/view for now in this simple app
                    className="px-8 py-3 bg-green-600 hover:bg-green-500 rounded-full font-bold transition-all"
                >
                    Return to Dashboard
                </button>
            </div>
        );
    }

    if (status === 'canceled') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white text-center px-4">
                <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6">
                    <XCircle className="w-10 h-10 text-yellow-500" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Payment Canceled</h2>
                <p className="text-gray-400 mb-8 max-w-md">
                    You have canceled the checkout process. No charges were made.
                </p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full font-bold transition-all"
                >
                    Return Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white text-center px-4">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                <XCircle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Something Went Wrong</h2>
            <p className="text-gray-400 mb-8">We couldn't verify your payment. Please contact support if you believe this is an error.</p>
            <button
                onClick={() => window.location.href = '/'}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full font-bold transition-all"
            >
                Return Home
            </button>
        </div>
    );
}
