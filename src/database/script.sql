create table users (
    id serial primary key,
    email varchar(100) not null,
    username varchar(100) not null,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

create table projects (
    id serial primary key,
    user_id int not null,
    name varchar(100) not null,
    url varchar(100),
    app_secret varchar(100) not null,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

create type deployment_status as enum (
    'pending',
    'building',
    'deploying',
    'failed',
    'cancelled',
    'done'
);

create table deployments (
    id serial primary key,
    project_id int,
    deployed_in int,
    status deployment_status,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_project FOREIGN KEY(project_id) REFERENCES projects(id)
);

create table data_events (
    id serial primary key,
    project_id int,
    name varchar(100),
    payload JSONB not null,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_project FOREIGN KEY(project_id) REFERENCES projects(id)
);