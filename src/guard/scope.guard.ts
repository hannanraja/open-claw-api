import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  
  @Injectable()
  export class ScopeGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredScopes =
        this.reflector.get<string[]>('scopes', context.getHandler()) || [];
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (!user) {
        throw new UnauthorizedException('User not authenticated');
      }
  
      // no scope required → allow
      if (requiredScopes.length === 0) return true;
  
      const userScopes: string[] = user.scopes || [];
  
      const hasScope = requiredScopes.some((scope) =>
        userScopes.includes(scope),
      );
  
      if (!hasScope) {
        throw new ForbiddenException(
          `Missing required scope(s): ${requiredScopes.join(', ')}`,
        );
      }
  
      return true;
    }
  }