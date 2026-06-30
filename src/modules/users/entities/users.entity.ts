import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    // Display name
    @Column({ length: 100 })
    name: string;
  
    // Login username / service account name
    @Column({ unique: true, length: 100 })
    username: string;
  
    // BCrypt hashed password
    @Column()
    password: string;
  
    // Service account or normal user
    @Column({
      type: 'enum',
      enum: ['SERVICE', 'USER'],
      default: 'SERVICE',
    })
    accountType: 'SERVICE' | 'USER';
  
    // Comma-separated scopes
    // Example:
    // transfer.read,workitem.create
    @Column({
      type: 'text',
      nullable: true,
    })
    scopes: string;
  
    @Column({
      default: true,
    })
    isActive: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }