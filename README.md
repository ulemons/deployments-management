# Deployments management

The idea is to implement the backend system for tracking deployments of software projects. You can find the api exposed on the : [Updated swagger](./project-api.yaml)

### Goal

1. Use koa server with the jwt interceptors
2. Use rabbitmq for internal metrics
3. Use Jest and sinon as test suite
4. Use knex for migration of the db 

### open points
- [ ] increase the code coverage at least 85%
- [ ] split the rabbitmq service and the projects service
- [ ] work on runtime validation of the typescript objects
- [ ] database should probably be in a different library in order to isolate the user as much as possible
- [ ] make a generic docker file to run the application
- [ ] add transactional for statuses
- [ ] redesign some apis 




## Installation

To maintain good flexibility, the main supporting components were installed via docker:

```
docker run -d -p 5430:5432 --name deployment_postgres -e POSTGRES_USER=deployment_user -e POSTGRES_PASSWORD=deployment_pass postgres

docker run -d --hostname localhost --name deployment_rabbitmq rabbitmq:3.8
```

for the postgress I used the port 5430 because in my case the standard 5432 was already taken, if you change that remember also to the change that in the application configuration.

Once the db went up it was manually created and permissions were granted to the user who will be using it. For this process run the following commands:

```
docker exec -it deployment_postgres bash

psql -U deployment_user

create database deployment_db;

```


when these steps are completed you need to install the libraries that are required for the application to work. So go to the folder where you can find the package.json and give the command:

```
npm install
```
when this installation is completed ( it can take a few minutes ) the next step is to configure the db tables and populate it through migrations

```
npm run knex migrate:latest
npm run knex seed:run
```

now you can finally use your application by simply typing the command: 
```
npm run start
```

## Implementation Choices

### Servers:
Two koa servers are exposed to handle the traffic, one is used to expose the rest controllers. This will mainly be used for calls coming in from outside.
The second one, on the other hand, which listens on a different port, remains listening on a rabbitmq queue. This choice was made for reasons of efficiency within the application network. In fact, this queue is used to save tracking events related to internal operations to the db. For issues of message count and inefficiency, a queue was decided upon rather than using rest

### Validation:
Since in fact typescript does not provide a type check at runtime in some cases, particularly when the api sends a body as input, we use the "class-validator" library annotations at the controller level to make sure we have a consistent object.
Another special note on validation should be made with reference to the states that a deployment is to assume. Assumptions have been made about state transitions (i.e., a deployment cannot go from status "done" to status "cancelled")

### Authentication
The token api provides a basic JWT. No token expiration and token refresh mechanism has been implemented. By fact this is only meant to be validate as authentic.
### Factory
A "factory pattern" for instantiating services has been implemented, so it is possible to facilitate the use of these components by code and also unit test of those.
### Database
A whole part of dao has been implemented for communication with the database, which in a real situation I would prefer to put in an external library to allow as much abstraction as possible for the user of the functions.

## Performance thoughts
Most apis are mostly very simple, they take info from the db and write something. But in general there are a couple of situations that I think are worth noting: 

1. When you do the get projects to get you may think you have to for each project go through all the deployments to get the info needed to evaluate the hasLiveDeployment and hasOngoingDeployment flags. Actually using a map this can save a lot of db calls and processing time.

2. A map was also used to calculate the statistics, in this case the first thought might have been to sort the dates by "created_at" and then subdivide, but this is computationally expensive. For this reason it was decided to count the number of weeks in which the deployments were made and add up all the necessary info, finally simply a division was made.



