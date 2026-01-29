import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import crypto from 'crypto';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4242;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
    apiVersion: '2024-06-20',
});

// Middleware
app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api/webhooks')) {
        next();
    } else {
        express.json()(req, res, next);
    }
});
app.use(cors());

// Mock Database Update Function
const updateUserCredits = async (userId, type) => {
    console.log(`[DB MOCK] Updating user ${userId} credits for purchase: ${type}`);
    return true;
};

// Unified Payment Creation Endpoint
app.post('/api/create-payment', async (req, res) => {
    const { provider, priceId, amount, currency, email, clientReferenceId } = req.body;

    try {
        if (provider === 'stripe') {
            // STRIPE LOGIC (Embedded)
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{ price: priceId, quantity: 1 }],
                mode: 'payment',
                ui_mode: 'embedded',
                client_reference_id: clientReferenceId,
                return_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}&provider=stripe`,
            });
            return res.json({ clientSecret: session.client_secret });

        } else if (provider === 'paystack') {
            // PAYSTACK LOGIC (Verve)
            // Paystack uses Kobo/Cents, so multiply amount by 100 if receiving dollars/base unit
            // Assuming 'amount' is passed in USD or Base Currency. 
            // For demo, let's assume raw amount from frontend is appropriate.
            // Note: Paystack strictly uses ZAR, NGN, GHS, USD. 

            const paystackRes = await axios.post(
                'https://api.paystack.co/transaction/initialize',
                {
                    email: email || 'customer@example.com',
                    amount: (amount || 1000) * 100, // Convert to lowest currency unit (e.g. kobo)
                    reference: clientReferenceId, // Using our ID as ref
                    callback_url: `${process.env.CLIENT_URL}/payment/success?provider=paystack`,
                    channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'] // Ensure card is there for Verve
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return res.json({ authorizationUrl: paystackRes.data.data.authorization_url });

        } else if (provider === 'paypal') {
            // PAYPAL MOCK LOGIC (Simulated)
            // In real app, use paypal-rest-sdk to create payment and get approval_url
            console.log('Mocking PayPal creation for', clientReferenceId);
            return res.json({
                approvalUrl: `${process.env.CLIENT_URL}/payment/success?provider=paypal&token=mock_token`,
                mock: true
            });
        }

        res.status(400).json({ error: 'Invalid provider' });

    } catch (error) {
        console.error('Payment creation error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Payment initialization failed' });
    }
});


// ---------------- WEBHOOKS ----------------

// Stripe Webhook
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        await updateUserCredits(session.client_reference_id, 'stripe_success');
    }
    res.send();
});

// Paystack Webhook
app.post('/api/webhooks/paystack', express.json(), async (req, res) => {
    const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
        .update(JSON.stringify(req.body))
        .digest('hex');

    if (hash == req.headers['x-paystack-signature']) {
        const event = req.body;
        if (event.event === 'charge.success') {
            const ref = event.data.reference; // Our clientReferenceId
            await updateUserCredits(ref, 'paystack_success');
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

// PayPal Webhook (Mock)
app.post('/api/webhooks/paypal', express.json(), async (req, res) => {
    // Verify IPN or Signature here...
    console.log('PayPal Webhook received');
    res.sendStatus(200);
});

// ---------------- UTILS ----------------

app.get('/api/verify-session/:sessionId', async (req, res) => {
    // ... existing logic can stay or be genericized ...
    const { sessionId } = req.params;
    try {
        // If it looks like a stripe session
        if (sessionId.startsWith('cs_')) {
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            return res.json({ status: session.payment_status });
        }
        // For Paystack/PayPal we might verify via their APIs using the ref/token
        // For now, assuming direct success callback means success for simplicity
        res.json({ status: 'paid' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
