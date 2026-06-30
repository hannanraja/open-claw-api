import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WorkItem } from './entities/work-item.entity';
import { CreateWorkItemDto } from './dto/create-work-item-dto';

@Injectable()
export class WorkItemsService {
  constructor(
    @InjectRepository(WorkItem)
    private readonly repo: Repository<WorkItem>,
  ) {}

  findAll() {
    return this.repo.find({
      order: { id: 'DESC' },
    });
  }

  async create(dto: CreateWorkItemDto, user: any) {
    const workItem = this.repo.create({
      ...dto,
      createdBy: user.username, // from JWT
      status: 'OPEN',
    });

    return this.repo.save(workItem);
  }
}