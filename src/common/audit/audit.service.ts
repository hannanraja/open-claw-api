import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuditLog } from './entities/audit-log.entity';
import { CreateAuditLogDto } from './audit-log.dto';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditRepo: Repository<AuditLog>,
  ) {}

  // -------------------------
  // MAIN LOG METHOD
  // -------------------------
  async log(data: CreateAuditLogDto) {
    try {
      const entry: Partial<AuditLog> = {
        method: data.method,
        endpoint: data.endpoint,
        statusCode: data.statusCode,
        serviceAccount: data.serviceAccount,
        userId: data.userId,
        clientIp: data.clientIp,
        userAgent: data.userAgent,
        requestBody: this.safeStringify(data.requestBody) ?? "",
        responseBody: this.safeStringify(data.responseBody) ?? "",
        errorMessage: data.errorMessage,
      };
  
      const record = this.auditRepo.create(entry);
      await this.auditRepo.save(record);
    } catch (err) {
      console.error('Audit Log Failed:', err);
    }
  }
  // -------------------------
  // SAFE JSON STRINGIFY
  // -------------------------
  private safeStringify(value: any): string | null {
    if (!value) return null;

    try {
      return JSON.stringify(value);
    } catch {
      return '[Unserializable Data]';
    }
  }
}