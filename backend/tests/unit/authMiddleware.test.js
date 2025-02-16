const request = require('supertest');
const app = require('../../index');
const jwt = require('jsonwebtoken');

describe('Event Routes', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'John', email: 'john@example.com', password: 'password123' });

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'john@example.com', password: 'password123' });

    token = loginRes.body.token;
  });

  it('should create a new event', async () => {
    const res = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Event', description: 'Test Description', start_time: '2025-02-20T10:00:00Z', end_time: '2025-02-20T12:00:00Z' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', 'Test Event');
  });

  it('should return events for authenticated user', async () => {
    const res = await request(app)
      .get('/api/events')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return error if no title is provided during event creation', async () => {
    const res = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'Test Description', start_time: '2025-02-20T10:00:00Z', end_time: '2025-02-20T12:00:00Z' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Tytuł, czas rozpoczęcia i zakończenia są wymagane');
  });
});