// src/common/audit/audit.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap, catchError } from 'rxjs/operators';
  import { throwError } from 'rxjs';
  
  import { AuditLogService } from 'src/common/audit/audit.service';
  
  @Injectable()
  export class AuditInterceptor implements NestInterceptor {
    constructor(private readonly auditLogService: AuditLogService) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();
  
      const start = Date.now();
  
      return next.handle().pipe(
        tap((responseBody) => {
          this.auditLogService.log({
            method: req.method,
            endpoint: req.originalUrl || req.url,
            statusCode: res.statusCode,
            serviceAccount: req.serviceAccount, // if you attach this somewhere (e.g. auth middleware)
            userId: req.user?.id,
            clientIp: req.ip,
            userAgent: req.headers['user-agent'],
            requestBody: req.body,
            responseBody,
          });
        }),
        catchError((err) => {
          this.auditLogService.log({
            method: req.method,
            endpoint: req.originalUrl || req.url,
            statusCode: err.status || 500,
            serviceAccount: req.serviceAccount,
            userId: req.user?.id,
            clientIp: req.ip,
            userAgent: req.headers['user-agent'],
            requestBody: req.body,
            errorMessage: err.message,
          });
          return throwError(() => err);
        }),
      );
    }
  }