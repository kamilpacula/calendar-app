const request = require('supertest');
const app = require('../../index');  

describe('Auth Routes', () => {
  it('should register a user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'John', email: 'john@example.com', password: 'password123' });

    expect(res.status).toBe(201);
    expect(res.body.msg).toBe('Rejestracja udana');
  });

  it('should return error if email is already registered', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'John', email: 'john@example.com', password: 'password123' });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'John', email: 'john@example.com', password: 'password123' });

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe('Użytkownik z takim emailem już istnieje');
  });

  it('should login a user successfully', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'John', email: 'john@example.com', password: 'password123' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'john@example.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return error for invalid credentials during login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'invalid@example.com', password: 'password123' });

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe('Niepoprawne dane');
  });
});