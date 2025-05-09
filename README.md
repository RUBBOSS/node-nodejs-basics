# Node.js CRUD API

A simple CRUD API implementation using Node.js with an in-memory database. This project demonstrates RESTful API development, error handling, environment configuration, and horizontal scaling.

## Features

- RESTful API endpoints for user management
- In-memory data storage with UUID generation
- Proper error handling with appropriate status codes
- Multiple running modes (development, production, cluster)
- Horizontal scaling using Node.js Cluster API
- Data synchronization between worker processes

## Requirements

- Node.js v22.14.0 or higher (current: v22.15.0)
- NPM v9 or higher

## Project Structure

```
/
├── src/
│   ├── controllers/          # Request handlers logic
│   │   └── user.controller.js
│   ├── models/               # Data models
│   │   └── user.model.js
│   ├── routes/               # API routes definition
│   │   └── user.routes.js
│   └── cluster.js            # Horizontal scaling implementation
├── test/
│   └── user.api.test.js      # API tests
├── .env                      # Environment variables
├── index.js                  # Application entry point
├── package.json              # Project dependencies and scripts
└── webpack.config.js         # Production build configuration
```

## User Model

Each user has the following properties:

- `id`: Unique identifier (UUID), generated on server side
- `username`: User's name (string, required)
- `age`: User's age (number, required)
- `hobbies`: User's hobbies (array of strings or empty array, required)

## API Endpoints

### GET `/api/users`

- Gets all users
- Response: 200 OK with array of all user records

### GET `/api/users/{userId}`

- Gets a specific user by ID
- Response:
  - 200 OK with user record (if exists)
  - 400 Bad Request (if ID not a valid UUID)
  - 404 Not Found (if user doesn't exist)

### POST `/api/users`

- Creates a new user
- Request body: `{ "username": "string", "age": number, "hobbies": ["string"] }`
- Response:
  - 201 Created with newly created user
  - 400 Bad Request (if required fields missing)

### PUT `/api/users/{userId}`

- Updates an existing user
- Request body: `{ "username": "string", "age": number, "hobbies": ["string"] }`
- Response:
  - 200 OK with updated user
  - 400 Bad Request (if ID not a valid UUID)
  - 404 Not Found (if user doesn't exist)

### DELETE `/api/users/{userId}`

- Deletes a user
- Response:
  - 204 No Content (on successful deletion)
  - 400 Bad Request (if ID not a valid UUID)
  - 404 Not Found (if user doesn't exist)

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/node-nodejs-basics.git

# Navigate to the project directory
cd node-nodejs-basics

# Install dependencies
npm install
```

## Running the Application

There are three modes to run the application:

### 1. Development Mode

Uses nodemon for auto-restarting during development:

```bash
npm run start:dev
```

### 2. Production Mode

Builds the application with webpack and runs the optimized bundle:

```bash
npm run start:prod
```

### 3. Cluster Mode (Horizontal Scaling)

Starts multiple instances with a load balancer:

```bash
npm run start:multi
```

In cluster mode:

- The main process acts as a load balancer on port 4000
- Worker processes run on ports 4001, 4002, etc. (number depends on CPU cores)
- Requests are distributed using round-robin algorithm
- Data is synchronized between all workers

## Running Tests

The application includes tests covering all API endpoints and error scenarios:

```bash
npm test
```

## API Usage Examples (curl)

You can test the API using the following curl commands:

### Get All Users

```bash
curl -X GET http://localhost:4000/api/users
```

### Create a User

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "username": "John Doe",
  "age": 30,
  "hobbies": ["reading", "coding", "hiking"]
}' http://localhost:4000/api/users
```

### Get a User by ID

```bash
# Replace USER_ID with an actual user ID
curl -X GET http://localhost:4000/api/users/USER_ID
```

### Update a User

```bash
# Replace USER_ID with an actual user ID
curl -X PUT -H "Content-Type: application/json" -d '{
  "username": "Jane Doe",
  "age": 28,
  "hobbies": ["swimming", "traveling"]
}' http://localhost:4000/api/users/USER_ID
```

### Delete a User

```bash
# Replace USER_ID with an actual user ID
curl -X DELETE http://localhost:4000/api/users/USER_ID
```

### Error Examples

```bash
# Invalid UUID
curl -X GET http://localhost:4000/api/users/invalid-uuid

# Missing required fields
curl -X POST -H "Content-Type: application/json" -d '{
  "username": "Incomplete User"
}' http://localhost:4000/api/users

# Non-existent endpoint
curl -X GET http://localhost:4000/api/non-existent
```

## Environment Variables

Configure the application using the `.env` file:

```
PORT=4000  # Default port for the application
```

## Horizontal Scaling Details

When running in cluster mode (`npm run start:multi`):

1. Primary process runs a load balancer on PORT (4000)
2. Worker processes run on PORT+1, PORT+2, etc. (4001, 4002, etc.)
3. Requests to PORT are distributed across worker processes
4. When data changes in any worker, all workers are synchronized
5. If a worker crashes, it's automatically restarted with the current data

## Error Handling

The API implements proper error handling:

- 400 Bad Request: For invalid input (invalid UUID, missing required fields)
- 404 Not Found: When requested resources don't exist
- 500 Internal Server Error: For server-side errors

All error responses include a human-friendly message.

## Development Scripts

- `npm run start:dev`: Start in development mode with auto-restart
- `npm run start:prod`: Build and start in production mode
- `npm run start:multi`: Start in cluster mode with load balancing
- `npm run build`: Build the application for production
- `npm test`: Run the test suite
- `npm run lint`: Run ESLint to check code quality
- `npm run lint:fix`: Fix ESLint issues automatically

## Dependencies

Production:

- `cross-env`: For setting environment variables cross-platform
- `dotenv`: For environment variable configuration
- `uuid`: For generating unique IDs

Development:

- `nodemon`: For auto-restarting in development
- `webpack`: For bundling in production
- `jest`: For testing
- And more for linting, formatting, and building

## License

ISC
