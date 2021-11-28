require('dotenv').config()
const http = require('http')
const PORT = process.env.PORT || 3000
const StatusCodes = require('./src/statusCodes')

const { getAllPerson, getPerson, createNewPerson, updatePerson, deletePerson } = require('./src/controller')
const { getReqData } = require('./src/utils')

const server = http
  .createServer(async (req, res) => {
    // /person : GET
    if (req.url === '/person' && req.method === 'GET') {
      const persons = await getAllPerson()
      res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(persons))
    }

    // /person/:id : GET
    else if (req.url.match(/\/person\/([^\n]+)/) && req.method === 'GET') {
      try {
        const id = req.url.split('/')[2]
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

    // /person/ : POST
    else if (req.url === '/person' && req.method === 'POST') {
      try {
        let person_data = await getReqData(req)

        let person = await createNewPerson(JSON.parse(person_data))

        res.writeHead(StatusCodes.Created, { 'Content-Type': 'application/json' })

        res.end(JSON.stringify(person))
      } catch (error) {
        res.writeHead(StatusCodes.BadRequest, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: error }))
      }
    } // /person/:id : PUT
    else if (req.url.match(/\/person\/([^\n]+)/) && req.method === 'PUT') {
      try {
        const id = req.url.split('/')[2]

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

    // /person/:id : DELETE
    else if (req.url.match(/\/person\/([^\n]+)/) && req.method === 'DELETE') {
      try {
        const id = req.url.split('/')[2]
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
  })
  .on('error', function (e) {
    res.status(500)
    res.end(JSON.stringify({ message: 'internal server error' }))
    console.log(e)
  })

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()

module.exports = server
