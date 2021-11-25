require('dotenv').config()
const http = require('http')
const PORT = process.env.PORT || 4040

const server = http.createServer(async (req, res) => {
  if (req.url === '/api' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write('Welcome, the initial page is working')
    res.end()
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: '404 page not found' }))
  }
})

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`)
})
