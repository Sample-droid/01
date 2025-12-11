const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Donation = require('../Model/Donation');

// Helper to map Stripe statuses
function mapStripeStatusToDonationStatus(stripeStatus) {
  switch (stripeStatus) {
    case 'succeeded':
      return 'succeeded';
    case 'canceled':
      return 'canceled';
    case 'processing':
      return 'pending';
    case 'requires_payment_method':
    case 'requires_action':
    case 'requires_confirmation':
    case 'requires_capture':
    default:
      return 'pending';
  }
}

// simple reachability check
router.get('/ping', (req, res) => res.json({ ok: true }));

/* ===========================================
   CREATE PAYMENT INTENT & SAVE DONATION (PENDING)
   =========================================== */
router.post('/donations', async (req, res) => {
  console.log('📥 Donation Payload:', req.body);
  try {
    const { amount, name, email, message } = req.body;

    if (amount === undefined || name === undefined || email === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let amountNum = Number(amount);
    if (!Number.isFinite(amountNum) || isNaN(amountNum)) {
      return res.status(400).json({ error: 'Invalid donation amount' });
    }

    let amountInCents;
    if (Number.isInteger(amountNum) && amountNum >= 100) {
      amountInCents = amountNum; // already in cents
    } else {
      amountInCents = Math.round(amountNum * 100); // convert dollars to cents
    }

    if (amountInCents <= 0) {
      return res.status(400).json({ error: 'Invalid donation amount' });
    }

    const idempotencyKey =
      req.headers['idempotency-key'] || `${email}-${amountInCents}-${Date.now()}`;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: amountInCents,
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: { name, email, message: message || '' },
      },
      { idempotencyKey }
    );

    // Create donation entry
    const donationDoc = new Donation({
      amount: amountInCents,
      name,
      email,
      message: message || '',
      paymentIntentId: paymentIntent.id,
      currency: 'usd',
      status: mapStripeStatusToDonationStatus(paymentIntent.status),
    });

    try {
      await donationDoc.save();
    } catch (saveErr) {
      if (saveErr.code === 11000 && saveErr.keyPattern?.paymentIntentId) {
        console.warn('⚠️ Duplicate donation record for paymentIntentId, continuing');
      } else {
        throw saveErr;
      }
    }

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('❌ POST /api/donations error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

/* ===========================================
   UPDATE DONATION STATUS AFTER PAYMENT SUCCESS
   =========================================== */
router.post('/donations/update-status', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({ error: 'paymentIntentId is required' });
    }

    // Fetch the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Convert Stripe status to DB status
    const mappedStatus = mapStripeStatusToDonationStatus(paymentIntent.status);

    // Only update if payment succeeded
    const updateData =
      mappedStatus === 'succeeded'
        ? { status: 'succeeded' } // force succeeded
        : { status: mappedStatus };

    // Update donation document
    const updatedDonation = await Donation.findOneAndUpdate(
      { paymentIntentId },
      updateData,
      { new: true }
    );

    if (!updatedDonation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    return res.status(200).json({
      message: 'Donation status updated successfully',
      donation: updatedDonation,
    });
  } catch (err) {
    console.error('❌ UPDATE /api/donations/update-status error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});
module.exports = router;