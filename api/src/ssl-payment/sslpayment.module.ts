import { Module } from '@nestjs/common';
import { SslCommerzController } from './controller/sslpayment.controller';
import { SslCommerzService } from './services/sslpayment.service';

@Module({
  controllers: [SslCommerzController],
  providers: [SslCommerzService],
})
export class SslCommerzModule {}
