require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
}

app.use(cors())
app.use(express.static('dist'))

morgan.token('body',(req) => { return JSON.stringify(req.body) })
const tiny = ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(tiny))

let persons =
[
	{
		'id': 1,
		'name': 'Arto Hellas',
		'number': '040-123456'
	},
	{
		'id': 2,
		'name': 'Ada Lovelace',
		'number': '39-44-5323523'
	},
	{
		'id': 3,
		'name': 'Dan Abramov',
		'number': '12-43-234345'
	},
	{
		'id': 4,
		'name': 'Mary Poppendieck',
		'number': '39-23-6423122'
	}
]

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
	const len = persons.length
	response.send(
		`<p>Phonebook has info for ${len} people</p>
    <p>${new Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})


app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {

			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})

		.catch(error => next(error))

})


app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

const generateId = () => {
	const maxId = persons.length > 0
		? Math.max(...persons.map(n => n.id))
		: 0
	return maxId + 1
}

app.put('/api/person/:id', (request, response, next) => {
	const { name, number } = request.body


	Person.findByIdAndUpdate(
		request.params.id,
		{ name, number },
		{ new: true, runValidators: true, context: 'query' }
	)
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})
app.use(requestLogger)

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	if (!body.name) {
		return response.status(400).json({
			error: 'name missing'
		})
	} if (!body.number) {
		return response.status(400).json({
			error: 'number missing'
		})
	}

	const checkName = persons.find(p => p.name === body.name)
	if (checkName) {
		return response.status(400).json({
			error: 'name must be unique'
		})
	}

	const person = {
		name: body.name,
		number: body.number
	}


	person.save()
		.then(savedPerson => {
			response.json(savedPerson)
		})
		.catch(error => next(error))
})

app.use(express.json())

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
	console.log('unknown endpoint')
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})