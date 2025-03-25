import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class InitTransactionDto {
  @IsNumber()
  total_amount: number;

  @IsString()
  currency: string;

  @IsString()
  tran_id: string; // Unique transaction ID

  @IsString()
  success_url: string;

  @IsString()
  fail_url: string;

  @IsString()
  cancel_url: string;

  @IsString()
  ipn_url: string;

  @IsString()
  shipping_method: string;

  @IsString()
  product_name: string;

  @IsString()
  product_category: string;

  @IsString()
  product_profile: string;

  @IsString()
  cus_name: string;

  @IsString()
  cus_email: string;

  @IsString()
  cus_add1: string;

  @IsString()
  cus_city: string;

  @IsString()
  cus_state: string;

  @IsString()
  cus_postcode: string;

  @IsString()
  cus_country: string;

  @IsString()
  cus_phone: string;
}
