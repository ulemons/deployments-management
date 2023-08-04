import { DAO_CONSTANTS } from '../../config';
import { GenericError } from '@errors/DeploymentErrors';
import { Deployment, DeploymentDB, DeploymentUpdate } from '@models/deployments-models';
import db from '../db';

export class DeploymentDao {
  public async getDeploymentStats(
    userId: number,
    page: number | undefined,
    pageSize: number
  ): Promise<any> {
    if (page !== undefined && pageSize !== undefined) {
      const offset = (page - 1) * pageSize;
      return await db
        .select(
          'id as id',
          'deployed_in as deployedIn',
          'status as status',
          'created_at as createdAt'
        )
        .limit(pageSize)
        .offset(offset)
        .from(DAO_CONSTANTS.DEPLOYMENT_TABLE);
    } else {
      return await db
        .select(
          'id as id',
          'deployed_in as deployedIn',
          'status as status',
          'created_at as createdAt'
        )
        .from(DAO_CONSTANTS.DEPLOYMENT_TABLE);
    }
  }
  public async getDeployments(page?: number, pageSize?: number): Promise<Deployment[]> {
    if (page !== undefined && pageSize !== undefined) {
      const offset = (page - 1) * pageSize;
      return await db
        .select(
          'id as id',
          'deployed_in as deployedIn',
          'status as status',
          'created_at as createdAt'
        )
        .limit(pageSize)
        .offset(offset)
        .from(DAO_CONSTANTS.DEPLOYMENT_TABLE);
    } else {
      return await db
        .select(
          'id as id',
          'deployed_in as deployedIn',
          'status as status',
          'created_at as createdAt'
        )
        .from(DAO_CONSTANTS.DEPLOYMENT_TABLE);
    }
  }

  public async getDeploymentById(id: number): Promise<Deployment> {
    const deployment: Deployment[] = await db
      .select(
        'deployed_in as deployedIn',
        'status as status',
        'id as id',
        'created_at as createdAt',
        'project_id as projectId'
      )
      .where('id', id)
      .from(DAO_CONSTANTS.DEPLOYMENT_TABLE);
    if (deployment.length === 0) {
      throw new GenericError(`No deployment found with id: ${id}`, 404);
    }
    return deployment[0];
  }

  public async getDeploymentsByProjectId(id: number): Promise<Deployment[]> {
    const deployments: Deployment[] = await db
      .select(
        'deployed_in as deployedIn',
        'status as status',
        'id as id',
        'created_at as createdAt',
        'project_id as projectId'
      )
      .where('project_id', id)
      .from(DAO_CONSTANTS.DEPLOYMENT_TABLE);
    // if (deployments.length === 0) {
    //   throw new GenericError(`No deployment found with id: ${id}`, 404);
    // }
    return deployments;
  }

  public async getDeploymentsByProjectIdList(ids: number[]): Promise<Deployment[]> {
    const deployments: Deployment[] = await db
      .select(
        'deployed_in as deployedIn',
        'status as status',
        'id as id',
        'created_at as createdAt',
        'project_id as projectId'
      )
      .whereIn('project_id', ids)
      .from(DAO_CONSTANTS.DEPLOYMENT_TABLE);
    // if (deployments.length === 0) {
    //   throw new GenericError(`No deployment found with id list: ${ids}`, 404);
    // }
    return deployments;
  }

  public async updateDeployment(deployment: DeploymentUpdate, id: number): Promise<Deployment> {
    const response = await db<DeploymentDB>(DAO_CONSTANTS.DEPLOYMENT_TABLE)
      .update({
        status: deployment.status,
        deployed_in: deployment.deployedIn,
      })
      .where('id', id)
      .returning('*');
    if (response.length === 0) {
      throw new GenericError(`No deployment found with id: ${id}`, 404);
    }
    return {
      createdAt: response[0].created_at,
      deployedIn: response[0].deployed_in,
      id: response[0].id,
      projectId: response[0].project_id,
      status: response[0].status,
    };
  }

  public async insertDeployment(id: number): Promise<Deployment> {
    const deploymentCreated = await db<DeploymentDB>(DAO_CONSTANTS.DEPLOYMENT_TABLE)
      .insert({
        status: 'pending',
        project_id: id,
      })
      .returning('*');
    return {
      createdAt: deploymentCreated[0].created_at,
      deployedIn: deploymentCreated[0].deployed_in,
      id: deploymentCreated[0].id,
      projectId: deploymentCreated[0].project_id,
      status: deploymentCreated[0].status,
    };
  }
}
