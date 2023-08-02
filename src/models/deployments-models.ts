export type DeploymentStatus =
  | 'pending'
  | 'building'
  | 'deploying'
  | 'failed'
  | 'cancelled'
  | 'done';

export enum DeploymnetStatusEnum {
  pending = 'pending',
  building = 'building',
  deploying = 'deploying',
  failed = 'failed',
  cancelled = 'cancelled',
  done = 'done',
}

export interface DeploymentDB {
  id: number;
  deployed_in: number;
  status: DeploymentStatus;
  created_at: Date;
  project_id: number;
}

export interface Deployment {
  id: number;
  deployedIn: number;
  status: DeploymentStatus;
  createdAt: Date;
  projectId: number;
}

export type DeploymentUpdate = Partial<Deployment>;

export interface DeploymentUpdateRequest {
  id: number;
  status: DeploymentStatus;
}

export interface DeploymentStats {
  avgWeeklySuccess: number;
  avgWeeklyCounter: number;
}

export interface DeploymentCounter {
  weeklySuccess: number;
  weeklyCounter: number;
}

export interface DeploymnetUpdateResponse {
  message: string
} 
