const http = require('http');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const { handleRequest } = require('../src/routes/user.routes');

dotenv.config();

const API_HOST = 'localhost';
const API_PORT = process.env.PORT || 4000;
let server;

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

beforeAll(() => {
  return new Promise((resolve) => {
    server = http.createServer(handleRequest);
    server.listen(API_PORT, () => {
      console.log(`Test server running on port ${API_PORT}`);
      resolve();
    });
  });
});

afterAll(() => {
  return new Promise((resolve) => {
    server.close(() => {
      console.log('Test server closed');
      resolve();
    });
  });
});

describe('User API - Basic CRUD Flow', () => {
  let testUserId;

  test('GET /api/users should return an empty array initially', async () => {
    const response = await makeRequest('GET', '/api/users');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

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

    testUserId = response.body.id;
    console.log('Created test user with ID:', testUserId);
  });

  test('GET /api/users/{id} should return the created user', async () => {
    console.log('Getting user with ID:', testUserId);
    const response = await makeRequest('GET', `/api/users/${testUserId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', testUserId);
    expect(response.body).toHaveProperty('username', 'John Doe');
    expect(response.body).toHaveProperty('age', 30);
    expect(response.body.hobbies).toEqual(['reading', 'coding', 'hiking']);
  });

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

  test('DELETE /api/users/{id} should delete the user', async () => {
    const response = await makeRequest('DELETE', `/api/users/${testUserId}`);

    expect(response.statusCode).toBe(204);
  });

  test('GET /api/users/{id} should return 404 for deleted user', async () => {
    const response = await makeRequest('GET', `/api/users/${testUserId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});

describe('User API - Error Handling', () => {
  test('GET /api/users/{invalid-id} should return 400 for invalid UUID', async () => {
    const response = await makeRequest('GET', '/api/users/invalid-uuid');

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('POST /api/users with missing fields should return 400', async () => {
    const incompleteUserData = {
      username: 'Incomplete User',
    };

    const response = await makeRequest('POST', '/api/users', incompleteUserData);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

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

describe('User API - Non-existent Resources', () => {
  test('PUT /api/users/{non-existent-id} should return 404', async () => {
    const nonExistentId = uuidv4();
    const updatedData = {
      username: 'Ghost User',
      age: 99,
      hobbies: ['invisibility'],
    };

    const response = await makeRequest('PUT', `/api/users/${nonExistentId}`, updatedData);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  test('DELETE /api/users/{non-existent-id} should return 404', async () => {
    const nonExistentId = uuidv4();

    const response = await makeRequest('DELETE', `/api/users/${nonExistentId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  test('GET /api/non-existent should return 404', async () => {
    const response = await makeRequest('GET', '/api/non-existent');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
