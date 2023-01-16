import { server } from '../index'
import supertest from 'supertest'
// import * as request from "supertest";
import 'jest'

describe('Testing simple-crud-api 1st group', () => {
  const req = supertest(server)
  let id: any
  const mockUser = { name: 'Tom', age: 40, hobbies: 'collect post cards' }

  test('GET request should return an empty array and status code 200', async () => {
    const response = await req.get('/users')
    supertest(expect(response.status).toBe(200))
    expect(response.body).toEqual([])
  })

  test('POST request should create new person and return status code 201', async () => {
    const response = await req.post('/users').send(mockUser)
    id = response.body.id
    expect(response.status).toBe(201)
    expect(response.body).toMatchObject(mockUser)
  })

  test('GET request should return a person by id and status code 200', async () => {
    const response = await req.get(`/users/${id}`)
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject(mockUser)
  })

  test('PUT request should update a person by id and return status code 200', async () => {
    mockUser.name = 'Gleb'
    const response = await req.put(`/users/${id}`).send(mockUser)
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject(mockUser)
  })

  test('DELETE request should delete a person by id and return status code 204', async () => {
    const response = await req.delete(`/users/${id}`)
    expect(response.status).toBe(204)
  })

  test('GET request with invalid id should return status code 404', async () => {
    const response = await req.get(`/users/${id}`)
    expect(response.status).toBe(404)
  })

  server.close()
})
describe('Testing simple-crud-api 2nd group', () => {
  const req = supertest(server)
  const mockUser = { name: 'Pete', age: 2 }
  const nonExistId = '995dd2d8-b918-4eb3-a744-b6374be62089'

  test('GET request with invalid id should return status code 400', async () => {
    const badId = '!!!efghj'
    const response = await req.get(`/users/${badId}`)
    expect(response.status).toBe(400)
  })

  test('GET request with not existing id should return status code 400', async () => {
    const response = await req.get(`/users/${nonExistId}`)
    expect(response.status).toBe(404)
  })
})

describe('Testing simple-crud-api 3r groupd', () => {
  const req = supertest(server)
  const mockUser = { name: 'Harry', age: 20 }

  test('POST request with wrong objects fields should return status code 400', async () => {
    const response = await req.post('/users').send(mockUser)
    expect(response.status).toBe(400)
  })
})
