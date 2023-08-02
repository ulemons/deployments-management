import db from '../db';
import { DAO_CONSTANTS } from '../../config';
import { Project, ProjectUpdate } from '../../models/projects-models';
import { GenericError } from '../../errors/CustomErrors';

export class ProjectDao {
  public async getProjects(page?: number, pageSize?: number): Promise<Project[]> {
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      return await db
        .select('name as name', 'id as id', 'url as url', 'app_secret as appSecret')
        .limit(pageSize)
        .offset(offset)
        .from(DAO_CONSTANTS.PROJECTS_TABLE);
    } else {
      return await db
        .select('name as name', 'id as id', 'url as url', 'app_secret as appSecret')
        .from(DAO_CONSTANTS.PROJECTS_TABLE);
    }
  }

  public async getProjectById(id: number): Promise<Project> {
    const project: Project[] = await db
      .select('name as name', 'id as id', 'url as url', 'app_secret as appSecret')
      .where('id', id)
      .from(DAO_CONSTANTS.PROJECTS_TABLE);
    if (project.length === 0) {
      throw new GenericError(`No deployment found with id: ${id}`, 404);
    }
    return project[0];
  }

  public async getProjectsByUserId(id: number): Promise<Project[]> {
    const project: Project[] = await db
      .select('name as name', 'id as id', 'url as url', 'app_secret as appSecret')
      .where('user_id', id)
      .from(DAO_CONSTANTS.PROJECTS_TABLE);
    if (project.length === 0) {
      throw new GenericError(`No user found with id: ${id}`, 404);
    }
    return project;
  }

  public async updateProject(project: ProjectUpdate, id: number) {
    await db('projects')
      .update({
        name: project.name,
        url: project.url,
      })
      .where('id', id);
  }
}
