import { InjectQueue } from '@nestjs/bull';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { emailTemplateSlugs, PROCESSOR } from 'src/common/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { replacePlaceholders } from 'src/utils/emailTemplates';
const SendGrid = require('@sendgrid/mail');

@Injectable()
export default class EmailService {
  private nodemailerTransport: Mail;
  private mode: string;
  constructor(
    @InjectQueue(PROCESSOR.NAMES.SENIOR_PLACES)
    private ekFashionQueue: Queue,
    private readonly prismaService: PrismaService,
  ) {
    SendGrid.setApiKey(process.env.SENDGRID_KEY);
    this.nodemailerTransport = nodemailer.createTransport({
      service: 'Gmail',
      port: 587,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });

    this.mode = process.env.MODE;
  }
  sendMailReset(mail) {
    return SendGrid.send(mail);
  }

  async sendEmail(
    to_email: string,
    subject = 'Senior Place',
    text: string,
    html = null,
  ) {
    const payload: any = {
      to: to_email,
      from: process.env.SENDER_EMAIL,
      subject: subject,
      text: text,
    };
    if (html) {
      payload.html = html;
    }

    try {
      if (this.mode === 'development') {
        await this.nodemailerTransport.sendMail(payload);
        return { send_message: true };
      }

      const job = await this.ekFashionQueue.add(
        PROCESSOR.JOBS.EMAIL_SEND,
        payload,
      );

      return { jobId: job.id, send_message: true };
    } catch (err) {
      throw new HttpException(
        'Email sending has problem',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async pdfSend(payload) {
    try {
      if (this.mode === 'development') {
        await this.nodemailerTransport.sendMail(payload);
        return { send_message: true };
      }

      const job = await this.ekFashionQueue.add(
        PROCESSOR.JOBS.EMAIL_SEND,
        payload,
      );

      return { jobId: job.id, send_message: true };
    } catch (err) {
      throw new HttpException(
        'Email sending has problem',
        HttpStatus.BAD_REQUEST,
      );
    }
  

    // if (emailTemplate) {
    //   const orderDate = new Date(updateOrder?.created_at);

    //   const orderItemsContent = emailTemplate?.content.match(
    //     /({order_items})([\s\S]*?)(\/order_items)/,
    //   );

    //   let productTemplate = orderItemsContent ? orderItemsContent[2] : '';
    //   let ordered_products = '';

    //   updateOrder?.OrderItem.forEach((item) => {
    //     const productName =
    //       item?.Product?.name?.length > 30
    //         ? item?.Product?.name?.slice(0, 30) + '...'
    //         : item?.Product.name;

    //     let populatedTemplate = productTemplate
    //       .replace('{item_name}', productName)
    //       .replace('{item_quantity}', String(item.product_quantity))
    //       .replace('{item_price}', String(item?.total_price))
    //       .replace('{', '');

    //     ordered_products += populatedTemplate;
    //   });

    //   const placeholders = {
    //     customer_name: updateOrder?.name,
    //     order_number: `#00${updateOrder.id}`,
    //     order_date: orderDate?.toLocaleDateString(),
    //     total_amount: `$${
    //       updateOrder?.sub_amount +
    //       updateOrder?.tax_amount +
    //       updateOrder?.shipping_amount
    //     }`,
    //     tracking_link: 'https://ekfashion.com.au',
    //     customer_service_email: 'ek.fashion@gmail.com',
    //     order_items: ordered_products,
    //   };

    //   //   const template = replacePlaceholders(
    //   //     emailTemplate?.content,
    //   //     placeholders,
    //   //   );

    //   const template = replacePlaceholders(
    //     emailTemplate?.content.replace(
    //       /{order_items}[\s\S]*?\/order_items}/,
    //       ordered_products,
    //     ),
    //     placeholders,
    //   );

    //   const data = {
    //     orderData: updateOrder,
    //     emailTemplate: template,
    //     sendEmail: true,
    //     emailSubject: emailTemplate?.subject ?? 'Thank you for your order!',
    //   };
    //   return data;
    // }

    return null;
  }
}
