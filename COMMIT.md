## 11/23/2023 - COMMIT

Today's commit was on the Upgrade to Pro Ui. (Commit One)


## Stripe TO-DO:
```typescript
import Stripe from "stripe";
type StripeKeys = {
  api_key: string,
}

const StripeKeys: StripeKeys = {
  apiKey: proccess.env.STRIPE_API_TEST_SECRET_KEY!,
};

export const stripe = new Stripe(StripeKeys.apiKey, {
  apiVersion: "2023-10-16",
  ypescript: true
});
```

## Upgrade TO-DO:
Set up the Purchase API or use server actions for the stripe api. Stripe Documentation: [Stripe Documentation](https://stripe.com/docs/test-mode)

## PUSH-NOTIFCATIONS & Webhook API w/ Stripe:
Setup QStash properly using [Upstash](https://upstash.com). Setup the external api server w/ ```Python``` and manage the webhooks passing through with that. And setup POST requests so when someone purchases that product. The owner of that product will recieve a dashboard notification. 