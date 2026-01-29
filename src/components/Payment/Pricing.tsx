import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import PaymentModal from './PaymentModal';

const PLANS = [
    {
        id: 'price_analysis', // Replace with real Stripe Price ID
        name: 'CV Analysis',
        price: 1,
        type: 'one_time',
        features: ['Detailed AI Analysis', 'ATS Score Check', 'Improvement Suggestions'],
        popular: false,
    },
    {
        id: 'price_creation', // Replace with real Stripe Price ID
        name: 'CV Creation',
        price: 5,
        type: 'one_time',
        features: ['Create Professional CV', 'Multiple Templates', 'PDF Download', 'ATS Optimized'],
        popular: true,
    },
    {
        id: 'price_ai_edit', // Replace with real Stripe Price ID
        name: 'AI Edit',
        price: 1,
        type: 'one_time',
        features: ['Smart Content Rewrite', 'Grammar Fixes', 'Keyword Optimization'],
        popular: false,
    },
];

const SUBSCRIPTIONS = [
    {
        id: 'price_monthly', // Replace with real Stripe Price ID
        name: 'Monthly Pro',
        price: 5,
        interval: 'month',
        features: ['Unlimited Creations', 'Unlimited Analysis', 'Priority Support', 'All Templates'],
    },
    {
        id: 'price_annual', // Replace with real Stripe Price ID
        name: 'Annual Pro',
        price: 30,
        interval: 'year',
        features: ['Everything in Monthly', '2 Months Free', 'Career Coaching Session'],
    },
];

export default function Pricing() {
    // State to hold the plan object selected by the user
    const [selectedPlan, setSelectedPlan] = useState<{ id: string; price: number; name: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckout = (planId: string, price: number, name: string) => {
        setSelectedPlan({ id: planId, price, name });
        setIsModalOpen(true);
    };

    return (
        <div className="py-24 px-6 max-w-7xl mx-auto">
            <PaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                plan={selectedPlan}
            />

            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-gray-400 text-lg">Choose the plan that fits your career goals</p>
            </div>

            {/* Pay As You Go */}
            <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-cyan-500 pl-4">Pay As You Go</h3>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
                {PLANS.map((plan) => (
                    <div
                        key={plan.id}
                        className={`relative p-8 rounded-2xl border ${plan.popular ? 'border-cyan-500 bg-slate-800/50' : 'border-white/10 bg-slate-900/50'
                            } backdrop-blur-xl hover:border-cyan-500/50 transition-all group`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-900 px-4 py-1 rounded-full text-sm font-bold">
                                Most Popular
                            </div>
                        )}
                        <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                        <div className="text-3xl font-bold text-cyan-400 mb-6">
                            ${plan.price}
                        </div>
                        <ul className="space-y-3 mb-8">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-gray-300">
                                    <Check className="w-5 h-5 text-cyan-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => handleCheckout(plan.id, plan.price, plan.name)}
                            className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/25 text-white'
                                : 'bg-white/10 hover:bg-white/20 text-white'
                                } flex justify-center items-center gap-2`}
                        >
                            Get Started
                        </button>
                    </div>
                ))}
            </div>

            {/* Subscriptions */}
            <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-purple-500 pl-4">Subscriptions</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {SUBSCRIPTIONS.map((sub) => (
                    <div
                        key={sub.id}
                        className="p-8 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl hover:border-purple-500/50 transition-all"
                    >
                        <h4 className="text-xl font-bold text-white mb-2">{sub.name}</h4>
                        <div className="text-3xl font-bold text-purple-400 mb-6">
                            ${sub.price}<span className="text-lg text-gray-500 font-normal">/{sub.interval}</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            {sub.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-gray-300">
                                    <Check className="w-5 h-5 text-purple-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => handleCheckout(sub.id, sub.price, sub.name)}
                            className="w-full py-3 rounded-xl font-bold bg-white/10 hover:bg-purple-500/20 text-white transition-all flex justify-center items-center gap-2"
                        >
                            Subscribe Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
