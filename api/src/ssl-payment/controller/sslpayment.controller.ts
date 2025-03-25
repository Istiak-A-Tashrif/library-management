import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { SslCommerzService } from '../services/sslpayment.service';
import { InitTransactionDto } from '../dto/sslpayment.dto';

@Controller('sslcommerz')
export class SslCommerzController {
  constructor(private readonly sslCommerzService: SslCommerzService) {}

  // @Post('/init')
  // async initiateTransaction(@Body() data: InitTransactionDto) {
  //   return this.sslCommerzService.initTransaction(data);
  // }

  // @Get('/validate')
  // async validateTransaction(@Query('val_id') val_id: string) {
  //   return this.sslCommerzService.validateTransaction(val_id);
  // }

  // @Post('/refund')
  // async initiateRefund(
  //   @Body()
  //   {
  //     refundAmount,
  //     bankTranId,
  //     refeId,
  //   }: {
  //     refundAmount: number;
  //     bankTranId: string;
  //     refeId: string;
  //   },
  // ) {
  //   return this.sslCommerzService.initiateRefund(
  //     refundAmount,
  //     bankTranId,
  //     refeId,
  //   );
  // }

  // @Get('/refund-query')
  // async refundQuery(@Query('refund_ref_id') refund_ref_id: string) {
  //   return this.sslCommerzService.refundQuery(refund_ref_id);
  // }

  // @Get('/transaction-query')
  // async transactionQuery(@Query('tran_id') tran_id: string) {
  //   return this.sslCommerzService.transactionQueryByTransactionId(tran_id);
  // }

  // @Post('/ipn')
  // async processIPN(@Body() ipnData: any) {
  //   try {
  //     return await this.sslCommerzService.processIPN(ipnData);
  //   } catch (error) {
  //     return { message: 'Error processing IPN', error: error.message };
  //   }
  // }
}
