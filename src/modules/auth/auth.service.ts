import {
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  
  import { JwtService } from '@nestjs/jwt';
  import * as bcrypt from 'bcrypt';
  
  import { UsersService } from '../users/users.service';
  
  @Injectable()
  export class AuthService {
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
    ) {}
  
    async login(username: string, password: string) {
      const user = await this.usersService.findByUsername(username);
  
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      const passwordMatched = await bcrypt.compare(
        password,
        user.password,
      );
  
      if (!passwordMatched) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      const payload = {
        sub: user.id,
        username: user.username,
        scopes: user.scopes,
        accountType: user.accountType,
      };
  
      return {
        access_token: this.jwtService.sign(payload),
        expires_in: '24h',
      };
    }
  }