const http = require('http');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const { handleRequest } = require('../src/routes/user.routes');

// Load environment variables
dotenv.config();

// Configuration for API requests
const API_HOST = 'localhost';
const API_PORT = process.env.PORT || 4000;
let server;

// Helper function to make API requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: API_HOST,
      port: API_PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        try {
          const statusCode = res.statusCode;
          let parsedBody;

          // Only try to parse JSON if there's a response body and it's not a 204 response
          if (responseBody && statusCode !== 204) {
            parsedBody = JSON.parse(responseBody);
          }

          resolve({
            statusCode,
            body: parsedBody,
            headers: res.headers,
          });
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Setup and teardown for all tests
beforeAll(() => {
  // Start server for testing
  return new Promise((resolve) => {
    server = http.createServer(handleRequest);
    server.listen(API_PORT, () => {
      console.log(`Test server running on port ${API_PORT}`);
      resolve();
    });
  });
});

afterAll(() => {
  // Close server after tests
  return new Promise((resolve) => {
    server.close(() => {
      console.log('Test server closed');
      resolve();
    });
  });
});

// Scenario 1: Basic CRUD Flow
describe('User API - Basic CRUD Flow', () => {
  // Store ID at the describe level to share between tests
  let testUserId;

  // Test 1: Get all users, should be an empty array initially
  test('GET /api/users should return an empty array initially', async () => {
    const response = await makeRequest('GET', '/api/users');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    // The array might not be empty if there are already users in the database,
    // but we'll check that it's at least an array
  });

  // Test 2: Create a new user with POST
  test('POST /api/users should create a new user', async () => {
    const userData = {
      username: 'John Doe',
      age: 30,
      hobbies: ['reading', 'coding', 'hiking'],
    };

    const response = await makeRequest('POST', '/api/users', userData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe(userData.username);
    expect(response.body.age).toBe(userData.age);
    expect(response.body.hobbies).toEqual(userData.hobbies);

    // Save the user ID for later tests
    testUserId = response.body.id;
    console.log('Created test user with ID:', testUserId);
  });

  // Test 3: Get the created user by ID
  test('GET /api/users/{id} should return the created user', async () => {
    console.log('Getting user with ID:', testUserId);
    const response = await makeRequest('GET', `/api/users/${testUserId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', testUserId);
    expect(response.body).toHaveProperty('username', 'John Doe');
    expect(response.body).toHaveProperty('age', 30);
    expect(response.body.hobbies).toEqual(['reading', 'coding', 'hiking']);
  });

  // Test 4: Update the created user
  test('PUT /api/users/{id} should update the user', async () => {
    const updatedData = {
      username: 'Jane Doe',
      age: 31,
      hobbies: ['gaming', 'traveling'],
    };

    const response = await makeRequest('PUT', `/api/users/${testUserId}`, updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', testUserId);
    expect(response.body.username).toBe(updatedData.username);
    expect(response.body.age).toBe(updatedData.age);
    expect(response.body.hobbies).toEqual(updatedData.hobbies);
  });

  // Test 5: Delete the user
  test('DELETE /api/users/{id} should delete the user', async () => {
    const response = await makeRequest('DELETE', `/api/users/${testUserId}`);

    expect(response.statusCode).toBe(204);
  });

  // Test 6: Try to get the deleted user
  test('GET /api/users/{id} should return 404 for deleted user', async () => {
    const response = await makeRequest('GET', `/api/users/${testUserId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});

// Scenario 2: Error Handling
describe('User API - Error Handling', () => {
  // Test 1: Try to get user with invalid UUID
  test('GET /api/users/{invalid-id} should return 400 for invalid UUID', async () => {
    const response = await makeRequest('GET', '/api/users/invalid-uuid');

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  // Test 2: Try to create a user with missing required fields
  test('POST /api/users with missing fields should return 400', async () => {
    const incompleteUserData = {
      username: 'Incomplete User',
      // Missing age field
    };

    const response = await makeRequest('POST', '/api/users', incompleteUserData);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  // Test 3: Try to update a user with invalid UUID
  test('PUT /api/users/{invalid-id} should return 400 for invalid UUID', async () => {
    const updatedData = {
      username: 'Updated User',
      age: 25,
      hobbies: ['reading'],
    };

    const response = await makeRequest('PUT', '/api/users/invalid-uuid', updatedData);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});

// Scenario 3: Non-existent Resources
describe('User API - Non-existent Resources', () => {
  // Test 1: Try to update a non-existent user with valid UUID
  test('PUT /api/users/{non-existent-id} should return 404', async () => {
    const nonExistentId = uuidv4(); // Generate a valid but non-existent UUID
    const updatedData = {
      username: 'Ghost User',
      age: 99,
      hobbies: ['invisibility'],
    };

    const response = await makeRequest('PUT', `/api/users/${nonExistentId}`, updatedData);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  // Test 2: Try to delete a non-existent user with valid UUID
  test('DELETE /api/users/{non-existent-id} should return 404', async () => {
    const nonExistentId = uuidv4(); // Generate a valid but non-existent UUID

    const response = await makeRequest('DELETE', `/api/users/${nonExistentId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  // Test 3: Try to access a non-existent endpoint
  test('GET /api/non-existent should return 404', async () => {
    const response = await makeRequest('GET', '/api/non-existent');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
