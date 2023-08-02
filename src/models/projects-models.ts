export interface Project {
  id: number;
  userId: number;
  name?: string;
  url?: string;
  appSecret?: string;
  createdAt: Date;
  hasOngoingDeployment: boolean;
  hasLiveDeployment: boolean;
}

export type ProjectUpdate = Partial<Project>;
