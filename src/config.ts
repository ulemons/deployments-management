

export const CONSTANTS = {
  PAGE_SIZE: 8,
  PROJECT_SERVER_PORT: process.env.PROJECT_SERVER_PORT || '3000',
  DATA_AGGREGATION_PORT: process.env.DATA_AGGREGATION_PORT || '3001',
  ON_GOING_DEPLOYMENT_STATUSES: ['pending', 'building', 'deploying'],
  DONE_DEPLOYMENT_STATUSES: ['done'],
  JWT_SECRET: 'server-secret',
  DATA_EVENT_QUEUE: 'data-event-queue',
};

export const DAO_CONSTANTS = {
  DEPLOYMENT_TABLE: 'deployments',
  PROJECTS_TABLE: 'projects',
  DATA_AGGREGATION_TABLE: 'data_events',
};
