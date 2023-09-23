const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('You need to give a password to the database')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kakolgab:${password}@fullstack.ilfyoih.mongodb.net/?retryWrites=true&w=majority`

mongoose
	.connect(url)
	.then((result) => {
		console.log('Connected to the database')
	})

const personSchema =  new mongoose.Schema({
	name : String,
	number: String,
})

const Person = mongoose.model(('Person'), personSchema)

if (process.argv.length === 3) {
	console.log('phonebook:')
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(person.name, person.number)
		})
		mongoose.connection.close()
	})

} else if (process.argv.length === 5) {
	const name_input = process.argv[3]
	const number_input = process.argv[4]
	const person = new Person({
		name: name_input,
		number: number_input,
	})

	person.save()
		.then(result => {
			console.log(`added ${name_input} number ${number_input} to phonebook`)
			mongoose.connection.close()
		})
}