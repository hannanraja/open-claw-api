import { Module } from "@nestjs/common";
import { TransferCasesController } from "./transfer.controller";
import { TransferCasesService } from "./transfer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransferCase } from "./entities/transfer.entity";

@Module({
    imports:[TypeOrmModule.forFeature([TransferCase])],
    controllers:[TransferCasesController],
    providers:[TransferCasesService],
    exports:[TransferCasesService]
})

export class TransferModule{}