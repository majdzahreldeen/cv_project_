# CV Builder & Analysis Platform

A comprehensive React-based application for building ATS-friendly CVs, analyzing them with AI (mock), and a protected payment gateway integration for premium features.

## Features

*   **CV Builder**: Interactive form with real-time preview.
*   **Protected Preview**: "Pay-to-Unlock" functionality with watermarks and interaction blocking.
*   **Unified Payment Gateway**: Multi-provider support for **Stripe**, **PayPal**, and **Verve/Local Cards (via Paystack)**.
*   **ATS Analysis**: Score your CV against job descriptions (Mock logic included).
*   **Responsive Design**: Built with Tailwind CSS for all devices.

## Prerequisites

*   [Node.js](https://nodejs.org/) (v16 or higher)
*   npm (Node Package Manager)

## Installation

The project consists of a React Frontend (root) and an Express Backend (`server/`).

### 1. Setup Frontend
```bash
# Install dependencies in the root directory
npm install
```

**Key Frontend Dependencies:**
*   `react`, `react-dom`
*   `react-router-dom` (Routing)
*   `@react-pdf/renderer` (PDF Generation)
*   `@stripe/react-stripe-js`, `@stripe/stripe-js` (Stripe UI)
*   `lucide-react` (Icons)
*   `tailwindcss` (Styling)

### 2. Setup Backend
```bash
# Navigate to the server directory
cd server

# Install backend dependencies
npm install
```

**Key Backend Dependencies:**
*   `express` (Server)
*   `stripe` (Stripe SDK)
*   `axios` (HTTP Requests for Paystack)
*   `cors`, `dotenv` (Middleware)

## Configuration

Create a `.env` file in the `server/` directory with the following keys:

```env
PORT=4242
CLIENT_URL=http://localhost:5173

# Stripe (Get keys from dashboard.stripe.com)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal (Get keys from developer.paypal.com)
PAYPAL_CLIENT_ID=...
PAYPAL_SECRET=...

# Paystack / Verve (Get keys from dashboard.paystack.com)
PAYSTACK_SECRET_KEY=sk_test_...
```

*Note: For the frontend to work with Stripe, update `src/components/Payment/PaymentModal.tsx` with your Stripe Publishable Key (`pk_test_...`).*

## Running the Project

You need to run both the frontend and backend servers simultaneously.

### 1. Start Backend
```bash
# In terminal 1
cd server
node index.js
```
*Server runs on http://localhost:4242*

### 2. Start Frontend
```bash
# In terminal 2 (Root directory)
npm run dev
```
*Frontend runs on http://localhost:5173*

## Usage Guide or Payment Testing

1.  Navigate to `/pricing` or click "Unlock" in the CV Builder.
2.  Click "Get Started".
3.  **Select Payment Method**:
    *   **Credit Card**: Uses Stripe Embedded Checkout (Test card: `4242 4242...`).
    *   **PayPal**: Simulates a PayPal redirect.
    *   **Local Cards**: Simulates a Verve/Paystack transaction.
4.  Upon success, the CV Builder unlocks for full download/printing.
