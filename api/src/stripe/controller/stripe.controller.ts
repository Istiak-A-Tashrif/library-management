import {
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import EmailService from 'src/email/email.service';
import { res } from '../../common/response.helper';
import { StripeService } from '../services/stripe.service';
// import { GoogleMeetService } from '../services/google-meet.service';
// import { PaymentStatus } from '@prisma/client';
// import { BookingNotificationService } from '../services/booking-notification.service';
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');
const qs = require('qs');

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly emailService: EmailService,
  ) {}

  /* stripe webhook*/
  @Post('webhook')
  @HttpCode(200)
  async stripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') sig,
  ) {
    const raw = req.rawBody; // returns a Buffer.
    let event;
    try {
      event = this.stripeService.constructEvent(
        raw,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        break;
      case 'charge.succeeded': //payment success
        const metadata = event.data?.object?.metadata;
        // if (metadata) {
        //   const order = await this.emailService.paymentSuccess(
        //     +metadata?.order_id,
        //   );

        //   if (order && order?.sendEmail) {
        //     await this.emailService.sendEmail(
        //       order?.orderData.email,
        //       `${order?.emailSubject} Order id: #00${order?.orderData?.id} `,
        //       '',
        //       order?.emailTemplate,
        //     );
        //   }
        // }

        break;

      case 'charge.failed':
        const obj2 = event.data.object;
        // console.log({obj2});
        break;
      // ... handle other event types
      default:
      // console.log(`Unhandled event type ${event.type}`);
    }

    return res.success({}, 200);
  }

  @Get('test-session')
  @HttpCode(200)
  async createTestSession() {
    // const totalAmount = Number(50) * 100
    // const session = await stripe.checkout.sessions.create({
    //   line_items: [
    //     {
    //
    //       price_data: {
    //         unit_amount: totalAmount,
    //         currency: 'usd',
    //         product_data: {
    //           // name: `${teacher?.first_name + " " + teacher?.last_name}`,
    //           // images: [
    //           //     `${teacher?.profile_photo}`,
    //           // ],
    //           name: `Lesson with `,
    //           // images: [
    //           //   `${teacher?.profile_photo}`,
    //           // ],
    //           description: `this is description`,
    //         },
    //       },
    //       quantity: 1,
    //
    //     },
    //
    //   ],
    //   payment_intent_data: {
    //     metadata: {
    //       booking_id: 1,
    //     },
    //   },
    //   mode: 'payment',
    //   client_reference_id: 1,
    //   customer_email: `test@email.com`,
    //   success_url: `ekfashion.com.au/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `ekfashion.com.au/payment-cancel`,
    // });
    // return session

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY; // Replace with your actual Stripe secret key
    const totalAmount = 1000; // Replace with the total amount in the smallest currency unit (e.g., cents for USD)

    const data = {
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: totalAmount,
            product_data: {
              name: 'Lesson with ',
              description: 'this is description',
            },
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: {
          booking_id: 1,
        },
      },
      mode: 'payment',
      client_reference_id: 1,
      customer_email: 'test@email.com',
      success_url:
        'https://ekfashion.com.au/payment-success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://ekfashion.com.au/payment-cancel',
    };

    try {
      const response = await axios.post(
        'https://api.stripe.com/v1/checkout/sessions',
        qs.stringify(data, { arrayFormat: 'brackets' }), // Using URLSearchParams to convert data into x-www-form-urlencoded format
        {
          headers: {
            Authorization: `Bearer ${stripeSecretKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error creating Checkout Session:',
        error.response ? error.response.data : error.message,
      );
      throw error;
    }
  }
}
