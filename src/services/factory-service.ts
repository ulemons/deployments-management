import { DataAggregationDao } from '../database/dao/DataAggregationDao';
import { DeploymentDao } from '../database/dao/DeploymentsDao';
import { ProjectDao } from '../database/dao/ProjectsDao';
import { DataAggregationService } from './data-aggregation-service';
import { DeploymentsService } from './deployment-service';
import { ProjectsService } from './projects-service';
import { TokenService } from './token-service';

export class FactoryService {
  public static getDeploymentDao(): DeploymentDao {
    return new DeploymentDao();
  }

  public static getProjetsDao(): ProjectDao {
    return new ProjectDao();
  }

  public static getDeploymentsService(): DeploymentsService {
    return new DeploymentsService();
  }

  public static getProjectsService(): ProjectsService {
    return new ProjectsService();
  }

  public static getDataAggregationService(): DataAggregationService {
    return new DataAggregationService();
  }

  public static getDataAggregationDao(): DataAggregationDao {
    return new DataAggregationDao();
  }

  public static getTokenService(): TokenService {
    return new TokenService();
  }
}
