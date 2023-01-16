import { server } from '../index'
import supertest, { SuperTest } from 'supertest'
import superagent from 'superagent'

/* eslint no-use-before-define: 100 */ // --> ON
describe('Testing CRUD API Scenario 1', () => {
  const req = supertest(server)
  let id: any
  const mockUser = { name: 'Pete', age: 2, hobbies: 'ski' }

  test('test for GET request', async () => {
    const response = await req.get('/users')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  test('test for POST request', async () => {
    const response = await req.post('/users').send(mockUser)
    id = response.body.id
    expect(response.status).toBe(201)
    expect(response.body).toMatchObject(mockUser)
  })

  test('test GET request with ID params', async () => {
    const response = await req?.get(`/users/${id}`)
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject(mockUser)
  })

  test('test for PUT request', async () => {
    mockUser.age = 4
    const response = await req?.put(`/users/${id}`).send(mockUser)
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject(mockUser)
  })

  test('test DELETE request', async () => {
    const response = await req?.delete(`/users/${id}`)
    expect(response.status).toBe(204)
  })

  test('test GET request with wrong ID params', async () => {
    const response = await req?.get(`/users/${id}`)
    expect(response.status).toBe(404)
  })

  server?.close()
})

describe('Testing CRUD API Scenario 2', () => {
  const req = supertest(server)

  const nonFoundId = '885dd2d8-b918-4eb3-a833-b6374be63054'
  const wrongId = 'gdfsfhskdhsd'

  test('test for GET request with worng Id', async () => {
    const response = await req?.get(`/users/${wrongId}`)
    // expect(response.status).toBe(400)
    /* eslint-disable-next-line */
    supertest(expect(response.status).toBe(400))
  })

  test('test for GET request with non existing Id', async () => {
    const response = await req?.get(`users/${nonFoundId}`)
    expect(response.status).toBe(404)
  })
})

// describe('Testing CRUD API Scenario 3', () => {
//   const req = supertest(server)
//   const mockUser = { name: 'Pete', age: 2 }

//   test('test for POST with wrong objects fields', async () => {
//     const response = await req!.post('/person')?.send(mockUser)

//     expect(response.status).toBe(400)
//   })
// })
function expect(_status: number): any {
  throw new Error('Function not implemented.')
}
