# Node-React-Postgres-Docker-Template

This project is a full-stack web application template using Node.js, React.js (with Vite), and PostgreSQL, all containerized using Docker. It demonstrates a modern 2024 design approach and efficient application architecture.

## Project Structure

```plaintext
NODE-REACT-POSTGRES-DOCKER-TEMPLATE
│
├── src
│   ├── app-react
│   │   ├── src
│   │   │   └── config.json
│   │   └── Dockerfile
│   ├── database-postgres
│   │   ├── src
│   │   │   └── config.json
│   │   └── Dockerfile
│   └── server-node
│       ├── src
│       │   └── config.json
│       └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

## Services Overview

### 1. app-react: 
- A front-end React application built using Vite.
### 2. server-node: 
- A back-end Node.js server using Express.js, which provides RESTful APIs to interact with the database.
### 3. database-postgres: 
- A PostgreSQL container with an initialization script to create a users table if it does not exist.

## Setup Instructions
#### 1. Clone the Repository

    git clone https://github.com/your-repo/node-react-postgres-docker-template.git
    cd node-react-postgres-docker-template

#### 2. Configure Environment
Edit the config.json files in each service to update any required configuration details, such as database credentials and API settings.

#### 3. Build and Run Containers
Use Docker Compose to build and run the entire stack:

    docker-compose up --build

#### 4. Access the Application
- React Frontend: http://localhost:1111
- Node Backend: http://localhost:3000
- Postgres Database: Accessible on port 5432 (configure as needed)

## API Endpoints (Node.js Server)

| Method | Endpoint                  | Description                                                    |
|--------|----------------------------|----------------------------------------------------------------|
| GET    | `/get_users`              | List all users.                                                |
| GET    | `/get_user_by_id/:id`     | Get a user by their UUID.                                      |
| POST   | `/create_user`            | Create a new user. (Expects `fname`, `lname`, and `age` in the request body) |
| DELETE | `/delete_user_by_id/:id`  | Delete a user by UUID.                                         |
| PUT    | `/update_user_by_id/:id`  | Update user details. (Accepts `fname`, `lname`, `age` in the request body) |


### React Front-End Details
Why Vite?
- Faster Development: Vite leverages ESBuild for lightning-fast compilation and Hot Module Replacement (HMR), making development smooth and efficient.
- Modern Browser Support: Vite serves native ESM to modern browsers, reducing the need for transpilation and speeding up the build process.

## React Concepts Used

| Concept   | Description                                                                                  |
|-----------|----------------------------------------------------------------------------------------------|
| useRef    | Used for referencing DOM elements directly, which avoids unnecessary re-renders compared to `useState`. |
| useState  | Used for managing component state, such as user data and loading status.                     |
| useEffect | Used for handling side effects like data fetching. Minimizing `useEffect` helps maintain optimal performance. |

### Loading Screen
A full-screen loading animation is shown while data is being fetched from the backend, ensuring a smooth user experience.

### Mobile Compliance
The UI is responsive and adjusts to different screen sizes, providing a seamless experience on both desktop and mobile devices.

### Alternative Architectures
Consider using React Query or Redux Toolkit for more advanced state management and data caching. These libraries simplify API handling and can improve performance and maintainability.
