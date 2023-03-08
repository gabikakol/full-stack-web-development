const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})