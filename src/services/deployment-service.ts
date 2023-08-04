import { CONSTANTS } from '../config';
import {
  Deployment,
  DeploymentStats,
  DeploymentUpdateRequest,
  DeploymnetUpdateResponse,
} from '@models/deployments-models';
import { DeploymentUtils } from '@utils/deployments-utils';
import { FactoryService } from './factory-service';
import { QueueUtils } from '@utils/queue-utils';
import { CommonUtils } from '@utils/common-utils';

export class DeploymentsService {
  public async updateDeployment(
    request: DeploymentUpdateRequest
  ): Promise<DeploymnetUpdateResponse> {
    const deploymentDao = FactoryService.getDeploymentDao();
    const projectsDao = FactoryService.getProjetsDao();
    const deployment = await deploymentDao.getDeploymentById(request.id);
    DeploymentUtils.checkStatusChange(deployment.status, request.status);
    let deployedIn;
    if (request.status == 'done') {
      const deploymentsByProject = await deploymentDao.getDeploymentsByProjectId(
        deployment.projectId
      );
      if (DeploymentUtils.isFirstDeploy(deploymentsByProject, deployment)) {
        projectsDao.updateProject({ url: CommonUtils.getRandomUrl() }, deployment.projectId);
      }
      deployedIn = DeploymentUtils.getDeployedIn(deployment);
    }
    deploymentDao.updateDeployment(
      {
        status: request.status,
        deployedIn: deployedIn,
      },
      deployment.id
    );
    QueueUtils.sendMessage({
      name: 'Status Update Event',
      payload: {
        message: `The deployment ${request.id} went from ${deployment.status} to ${request.status}`,
      },
      projectId: deployment.projectId,
    });
    return {
      message: 'deployment updated correctly',
    };
  }

  public async deleteDeployment(deploymentId: number): Promise<Deployment> {
    const deploymentDao = FactoryService.getDeploymentDao();
    const deployment = await deploymentDao.getDeploymentById(deploymentId);
    DeploymentUtils.checkStatusChange(deployment.status, 'cancelled');
    const response = await deploymentDao.updateDeployment({ status: 'cancelled' }, deploymentId);
    QueueUtils.sendMessage({
      name: 'Cancellation Event',
      payload: { message: `Deployment ${deploymentId} was cancelled` },
      projectId: response.projectId,
    });
    return response;
  }

  public async getDeploymentById(deploymentId: number): Promise<Deployment> {
    return FactoryService.getDeploymentDao().getDeploymentById(deploymentId);
  }

  public async getDeployments(page?: number): Promise<Deployment[]> {
    return FactoryService.getDeploymentDao().getDeployments(page, CONSTANTS.PAGE_SIZE);
  }

  public async getDeploymentStats(userId: number): Promise<DeploymentStats> {
    const projects = await FactoryService.getProjetsDao().getProjectsByUserId(userId);
    const deployments = await FactoryService.getDeploymentDao().getDeploymentsByProjectIdList(
      projects.map(project => project.id)
    );
    return DeploymentUtils.getDeploymentStats(deployments);
  }
}
