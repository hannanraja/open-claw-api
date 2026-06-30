import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AgentModule } from './modules/agent/agent.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { WorkItemsModule } from './modules/work-item/work-item.module';
import { AuditModule } from './common/audit/audit.module';
import { AuditInterceptor } from './interceptor/audit.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',

        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),

        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),

        autoLoadEntities: true,

        synchronize: true, // false in production
      }),
    }),
    AuthModule,
    AgentModule,
    
    TransferModule,
    WorkItemsModule,
    AuditModule
  ],
  
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
    AppService],
})
export class AppModule {}
