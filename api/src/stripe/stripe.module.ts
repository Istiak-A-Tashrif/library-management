import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { StripeController } from './controller/stripe.controller';
import { StripeService } from './services/stripe.service';

@Module({
  providers: [StripeService],
  exports: [StripeService],
  imports: [EmailModule],
  controllers: [StripeController],
})
export class StripeModule {}
