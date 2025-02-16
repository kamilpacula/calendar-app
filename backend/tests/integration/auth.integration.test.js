const request = require('supertest');
const app = require('../../index');  

describe('Auth - Integration', () => {
  
  it('should register a user and then log in', async () => {
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({ name: 'John', email: 'john@example.com', password: 'password123' });
    
    expect(registerRes.status).toBe(201);
    expect(registerRes.body.msg).toBe('Rejestracja udana');

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'john@example.com', password: 'password123' });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body).toHaveProperty('token');
  });

  it('should not login with incorrect credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'john@example.com', password: 'wrongpassword' });
    
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe('Niepoprawne dane');
  });

  it('should return 400 if email is missing during registration', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'John', password: 'password123' });
    
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Email i hasło są wymagane');
  });

  it('should return 400 if password is missing during registration', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'John', email: 'john@example.com' });
    
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Hasło jest wymagane');
  });

  it('should return error if trying to register with existing email', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'John', email: 'john@example.com', password: 'password123' });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'John', email: 'john@example.com', password: 'password123' });

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe('Użytkownik z takim emailem już istnieje');
  });
});