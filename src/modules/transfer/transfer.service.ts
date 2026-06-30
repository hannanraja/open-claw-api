// transfer-cases.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransferCase } from './entities/transfer.entity';

@Injectable()
export class TransferCasesService {
  constructor(
    @InjectRepository(TransferCase)
    private readonly transferRepo: Repository<TransferCase>,
  ) {}

  // -------------------------
  // GET ALL TRANSFERS
  // -------------------------
  async findAll(): Promise<TransferCase[]> {
    return this.transferRepo.find({
      order: {
        id: 'DESC', // latest first (optional)
      },
    });
  }

  // -------------------------
  // GET BY ID
  // -------------------------
  async findById(id: number): Promise<TransferCase | null> {
    return this.transferRepo.findOne({
      where: { id },
    });
  }
}