// entities/transfer-case.entity.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('transfer_cases')
  export class TransferCase {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 150 })
    investorName: string;
  
    @Column({ length: 150 })
    email: string;
  
    @Column({ length: 30 })
    phone: string;
  
    @Column({ length: 100 })
    passportNumber: string;
  
    @Column({ length: 50 })
    cnic: string;
  
    @Column({ length: 100 })
    bankAccount: string;
  
    @Column('decimal', { precision: 12, scale: 2 })
    amount: number;
  
    @Column({ length: 10 })
    currency: string;
  
    @Column({
      type: 'enum',
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    })
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }