# E-commerce Microservices Project

This project is a microservices architecture for e-commerce, consisting of various services such as payment, notification, order, and others. Each service has its own folder with source code

## Microservices Overview

- **Payment Service**: Handles all payment-related operations.
- **Notification Service**: Manages notifications to users.
- **Order Service**: Processes and manages customer orders.
- **Product Service**: Manages product catalog and inventory.
- **Cart Service**: Manages shopping cart operations.
- **Auth Service**: Handles user authentication and authorization.
- **API Gateway**: Acts as a single entry point for all services.

## Deployment Instructions

The project uses Docker Compose for managing services and their dependencies. To deploy the services, follow these steps:

1. Ensure Docker and Docker Compose are installed on your machine.
2. Navigate to the project root directory.
3. Run the following command to start all services:
   ```bash
   docker-compose up
   ```
4. Access the services via the API Gateway at `http://localhost:PORT`.

## Additional Information

- **Databases**: Each service has its own PostgreSQL database.
- **Message Broker**: RabbitMQ is used for inter-service communication.
