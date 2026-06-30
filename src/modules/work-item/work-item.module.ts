import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkItem } from './entities/work-item.entity';
import { WorkItemsService } from './work-item.service';
import { WorkItemsController } from './work-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkItem])],
  controllers: [WorkItemsController],
  providers: [WorkItemsService],
  exports: [WorkItemsService],
})
export class WorkItemsModule {}