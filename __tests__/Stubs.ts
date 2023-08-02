import { Deployment } from '../src/models/deployments-models';
import { Project } from '../src/models/projects-models';

export namespace CommonStub {
  export const VALID_TOKEN = {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTA1NDEyNjB9.DOu393yTrQ_WFRiiro6cw62G59bU4PYeJ2p16_DC_jI',
  };
}

export namespace DeploymentStub {
  export const RETRIEVED_DEPLOYMENTS_LIST: Deployment[] = [
    {
      id: 1,
      deployedIn: 3,
      status: 'pending',
      createdAt: new Date('2023-07-18 17:09:38'),
      projectId: 1,
    },
    {
      id: 2,
      deployedIn: 3,
      status: 'pending',
      createdAt: new Date('2023-07-18 17:09:38'),
      projectId: 1,
    },
    {
      id: 3,
      deployedIn: 3,
      status: 'pending',
      createdAt: new Date('2023-07-18 17:09:38'),
      projectId: 1,
    },
  ];

  export const EXPECTED_DEPLOYMENTS_LIST = [
    {
      id: 1,
      deployedIn: 3,
      status: 'pending',
      createdAt: '2023-07-18T15:09:38.000Z',
      projectId: 1,
    },
    {
      id: 2,
      deployedIn: 3,
      status: 'pending',
      createdAt: '2023-07-18T15:09:38.000Z',
      projectId: 1,
    },
    {
      id: 3,
      deployedIn: 3,
      status: 'pending',
      createdAt: '2023-07-18T15:09:38.000Z',
      projectId: 1,
    },
  ];

  export const RETRIEVED_DEPLOYMENT_BY_ID: Deployment = {
    id: 1,
    deployedIn: 3,
    status: 'pending',
    createdAt: new Date('2023-07-18 17:09:38'),
    projectId: 1,
  };

  export const EXPECTED_DEPLOYMENT_BY_ID = {
    id: 1,
    deployedIn: 3,
    status: 'pending',
    createdAt: '2023-07-18T15:09:38.000Z',
    projectId: 1,
  };

  export const CANCELLED_DEPLOY: Deployment = {
    id: 1,
    deployedIn: 3,
    status: 'cancelled',
    createdAt: new Date('2023-07-18 17:09:38'),
    projectId: 1,
  };
}

export namespace ProjectsStub {
  export const RETRIEVED_PROJECTS_LIST = [
    {
      id: 1,
      userId: 1,
      hasOngoingDeployment: true,
      hasLiveDeployment: true,
      createdAt: new Date('2023-07-18 17:09:38'),
    },
    {
      id: 2,
      userId: 1,
      hasOngoingDeployment: true,
      hasLiveDeployment: true,
      createdAt: new Date('2023-07-18 17:09:38'),
    },
    {
      id: 3,
      userId: 1,
      hasOngoingDeployment: true,
      hasLiveDeployment: true,
      createdAt: new Date('2023-07-18 17:09:38'),
    },
  ];

  export const EXPECTED_PROJECTS_LIST = [
    {
      id: 1,
      userId: 1,
      hasOngoingDeployment: true,
      hasLiveDeployment: true,
      createdAt: '2023-07-18T15:09:38.000Z',
    },
    {
      id: 2,
      userId: 1,
      hasOngoingDeployment: true,
      hasLiveDeployment: true,
      createdAt: '2023-07-18T15:09:38.000Z',
    },
    {
      id: 3,
      userId: 1,
      hasOngoingDeployment: true,
      hasLiveDeployment: true,
      createdAt: '2023-07-18T15:09:38.000Z',
    },
  ];

  export const RETRIEVED_PROJECT_BY_ID = {
    id: 1,
    userId: 1,
    hasOngoingDeployment: true,
    hasLiveDeployment: true,
    createdAt: new Date('2023-07-18 17:09:38'),
  };

  export const EXPECTED_PROJECT_BY_ID = {
    id: 1,
    userId: 1,
    hasOngoingDeployment: true,
    hasLiveDeployment: true,
    createdAt: '2023-07-18T15:09:38.000Z',
  };

  export const EXPECTED_DEPLOYMENT_CREATED: Deployment = {
    id: 1,
    deployedIn: 1,
    status: 'pending',
    createdAt: new Date('2023-07-18T15:09:38.000Z'),
    projectId: 1,
  };
}
