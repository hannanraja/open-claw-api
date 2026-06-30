export interface CreateAuditLogDto {
    method: string;
    endpoint: string;
    statusCode: number;
    serviceAccount?: string;
    userId?: number;
    clientIp?: string;
    userAgent?: string;
    requestBody?: any;
    responseBody?: any;
    errorMessage?: string;
  }