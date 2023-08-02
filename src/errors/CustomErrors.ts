import { DeploymentStatus } from '../models/deployments-models';

export class GenericError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'GenericError';
    this.status = status;
  }
}

export class DeploymentStatusError extends Error {
  public readonly status: number;

  constructor(statusFrom: DeploymentStatus, statusTo: DeploymentStatus) {
    const message = `The deployment is currently in status: ${statusFrom}, it cannot go in status ${statusTo}`;
    super(message);
    this.name = 'DeploymentStatusError';
    this.status = 409;
  }
}
