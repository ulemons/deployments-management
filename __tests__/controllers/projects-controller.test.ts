import { FactoryService } from '../../src/services/factory-service';
import { ProjectsService } from '../../src/services/projects-service';
import sinon from 'sinon';
import request from 'supertest';
import { CommonStub, ProjectsStub } from '../Stubs';
import server from '../../src/servers/projects-server';

let projectService: ProjectsService;

beforeEach(() => {
  projectService = FactoryService.getProjectsService();
  sinon.stub(FactoryService, 'getProjectsService').returns(projectService);
});

afterEach(done => {
  sinon.restore();
  server.close();
  done();
});

describe('Get Projects', () => {
  it('Gets the list of projects', async () => {
    sinon.stub(projectService, 'getProjects').resolves(ProjectsStub.RETRIEVED_PROJECTS_LIST);
    const response = await request(server)
      .get('/projects')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(ProjectsStub.EXPECTED_PROJECTS_LIST);
  });

  it('Gets a bad request when passing a page lower than 0', async () => {
    const response = await request(server)
      .get('/projects?page=-1')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
  });

  it('Gets unauthorized when not passing the authorization header', async () => {
    const response = await request(server).get('/projects');
    expect(response.status).toEqual(401);
  });

  it('Should throw an error when the calling from the service throws an error', async () => {
    sinon.stub(projectService, 'getProjects').throws();
    const response = await request(server)
      .get('/projects')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);
    expect(response.status).toEqual(500);
  });
});

describe('Get project by id', () => {
  it('Gets a project by id', async () => {
    sinon.stub(projectService, 'getProjectById').resolves(ProjectsStub.RETRIEVED_PROJECT_BY_ID);

    const response = await request(server)
      .get('/projects/1')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(ProjectsStub.EXPECTED_PROJECT_BY_ID);
  });

  it('Gets a bad request when passing a wrong path parameter', async () => {
    const response = await request(server)
      .get('/projects/test')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
  });

  it('Gets unauthorized when not passing the authorization header', async () => {
    const response = await request(server).get('/projects');
    expect(response.status).toEqual(401);
  });

  it('Should throw an error when the calling from the service throws an error', async () => {
    sinon.stub(projectService, 'getProjectById').throws();
    const response = await request(server)
      .get('/projects/1')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);
    expect(response.status).toEqual(500);
  });
});

describe('Create a deploymeent for a project', () => {
  it('creates the deployment correctly', async () => {
    sinon
      .stub(projectService, 'createDeploymnet')
      .resolves(ProjectsStub.EXPECTED_DEPLOYMENT_CREATED);
    const response = await request(server)
      .post('/projects/1/deployment')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
  });

  it('Gets a bad request when passing a wrong path parameter', async () => {
    const response = await request(server)
      .post('/projects/test/deployment')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
  });


  it('Should throw an error when the calling from the service throws an error', async () => {
    sinon.stub(projectService, 'createDeploymnet').throws();
    const response = await request(server)
      .post('/projects/1/deployment')
      .set('authorization', CommonStub.VALID_TOKEN.authorization);
    expect(response.status).toEqual(500);
  });
});
