import { IsDate, IsJSON, IsNumber, Min } from 'class-validator';

export class DataEventSchema {
  @IsNumber()
  @Min(1)
  id!: number;

  @IsNumber()
  @Min(1)
  projectId!: number;

  name!: string;

  @IsJSON()
  payload!: string;

  @IsDate()
  createdAt!: Date;
}
