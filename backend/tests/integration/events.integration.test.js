const request = require('supertest');
const app = require('../../index');
const jwt = require('jsonwebtoken');

describe('Event Routes - Integration', () => {
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

  it('should create and get events for user', async () => {
    const createRes = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Event', description: 'Test Description', start_time: '2025-02-20T10:00:00Z', end_time: '2025-02-20T12:00:00Z' });

    expect(createRes.status).toBe(200);
    expect(createRes.body.title).toBe('Test Event');

    const getRes = await request(app)
      .get('/api/events')
      .set('Authorization', `Bearer ${token}`);

    expect(getRes.status).toBe(200);
    expect(Array.isArray(getRes.body)).toBe(true);
  });

  it('should return error if no title is provided during event creation', async () => {
    const res = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'Test Description', start_time: '2025-02-20T10:00:00Z', end_time: '2025-02-20T12:00:00Z' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Tytuł, czas rozpoczęcia i zakończenia są wymagane');
  });

  it('should return error if no start time is provided during event creation', async () => {
    const res = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Event', description: 'Test Description', end_time: '2025-02-20T12:00:00Z' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Tytuł, czas rozpoczęcia i zakończenia są wymagane');
  });

  it('should allow user to update an event', async () => {
    const createRes = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Event', description: 'Test Description', start_time: '2025-02-20T10:00:00Z', end_time: '2025-02-20T12:00:00Z' });

    const updateRes = await request(app)
      .put(`/api/events/${createRes.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Event', description: 'Updated Description', start_time: '2025-02-21T10:00:00Z', end_time: '2025-02-21T12:00:00Z' });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.title).toBe('Updated Event');
  });

  it('should return error if event ID is invalid during update', async () => {
    const res = await request(app)
      .put('/api/events/invalid-id')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Event', description: 'Updated Description' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Nieprawidłowy identyfikator wydarzenia');
  });

  it('should allow user to delete an event', async () => {
    const createRes = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Event', description: 'Test Description', start_time: '2025-02-20T10:00:00Z', end_time: '2025-02-20T12:00:00Z' });

    const deleteRes = await request(app)
      .delete(`/api/events/${createRes.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.msg).toBe('Wydarzenie zostało usunięte');
  });

  it('should return error if trying to delete an event that doesn’t exist', async () => {
    const res = await request(app)
      .delete('/api/events/invalid-id')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Nieprawidłowy identyfikator wydarzenia');
  });
});