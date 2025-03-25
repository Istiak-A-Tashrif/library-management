import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class PaginationQuery {
  @Transform(({ value }) => Number(value))
  page: number;
  @Transform(({ value }) => Number(value))
  limit: number;
}
