import request from 'supertest'
import app from '../src/app'

describe('Auth Endpoints', () => {
  const api = request(app)
  const testEmail = `testuser${Math.random().toString(36).substring(2, 15)}@mail.com`
  const testPassword = 'Test1234'
  const testName = 'Test Usuario'

  it('debe registrar un usuario exitosamente', async () => {
    const res = await api
      .post('/api/auth/register')
      .send({
        name: testName,
        email: testEmail,
        password: testPassword
      })

    expect(res.statusCode).toBe(201)
    expect(res.body.message).toBe('Usuario registrado correctamente')
  })

  it('debe permitir login exitoso con el usuario registrado', async () => {
    const res = await api
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: testPassword
      })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
  })
})
