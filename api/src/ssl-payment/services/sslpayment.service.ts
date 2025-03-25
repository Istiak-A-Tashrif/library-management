import { Injectable } from '@nestjs/common';
import * as SSLCommerzPayment from 'sslcommerz-lts';
import { InitTransactionDto } from '../dto/sslpayment.dto';

@Injectable()
export class SslCommerzService {
  constructor() {}
  // private readonly store_id =
  //   process.env.SSLCOMMERZ_STORE_ID || '<your_store_id>';
  // private readonly store_passwd =
  //   process.env.SSLCOMMERZ_STORE_PASS || '<your_store_password>';
  // private readonly is_live = false; // Change to true in production

  // private sslcz = new SSLCommerzPayment(
  //   this.store_id,
  //   this.store_passwd,
  //   this.is_live,
  // );

  // async initTransaction(data: InitTransactionDto) {
  //   try {
  //     const response = await this.sslcz.init(data);
  //     return response;
  //   } catch (error) {
  //     throw new Error(`SSLCommerz Initialization Error: ${error.message}`);
  //   }
  // }

  // async validateTransaction(val_id: string) {
  //   try {
  //     const response = await this.sslcz.validate({ val_id });
  //     return response;
  //   } catch (error) {
  //     throw new Error(`Validation Error: ${error.message}`);
  //   }
  // }

  // async initiateRefund(
  //   refundAmount: number,
  //   bankTranId: string,
  //   refeId: string,
  // ) {
  //   try {
  //     const response = await this.sslcz.initiateRefund({
  //       refund_amount: refundAmount,
  //       refund_remarks: 'Customer requested refund',
  //       bank_tran_id: bankTranId,
  //       refe_id: refeId,
  //     });
  //     return response;
  //   } catch (error) {
  //     throw new Error(`Refund Error: ${error.message}`);
  //   }
  // }

  // async refundQuery(refundRefId: string) {
  //   try {
  //     return await this.sslcz.refundQuery({ refund_ref_id: refundRefId });
  //   } catch (error) {
  //     throw new Error(`Refund Query Error: ${error.message}`);
  //   }
  // }

  // async transactionQueryByTransactionId(tranId: string) {
  //   try {
  //     return await this.sslcz.transactionQueryByTransactionId({
  //       tran_id: tranId,
  //     });
  //   } catch (error) {
  //     throw new Error(`Transaction Query Error: ${error.message}`);
  //   }
  // }

  // async processIPN(ipnData: any) {
  //   try {
  //     console.log('IPN Received:', ipnData);
  //     const validation = await this.validateTransaction(ipnData.val_id);

  //     if (validation?.status === 'VALID') {
  //       console.log('Transaction Verified:', validation);
  //       // TODO: Update order status in database
  //     } else {
  //       console.log('Transaction Failed or Invalid:', validation);
  //     }

  //     return { message: 'IPN processed successfully' };
  //   } catch (error) {
  //     console.error('IPN Processing Error:', error.message);
  //     throw new Error(`IPN Processing Error: ${error.message}`);
  //   }
  // }
}
