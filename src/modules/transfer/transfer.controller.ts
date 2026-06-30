// transfer-cases.controller.ts

import { Controller, Get, Post, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { TransferCasesService } from './transfer.service';
import { ScopeGuard } from 'src/guard/scope.guard';

import { JwtAuthGuard } from 'src/guard/auth.guard';

import { SetMetadata } from '@nestjs/common';
import { TransferMaskInterceptor } from 'src/interceptor/transfer.mask.inmterceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const Scopes = (...scopes: string[]) =>
    SetMetadata('scopes', scopes);


@ApiTags('transfer')
@ApiBearerAuth('JWT')
@Controller('api/internal/openclaw/v1/transfer-cases')
export class TransferCasesController {
    constructor(private readonly service: TransferCasesService) { }

    @UseGuards(JwtAuthGuard, ScopeGuard)
    @UseInterceptors(TransferMaskInterceptor)
    @Scopes('transfer.read')
    @Get()
    findAll() {
        return this.service.findAll();
    }

}