import { User } from 'src/modules/users/entities/users.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { ManyToOne } from 'typeorm/browser';

@Entity('agents')
export class Agent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 100,
    })
    username: string;

    @Column({
        length: 255,
    })
    password: string;

    @Column({
        length: 150,
    })
    serviceName: string;

    @Column({
        default: true,
    })
    isActive: boolean;

    @Column('simple-array')
    scopes: string[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;



    // 👇 Foreign Key relationship
    @ManyToOne(() => User, (user) => user.id, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;
}