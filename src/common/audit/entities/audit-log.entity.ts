import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity('audit_logs')
  export class AuditLog {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    method: string;
  
    @Column()
    endpoint: string;
  
    @Column()
    statusCode: number;
  
    @Column({ nullable: true })
    serviceAccount: string;
  
    @Column({ nullable: true })
    userId: number;
  
    @Column({ nullable: true })
    clientIp: string;
  
    @Column({ type: 'text', nullable: true })
    userAgent: string;
  
    @Column({ type: 'longtext', nullable: true })
    requestBody: string;
  
    @Column({ type: 'longtext', nullable: true })
    responseBody: string;
  
    @Column({ type: 'text', nullable: true })
    errorMessage: string;
  
    @CreateDateColumn()
    timestamp: Date;
  }