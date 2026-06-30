import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'openclaw-system',
    description: 'Service account username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'OpenClaw@123',
    description: 'Service account password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}