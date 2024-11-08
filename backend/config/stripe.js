const Stripe = require("stripe")

 const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY_USD)

module.exports = stripe