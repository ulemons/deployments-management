import { Deployment, DeploymentStats, DeploymnetUpdateResponse } from "./deployments-models";
import { DataEvent } from "./events-model";
import { Project } from "./projects-models";
import { Token } from "./token-models";

export type SuccessResponsePayload = DataEvent[] | Deployment | Deployment[] | DeploymentStats | DeploymnetUpdateResponse | Project | Project[] | Token;