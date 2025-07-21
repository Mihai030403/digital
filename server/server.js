const express = require('express');
const app = express();
const stripe = require('stripe')('SECRET_STRIPE_KEY_AICI'); // pune cheia ta secretă Stripe
const cors = require('cors');
app.use(cors());
app.use(express.json());

const YOUR_DOMAIN = 'stately-pegasus-cbb879.netlify.app'; // schimbă cu domeniul tău când pui online

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'ron',
          product_data: {
            name: 'Ghid Freelanceri 2025',
            description: 'Ghid complet pentru freelanceri',
          },
          unit_amount: 9900, // 99 RON în bani
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });
    res.json({ sessionId: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4242, () => console.log('Server running on port 4242'));