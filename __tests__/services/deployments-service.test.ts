import server from '../../src/servers/projects-server';
import { FactoryService } from '../../src/services/factory-service';
import request from 'supertest';
import sinon from 'sinon';
import { CommonStub, DeploymentStub } from '../Stubs';
import { DeploymentsService } from '../../src/services/deployment-service';
import { DeploymentDao } from '../../src/database/dao/DeploymentsDao';

let deploymentDao: DeploymentDao;
let deploymentService: DeploymentsService;

beforeEach(() => {
  deploymentDao = FactoryService.getDeploymentDao();
  deploymentService = new DeploymentsService();
  sinon.stub(FactoryService, 'getDeploymentDao').returns(deploymentDao);
});

afterEach(done => {
  sinon.restore();
  server.close();
  done();
});


describe('get deployment by id', () => {
  it('get successfully deployment by id', async () => {
    sinon.stub(deploymentDao, 'getDeploymentById').resolves(DeploymentStub.CANCELLED_DEPLOY);
    const response = await deploymentService.getDeploymentById(1);
    expect(response.id).toEqual(1);
  });
});

describe('get deployments', () => {
  it('get successfully deployment by id', async () => {
    sinon.stub(deploymentDao, 'getDeployments').resolves(DeploymentStub.RETRIEVED_DEPLOYMENTS_LIST);
    const response = await deploymentService.getDeployments(1);
    expect(response.length).toEqual(3);
  });
});
