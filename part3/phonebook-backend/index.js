const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body',(req, res, next) => { return JSON.stringify(req.body) });
const tiny = ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(tiny))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

/* let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
] */

app.get('/', (request,response) => {
    response.send('<h1>hello world</h1>')
})

app.get('/info', (request, response) => {
    const len = persons.length
    response.send(
        `<p>Phonebook has info for ${len} people</p>
        <p>${new Date()}</p>`)
})

app.get('/api/persons', (request,response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    console.log('id:', id)
    const person = persons.find(person => person.id === id)
    console.log('person:', person)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }  
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body

    if (!person.name) {
      return response.status(400).json({
        error: 'name missing'
      })
    } if (!person.number) {
      return response.status(400).json({
        error: 'phone number missing'
      })
    }

    const checkName = persons.find(p => p.name === person.name)
    if (checkName) {
      console.log('not unique:', checkName)
      return response.status(400).json({
        error: 'name must be unique'
      })
    }

    person.id = generateId()

    persons = persons.concat(person)

    console.log(person)
    response.json(person)
})

const generateId = () => {
    const maxId = persons.length>0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId+1
}

const unknownEndpoint = (request, response) => {
  console.log('unknown endpoint')
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
