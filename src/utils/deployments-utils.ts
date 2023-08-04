import { CONSTANTS } from '../config';
import { DeploymentStatusError, GenericError } from '@errors/DeploymentErrors';
import { Deployment, DeploymentStats, DeploymentStatus } from '@models/deployments-models';
import { Project } from '@models/projects-models';

export class DeploymentUtils {
  public static getDeploymentStats(deployments: Deployment[]): DeploymentStats {
    const currentDate = new Date();
    const currentYear = new Date(currentDate.getFullYear(), 0, 1);
    const weekOfDeploys = new Set<number>();
    let totalDeploymentCounter = 0;
    let totalSuccessfulDeploymentCounter = 0;
    for (let deployment of deployments) {
      const date = deployment.createdAt.getTime() - currentYear.getTime();
      const days = Math.floor(date / (24 * 60 * 60 * 1000));
      const week = Math.ceil((currentDate.getDay() + 1 + days) / 7);
      weekOfDeploys.add(week);
      totalDeploymentCounter += 1;
      totalSuccessfulDeploymentCounter += deployment.status === 'done' ? 1 : 0;
    }

    return {
      avgWeeklyCounter: totalDeploymentCounter / weekOfDeploys.size,
      avgWeeklySuccess: totalSuccessfulDeploymentCounter / weekOfDeploys.size,
    };
  }

  public static getDeployedIn(deployment: Deployment): number {
    return Math.floor((new Date().getTime() - new Date(deployment.createdAt).getTime()) / 1000);
  }

  static isFirstDeploy(deployments: Deployment[], selectedDeployment: Deployment): boolean {
    for (const deployment of deployments) {
      if (deployment.id != selectedDeployment.id) {
        if (deployment.status === 'done') {
          return false;
        }
      }
    }
    return true;
  }

  public static checkOnGoingDeployment(
    project: Project,
    deploymentMap: Map<number, Deployment[]>
  ): boolean {
    if (deploymentMap.has(project.id)) {
      for (let deployment of deploymentMap.get(project.id)!) {
        if (CONSTANTS.ON_GOING_DEPLOYMENT_STATUSES.includes(deployment.status!)) {
          return true;
        }
      }
    }
    return false;
  }

  public static checkLiveDeployment(
    project: Project,
    deploymentMap: Map<number, Deployment[]>
  ): boolean {
    if (deploymentMap.has(project.id)) {
      for (let deployment of deploymentMap.get(project.id)!) {
        if (CONSTANTS.DONE_DEPLOYMENT_STATUSES.includes(deployment.status!)) {
          return true;
        }
      }
    }
    return false;
  }

  public static mapProjectsDeployments(deployments: Deployment[]): Map<number, Deployment[]> {
    return deployments.reduce((map, deployment) => {
      const projectId = deployment.projectId;
      if (map.has(projectId)) {
        map.get(projectId)!.push(deployment);
      } else {
        map.set(projectId, [deployment]);
      }
      return map;
    }, new Map<number, Deployment[]>());
  }

  public static checkStatusChange(from: DeploymentStatus, to: DeploymentStatus): void {
    if (from === 'done') {
      throw new GenericError(`the deployment is already in status done`, 409);
    }
    if (from === "cancelled" || from === "failed") {
      throw new DeploymentStatusError(from, 'done');
    }
  }
}
