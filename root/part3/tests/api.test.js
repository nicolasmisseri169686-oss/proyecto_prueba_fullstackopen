const supertest = require('supertest');
const app = require('../index');

const api = supertest(app);

describe('Phonebook API', () => {
  test('GET /api/persons returns 4 persons', async () => {
    const response = await api.get('/api/persons');
    expect(response.body).toHaveLength(4);
    expect(response.status).toBe(200);
  });

  test('GET /api/persons/1 returns Arto Hellas', async () => {
    const response = await api.get('/api/persons/1');
    expect(response.body.name).toBe('Arto Hellas');
  });

  test('POST /api/persons creates a new person', async () => {
    const newPerson = {
      name: "Test User",
      number: "123-456789"
    };

    const response = await api
      .post('/api/persons')
      .send(newPerson)
      .expect(200);

    expect(response.body.name).toBe('Test User');
    expect(response.body.number).toBe('123-456789');
  });
});