import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class TransferMaskInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
      return next.handle().pipe(
        map((data) => {
          if (Array.isArray(data)) {
            return data.map((item) => this.mask(item)); // ✅ FIXED BINDING
          }
          return this.mask(data);
        }),
      );
    }
  
    // -------------------------
    // MASK SINGLE OBJECT
    // -------------------------
    private mask(item: any) {
      if (!item) return item;
  
      return {
        ...item,
  
        investorName: this.maskName(item.investorName),
        email: this.maskEmail(item.email),
        phone: this.maskPhone(item.phone),
  
        passportNumber: this.maskSensitive(item.passportNumber),
        cnic: this.maskSensitive(item.cnic),
        bankAccount: this.maskSensitive(item.bankAccount),
      };
    }
  
    // -------------------------
    // NAME MASKING
    // -------------------------
    private maskName(name?: string): string {
      if (!name) return '';
  
      const parts = name.split(' ');
      return parts.map((p) => p[0] + '***').join(' ');
    }
  
    // -------------------------
    // EMAIL MASKING
    // -------------------------
    private maskEmail(email?: string): string {
      if (!email) return '';
  
      return email.replace(/(.{2}).+(@.+)/, '$1***$2');
    }
  
    // -------------------------
    // PHONE MASKING
    // -------------------------
    private maskPhone(phone?: string): string {
      if (!phone) return '';
  
      return phone.replace(/\d(?=\d{2})/g, '*');
    }
  
    // -------------------------
    // GENERIC SENSITIVE MASK
    // -------------------------
    private maskSensitive(value?: string): string {
      if (!value) return '';
      return '****';
    }
  }