import { Injectable } from '@nestjs/common';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

type OrderInfoType = {
  shipping_tax_amount: number;
  total_amount: number;
  name: string;
  email: string;
  id: number;
  user_id?: number;
  order_items: {
    product_image: string;
    price: number;
    product_name: string;
  }[];
};

@Injectable()
export class StripeService {
  constructor() {}

  async createOrder(orderData: OrderInfoType) {
    const session = await this.createStripeSession(orderData);
    return { url: session?.url };
  }

  constructEvent(body, sig, endpointSecret) {
    return stripe.webhooks.constructEvent(body, sig, endpointSecret);
  }

  async createStripeSession({
    email: user_email,
    id: order_id,
    name: user_name,
    order_items,
    shipping_tax_amount,
    user_id,
    total_amount,
  }: OrderInfoType) {
    const stripeLineItems = order_items?.map((item) => {
      return {
        price_data: {
          unit_amount: item?.price * 100,
          currency: `${process.env.CURRENCY}`,
          product_data: {
            name: item?.product_name,
            images: [item?.product_image],
            description: 'Payment gateway',
          },
        },
        quantity: 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        ...stripeLineItems,
        {
          price_data: {
            unit_amount: shipping_tax_amount * 100,
            currency: `${process.env.CURRENCY}`,
            product_data: {
              name: 'shipping and tax amount',
            },
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: {
          Customer: `${user_name}`,
          Price: total_amount,
          order_id: order_id,
          user_id: user_id,
        },
      },

      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: user_email,
      success_url: `${process.env.WEBSITE_BASE_URL}/success-order?order_number=${order_id}`,
      cancel_url: `${process.env.WEBSITE_BASE_URL}/checkout`,
    });
    return session;
  }
}
