import {Module} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {PaginationService} from "./pagination.service";

@Module({
  imports: [],
  controllers: [],
  providers: [PaginationService],
  exports: [PaginationService],
})
export class PaginationModule {}
