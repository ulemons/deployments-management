import { IsDate, IsEnum, IsNumber, Min } from 'class-validator';
import { DeploymentStatus, DeploymnetStatusEnum } from '@models/deployments-models';

export class CreateDeploymentSchema {
  @Min(0)
  deployedIn!: number;

  @IsDate()
  createdAt!: Date;
}

export class UploadDeploymentSchema {
  @IsNumber()
  @Min(1)
  id!: number;

  @IsEnum(DeploymnetStatusEnum)
  status!: DeploymentStatus;
}
