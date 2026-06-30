import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export enum WorkItemType {
  REVIEW = 'REVIEW',
  NOTE = 'NOTE',
  FLAG = 'FLAG',
}

export class CreateWorkItemDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Associated transfer case ID.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  transferCaseId?: number;

  @ApiProperty({
    example: 'Manual Review Required',
    description: 'Short title of the work item.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @ApiProperty({
    example:
      'Investor documents contain a mismatch between the submitted passport and CNIC. Please perform a manual verification before proceeding.',
    description: 'Detailed description of the work item.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @ApiProperty({
    enum: WorkItemType,
    example: WorkItemType.REVIEW,
    description: 'Type of work item.',
  })
  @IsEnum(WorkItemType)
  type: WorkItemType;
}