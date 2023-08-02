import server from '../../src/servers/projects-server';
import { FactoryService } from '../../src/services/factory-service';
import request from 'supertest';
import sinon from 'sinon';
import { CommonStub, DeploymentStub } from '../Stubs';
import { DeploymentsService } from '../../src/services/deployment-service';

let deploymentService: DeploymentsService;

beforeEach(() => {
  deploymentService = FactoryService.getDeploymentsService();
  sinon.stub(FactoryService, 'getDeploymentsService').returns(deploymentService);
});

afterEach(done => {
  sinon.restore();
  server.close();
  done();
});

describe('Get deployment by id', () => {
  it('Gets a deployment by id', async () => {
    sinon
      .stub(deploymentService, 'getDeploymentById')
      .resolves(DeploymentStub.RETRIEVED_DEPLOYMENT_BY_ID);
    const response = await request(server)
      .get('/deployments/1')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(DeploymentStub.EXPECTED_DEPLOYMENT_BY_ID);
  });

  it('Gets a bad request when passing a wrong path parameter', async () => {
    const response = await request(server)
      .get('/deployments/test')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
  });

  it('Gets unauthorized when not passing the authorization header', async () => {
    const response = await request(server).get('/deployments');
    expect(response.status).toEqual(401);
  });

  it('Should throw an error when the calling from the service throws an error', async () => {
    sinon.stub(deploymentService, 'getDeploymentById').throws();
    const response = await request(server)
      .get('/deployments/1')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);
    expect(response.status).toEqual(500);
  });
});

describe('Get deployments', () => {
  it('Gets the list of deployments', async () => {
    sinon
      .stub(deploymentService, 'getDeployments')
      .resolves(DeploymentStub.RETRIEVED_DEPLOYMENTS_LIST);
    const response = await request(server)
      .get('/deployments')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(DeploymentStub.EXPECTED_DEPLOYMENTS_LIST);
  });

  it('Gets a bad request when passing a page lower than 0', async () => {
    const response = await request(server)
      .get('/deployments?page=-1')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
  });

  it('Gets unauthorized when not passing the authorization header', async () => {
    const response = await request(server).get('/deployments');
    expect(response.status).toEqual(401);
  });

  it('Should throw an error when the calling from the service throws an error', async () => {
    sinon.stub(deploymentService, 'getDeployments').throws();
    const response = await request(server)
      .get('/deployments')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);
    expect(response.status).toEqual(500);
  });
});

describe('Cancel deployments', () => {
  it('Sets a deployment in status cancelled', async () => {
    sinon.stub(deploymentService, 'deleteDeployment');
    const response = await request(server)
      .post('/deployments/1/cancel')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);

    expect(response.status).toEqual(204);
  });

  it('Gets a bad request when passing a wrong parameter', async () => {
    const response = await request(server)
      .post('/deployments/test/cancel')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
  });

  it('Gets unauthorized when not passing the authorization header', async () => {
    const response = await request(server).post('/deployments/1/cancel');
    expect(response.status).toEqual(401);
  });

  it('Should throw an error when the calling from the service throws an error', async () => {
    sinon.stub(deploymentService, 'deleteDeployment').throws();
    const response = await request(server)
      .post('/deployments/1/cancel')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);
    expect(response.status).toEqual(500);
  });
});

describe('Update a deployment', () => {
  it('Sets a deployment in status cancelled', async () => {
    sinon.stub(deploymentService, 'updateDeployment');
    const response = await request(server)
      .post('/deployment/webhook')
      .send({ id: 4, status: 'done' })
      .set('authorization', CommonStub.VALID_TOKEN.authorization)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(204);
  });

  it('Gets a bad request when passing no body', async () => {
    const response = await request(server)
      .post('/deployment/webhook')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
  });

  it('Gets a bad request when passing wrong status', async () => {
    const response = await request(server)
      .post('/deployment/webhook')
      .send({ id: 4, status: 'dooone' })
      .set('authorization', CommonStub.VALID_TOKEN.authorization)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
  });

  it('Gets unauthorized when not passing the authorization header', async () => {
    const response = await request(server).post('/deployment/webhook')
    .send({ id: 4, status: 'dooone' })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
    expect(response.status).toEqual(401);
  });

  it('Should throw an error when the calling from the service throws an error', async () => {
    sinon.stub(deploymentService, 'updateDeployment').throws();
    const response = await request(server)
      .post('/deployment/webhook')
      .send({ id: 4, status: 'done' })
      .set('authorization', CommonStub.VALID_TOKEN.authorization)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(500);
  });
});
