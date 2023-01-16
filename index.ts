require('dotenv').config()
import http from 'http'
const PORT = process.env.PORT || 3000
import { StatusCodes } from './src/statusCodes'

import { getAllPerson, getPerson, createNewPerson, updatePerson, deletePerson } from './src/controller'
import { getReqData } from './src/utils'

export const server = http.createServer(
  async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
    try {
      // /peusers GET
      if (req.url === '/users' && req.method === 'GET') {
        const persons = await getAllPerson()
        res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(persons))
      }

      // /peusersid : GET
      else if (req.url?.match(/\/users\/([^\n]+)/) && req.method === 'GET') {
        try {
          const id = req.url?.split('/')[2]
          const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
          if (!regexExp.test(id)) {
            res.writeHead(StatusCodes.BadRequest, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `id ${id} is not valid` }))
          }
          const person = await getPerson(id)
          res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(person))
        } catch (error) {
          console.log(error)
          res.writeHead(StatusCodes.NotFound, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: error }))
        }
      }

      // /users/ : POST
      else if (req.url === '/users' && req.method === 'POST') {
        try {
          let person_data = (await getReqData(req)) as string

          let person = await createNewPerson(JSON.parse(person_data))

          res.writeHead(StatusCodes.Created, { 'Content-Type': 'application/json' })

          res.end(JSON.stringify(person))
        } catch (error) {
          res.writeHead(StatusCodes.BadRequest, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: error }))
        }
      } // /users/:id : PUT
      else if (req.url?.match(/\/users\/([^\n]+)/) && req.method === 'PUT') {
        try {
          const id = req.url?.split('/')[2]

          const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
          if (!regexExp.test(id)) {
            res.writeHead(StatusCodes.BadRequest, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `id ${id} is not valid` }))
          }
          let body = await getReqData(req)
          let updated_person = await updatePerson(id, body)

          res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' })

          res.end(JSON.stringify(updated_person))
        } catch (error) {
          res.writeHead(StatusCodes.NotFound, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: error }))
        }
      }

      // /users/:id : DELETE
      else if (req.url?.match(/\/users\/([^\n]+)/) && req.method === 'DELETE') {
        try {
          const id = req.url?.split('/')[2]
          const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
          if (!regexExp.test(id)) {
            res.writeHead(StatusCodes.BadRequest, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `id ${id} is not valid` }))
          }
          let message = await deletePerson(id)
          res.writeHead(StatusCodes.NoContent, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message }))
        } catch (error) {
          res.writeHead(StatusCodes.NotFound, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: error }))
        }
      } else {
        res.writeHead(StatusCodes.NoContent, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route not found' }))
      }
    } catch (error) {
      res.writeHead(500)
      res.end(JSON.stringify({ message: 'internal server error' }))
    }
  }
)

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()

module.exports = server
