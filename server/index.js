import express from "express";
import Stripe from "stripe";

const app = express();
const port = 3000;
const PUBLISHABLE_KEY = "pk_test_51Ol2WYSHReUGwLFzxQalFabnup0O24BbbXnhVzICOhithYWOnWhPF1sioMh6TmFbKA7AH3HtRyzqZi3qm36toE1900xA57P7SC";
const SECRET_KEY = "sk_test_51Ol2WYSHReUGwLFzIplTrRjdpSAT84iRM17yAarJ4NP1DOlts7RyTC04VeEIBTjEsdSquHfZlWQAa79AejtWRumk005j41pyCi";

const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.use(express.json()); 

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
   
    const amount = 100; 
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr", 
      payment_method_types: ["card"], 
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
});
