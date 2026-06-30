import {
    Controller,
    Get,
    Post,
    Body,
    Req,
    UseGuards,
  } from '@nestjs/common';
  
  import { WorkItemsService } from './work-item.service';
  import { JwtAuthGuard } from 'src/guard/auth.guard';
  import { ScopeGuard } from 'src/guard/scope.guard';
  import { Scopes } from '../transfer/transfer.controller';
  import { CreateWorkItemDto } from './dto/create-work-item-dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

  
  @ApiTags('work-item')
  @ApiBearerAuth('JWT')
  @Controller('api/internal/openclaw/v1/work-items')
  export class WorkItemsController {
    constructor(private readonly service: WorkItemsService) {}
  
    // -------------------------
    // GET ALL WORK ITEMS
    // -------------------------
    @UseGuards(JwtAuthGuard, ScopeGuard)
    @Scopes('workitem.create')
    @Get()
    findAll() {
      return this.service.findAll();
    }
  
    // -------------------------
    // CREATE WORK ITEM
    // -------------------------
    @UseGuards(JwtAuthGuard, ScopeGuard)
    @Scopes('workitem.create')
    @Post()
    create(@Body() dto: CreateWorkItemDto, @Req() req: any) {
      return this.service.create(dto, req.user);
    }
  }