import { DataSource } from 'typeorm';
import { Agent } from 'src/modules/agent/entities/agent.entity';
import { User } from 'src/modules/users/entities/users.entity';
import { TransferCase } from 'src/modules/transfer/entities/transfer.entity';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

const config = new ConfigService();

export const AppDataSource = new DataSource({
    type: 'mysql',

    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),

    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    entities: [Agent, User, TransferCase],

    synchronize: true,
    logging: false,
});