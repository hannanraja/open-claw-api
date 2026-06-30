import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export type WorkItemType = 'REVIEW' | 'NOTE' | 'FLAG';
  export type WorkItemStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';
  
  @Entity('work_items')
  export class WorkItem {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    transferCaseId?: number; // optional link
  
    @Column({ length: 150 })
    title: string;
  
    @Column({ type: 'text' })
    description: string;
  
    @Column({
      type: 'enum',
      enum: ['REVIEW', 'NOTE', 'FLAG'],
    })
    type: WorkItemType;
  
    @Column({
      type: 'enum',
      enum: ['OPEN', 'IN_PROGRESS', 'DONE'],
      default: 'OPEN',
    })
    status: WorkItemStatus;
  
    @Column()
    createdBy: string; // service account / agent username
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }