import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AgentContextQueryDto {
  @ApiProperty({
    example: 'openclaw-or-registry',
    description: 'Agent/service account name',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  agentName: string;
}