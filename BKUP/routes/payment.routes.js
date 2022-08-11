var express = require('express');
var router = express.Router();
const stripe = require("stripe")('sk_test_51JINs1SHKFpjeywqugn3nyuLK1inUNc6uN5GJsN0ESwCahDK8uOSLhXgS0ezrTqPRp5TxaW2jynxhFWno7fPfOeV00Y5a48XSG');

/* GET home page. */
router.get('/', function(req, res, next) {
res.render('payment', { title: 'Stripe Checkout' });
});

router.post('/create-checkout-session', async function(req, res, next) {
    try {
        const session = await stripe.checkout.sessions.create({
            customer: 'cus_KudUxj75qTue5P',
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [{
            price: 'price_1KEoG2SHKFpjeywqDvm3EbiI', // One time pricing
            quantity: req.body.quantity
        }],
        success_url: 'http://localhost:5050/success.html?id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:5050/cancel.html',
        })
        res.send({ id: session.id });
    } catch (e) {
        throw new Error(e);
    }
});

module.exports = router; 