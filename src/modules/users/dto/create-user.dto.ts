import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsValidScopes } from 'src/common/validator/scope.validator';
  
  export class CreateUserDto {
    @ApiProperty({
      example: 'OpenClaw System User',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;
  
    @ApiProperty({
      example: 'openclaw-system',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    username: string;
  
    @ApiProperty({
      example: 'OpenClaw@123',
    })
    @IsString()
    @MinLength(8)
    password: string;
  
    @ApiPropertyOptional({
      enum: ['SERVICE', 'USER'],
      default: 'SERVICE',
    })
    @IsOptional()
    @IsEnum(['SERVICE', 'USER'])
    accountType?: 'SERVICE' | 'USER';
  
    @ApiPropertyOptional({
      example: 'transfer.read,workitem.create',
    })
    @IsOptional()
    @IsString()
    @IsValidScopes()
    scopes?: string;
  
    @ApiPropertyOptional({
      example: true,
      default: true,
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
  }