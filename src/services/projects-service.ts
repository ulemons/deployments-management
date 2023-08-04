import { Project } from '@models/projects-models';
import { Deployment } from '@models/deployments-models';
import { DeploymentUtils } from '@utils/deployments-utils';
import { FactoryService } from './factory-service';
import { CONSTANTS } from '../config';
import { QueueUtils } from '@utils/queue-utils';

const LOG_PREFIX = 'ProjectsService | ';

export class ProjectsService {
  public async createDeploymnet(projectId: number): Promise<Deployment> {
    const deployment = await FactoryService.getDeploymentDao().insertDeployment(projectId);
    QueueUtils.sendMessage({
      name: 'Deployment Creation Event',
      payload: {
        message: `deployment for project: ${deployment.projectId} created with id: ${
          deployment.id
        }`,
      },
      projectId: projectId,
    });
    return deployment;
  }

  // using a map of projects is way more optimal than making difference api call
  // for each project for calculating the "hasLiveDeployment" and "hasOngoingDeployment"
  public async getProjects(page?: number): Promise<Project[]> {
    const projects = await FactoryService.getProjetsDao().getProjects(page, CONSTANTS.PAGE_SIZE);
    const deployments = await FactoryService.getDeploymentDao().getDeploymentsByProjectIdList([
      ...new Set(projects.map(x => x.id)),
    ]);
    const deploymentMap = DeploymentUtils.mapProjectsDeployments(deployments);
    return projects.map(project => {
      return {
        ...project,
        hasLiveDeployment: DeploymentUtils.checkLiveDeployment(project, deploymentMap),
        hasOngoingDeployment: DeploymentUtils.checkOnGoingDeployment(project, deploymentMap),
      };
    });
  }

  public async getProjectById(id: number): Promise<Project> {
    const project = await FactoryService.getProjetsDao().getProjectById(id);
    const deployments = await FactoryService.getDeploymentDao().getDeploymentsByProjectId(id);
    const deploymentMap = DeploymentUtils.mapProjectsDeployments(deployments);
    return {
      ...project,
      hasLiveDeployment: DeploymentUtils.checkLiveDeployment(project, deploymentMap),
      hasOngoingDeployment: DeploymentUtils.checkOnGoingDeployment(project, deploymentMap),
    };
  }
}
