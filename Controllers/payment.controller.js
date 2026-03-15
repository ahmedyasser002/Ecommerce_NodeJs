import Stripe from "stripe";
import asyncHandler from "../Middlewares/asyncHandler.js";
import AppError from "../Utils/AppError.js";
import { userModel } from "../Models/User.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = asyncHandler(async (req, res, next) => {
  const amount=10000;
  const currency="usd";
  const { paymentMethodId } = req.body;
  const userId = req.user?._id;

  const user = await userModel.findById(userId);
  if (!user) throw new AppError("User not found", 404);

  try {
    let stripeCustomerId = user.stripeCustomerId;

    // 1️⃣ Create Stripe Customer if not exists
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name
      });

      stripeCustomerId = customer.id;
      user.stripeCustomerId = stripeCustomerId;
      await user.save();
    }

    // 2️⃣ Retrieve payment method info
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    // 3️⃣ Attach if not attached
    if (!paymentMethod.customer) {
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: stripeCustomerId
      });
    }

    // 4️⃣ Save card metadata if not stored
    const existingCard = user.cards?.find(
      (c) => c.stripePaymentMethodId === paymentMethodId
    );

    if (!existingCard) {
      user.cards.push({
        stripePaymentMethodId: paymentMethod.id,
        last4: paymentMethod.card.last4,
        brand: paymentMethod.card.brand,
        expMonth: paymentMethod.card.exp_month,
        expYear: paymentMethod.card.exp_year
      });

      await user.save();
    }

    // 5️⃣ Set default payment method
    await stripe.customers.update(stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId
      }
    });

    // 6️⃣ Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: stripeCustomerId,
      payment_method: paymentMethodId,
      confirm: true,
      setup_future_usage: "off_session",
      // This explicitly tells Stripe: "If they need a redirect, just fail the payment"
      automatic_payment_methods: { 
        enabled: true, 
        allow_redirects: "never" 
      }
    });
    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret
    });

  } catch (error) {
    next(new AppError(error.message || "Payment failed", 400));
  }
});


export const getSavedCards = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id).select("cards");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    cards: user.cards || []
  });
});