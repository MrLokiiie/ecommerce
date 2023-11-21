import Stripe from "stripe";

interface ProccesEnv {
  stripe_publishableKey: string;
  stripe_apiKey: string
}

interface StripeResponse extends Stripe {}

const StripeClientConnector: StripeResponse = new Stripe(process.env.STRIPE_API_TEST_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true
});

async function serverStripeConnector(apiKey: ProccesEnv["stripe_apiKey"], publishableKey: ProccesEnv['stripe_publishableKey']): 
  Promise<StripeResponse> {
  const stripe = new Stripe(process.env.STRIPE_API_TEST_SECRET_KEY! || apiKey as string, {
    apiVersion: "2023-10-16",
    typescript: true
  });

  return stripe;
}

export {
  StripeClientConnector,
  serverStripeConnector
};