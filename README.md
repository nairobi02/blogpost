# Dockerized Blog App

This is a containerized blog application with configurations for different environments.
The application uses nginx as a reverse proxy to act as a load balancer and route requests to the appropriate services.

## Configuration Files

The application's behavior is controlled by a set of configuration files for different environments. Here's an overview of these files:

### `docker-compose.yml`

This is the base Docker Compose configuration file used for all environments. It defines the following services:

#### Nginx

- **Image**: `nginx:stable-alpine`
- **Purpose**: Nginx serves as the web server and reverse proxy, routing incoming requests to the appropriate services.
- **Configuration**: Nginx's configuration is specified in `nginx/default.conf`, which defines how requests are proxied to the blog server.
- **Dependencies**: It depends on the `blog-server` service.

#### Blog Server

- **Build**: The `blog-server` service is built using the local codebase and the Dockerfile.
- **Environment Variables**: Environment variables are loaded from the `.env` file, which can include settings like `NODE_ENV`.
- **Dependencies**: It depends on the `mongodb` service.

#### MongoDB

- **Image**: `mongo:latest`
- **Purpose**: MongoDB is used as the database for the application.
- **Ports**: Port 27017 on the host is mapped to port 27017 in the MongoDB container.
- **Volumes**: Data is stored in a named volume (`mongo-db-data`) for data persistence.
- **Environment Variables**: The `.env` file is used to set necessary variables for MongoDB authentication.

#### Redis

- **Image**: `redis:latest`
- **Purpose**: Redis serves as a caching layer.
- **Ports**: Port 6379 on the host is mapped to port 6379 in the Redis container.

### `docker-compose.dev.yml`

This configuration file is specific to the development environment and can override settings from the base `docker-compose.yml`. It includes the following:

#### Nginx

- **Ports**: Port 3000 on the host is mapped to port 80 in the Nginx container.

#### Blog Server

- **Build**: The `NODE_ENV` is set to `development` during the build process.
- **Volumes**: Local code is mounted into the container for live code reloading.
- **Environment Variables**: The `NODE_ENV` is set to `development`.
- **Command**: Overrides the default command with `npm run dev` for development purposes.

### `docker-compose.prod.yml`

This configuration file is intended for the production environment and contains the following settings:

#### Nginx

- **Ports**: Port 80 on the host is mapped to port 80 in the Nginx container.

#### Blog Server

- **Build**: The `NODE_ENV` is set to `production` during the build.
- **Environment Variables**: The `NODE_ENV` is set to `production`.
- **Command**: Overrides the default command with `node src/index.js`.

## Usage

To start the application, use Docker Compose with the desired configuration file. For example, to start the development environment, run:

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

Replace `-f docker-compose.dev.yml` with `-f docker-compose.prod.yml` for the production environment.
