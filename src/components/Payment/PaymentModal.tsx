import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { X, CreditCard, ExternalLink, ShieldCheck } from 'lucide-react';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// Replace with your PUBLIC key
const stripePromise = loadStripe('pk_test_YOUR_PUBLIC_KEY');

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    plan: { id: string; price: number; name: string } | null;
}

export default function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
    const [provider, setProvider] = useState<'stripe' | 'paypal' | 'paystack' | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    if (!isOpen || !plan) return null;

    const handlePaymentInit = async (selectedProvider: 'stripe' | 'paypal' | 'paystack') => {
        setProvider(selectedProvider);
        setLoading(true);

        try {
            const clientReferenceId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;

            const res = await fetch('http://localhost:4242/api/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    provider: selectedProvider,
                    priceId: plan.id,
                    amount: plan.price,
                    clientReferenceId
                })
            });
            const data = await res.json();

            if (selectedProvider === 'stripe' && data.clientSecret) {
                setClientSecret(data.clientSecret);
            } else if (selectedProvider === 'paystack' && data.authorizationUrl) {
                window.location.href = data.authorizationUrl;
            } else if (selectedProvider === 'paypal' && data.approvalUrl) {
                window.location.href = data.approvalUrl;
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 bg-slate-100 border-b">
                    <h3 className="font-bold text-slate-800">Checkout: {plan.name} (${plan.price})</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-600" />
                    </button>
                </div>

                <div className="p-6 bg-white overflow-y-auto">
                    {!clientSecret ? (
                        <div className="space-y-4">
                            <p className="text-slate-600 mb-4 font-medium">Select a secure payment method:</p>

                            <button
                                onClick={() => handlePaymentInit('stripe')}
                                className="w-full p-4 border rounded-xl flex items-center justify-between hover:border-blue-500 hover:bg-blue-50 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <span className="font-bold text-slate-700">Credit / Debit Card</span>
                                </div>
                                <ShieldCheck className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>

                            <button
                                onClick={() => handlePaymentInit('paypal')}
                                className="w-full p-4 border rounded-xl flex items-center justify-between hover:border-blue-800 hover:bg-blue-50 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    {/* PayPal Logo Placeholder */}
                                    <div className="bg-blue-100 p-2 rounded-lg text-blue-800 font-bold italic">
                                        Pay<span className="text-blue-500">Pal</span>
                                    </div>
                                    <span className="font-bold text-slate-700">PayPal</span>
                                </div>
                                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                            </button>

                            <button
                                onClick={() => handlePaymentInit('paystack')}
                                className="w-full p-4 border rounded-xl flex items-center justify-between hover:border-green-500 hover:bg-green-50 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    {/* Verve/Paystack Placeholders */}
                                    <div className="bg-green-100 p-2 rounded-lg flex gap-1">
                                        <div className="w-6 h-4 bg-red-500 rounded-sm"></div> {/* Verve-ish */}
                                        <span className="font-bold text-green-700 text-sm">Verve</span>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="font-bold text-slate-700">Local Cards (Verve/M-Pesa)</span>
                                        <span className="text-xs text-slate-500">Secured by Paystack</span>
                                    </div>
                                </div>
                                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-green-600" />
                            </button>

                            {loading && <div className="text-center text-slate-500 animate-pulse mt-4">Initializing Payment...</div>}
                        </div>
                    ) : (
                        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                            <EmbeddedCheckout />
                        </EmbeddedCheckoutProvider>
                    )}
                </div>
            </div>
        </div>
    );
}
