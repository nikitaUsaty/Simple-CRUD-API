const server = require('../index')
const supertest = require('supertest')

describe('Testing CRUD API Scenario 1', () => {
  const req = supertest(server)
  let id
  const mockUser = { name: 'Pete', age: 2, hobbies: 'ski' }

  test('test for GET request', async () => {
    const response = await req.get('/person')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  test('test for POST request', async () => {
    const response = await req.post('/person').send(mockUser)
    id = response.body.id
    expect(response.status).toBe(201)
    expect(response.body).toMatchObject(mockUser)
  })

  test('test GET request with ID params', async () => {
    const response = await req.get(`/person/${id}`)
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject(mockUser)
  })

  test('test for PUT request', async () => {
    mockUser.age = 4
    const response = await req.put(`/person/${id}`).send(mockUser)
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject(mockUser)
  })

  test('test DELETE request', async () => {
    const response = await req.delete(`/person/${id}`)
    expect(response.status).toBe(204)
  })

  test('test GET request with wrong ID params', async () => {
    const response = await req.get(`/person/${id}`)
    expect(response.status).toBe(404)
  })

  server.close()
})

describe('Testing CRUD API Scenario 2', () => {
  const req = supertest(server)
  const nonFoundId = '885dd2d8-b918-4eb3-a833-b6374be63054'
  const wrongId = 'gdfsfhskdhsd'

  test('test for GET request with worng Id', async () => {
    const response = await req.get(`/person/${wrongId}`)
    expect(response.status).toBe(400)
  })

  test('test for GET request with non existing Id', async () => {
    const response = await req.get(`/person/${nonFoundId}`)
    expect(response.status).toBe(404)
  })
})

describe('Testing CRUD API Scenario 3', () => {
  const req = supertest(server)
  const mockUser = { name: 'Pete', age: 2 }

  test('test for POST with wrong objects fields', async () => {
    const response = await req.post('/person').send(mockUser)

    expect(response.status).toBe(400)
  })
})
