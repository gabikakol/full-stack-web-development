import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

/*     { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'} */

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('effect hook used')
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const findName = persons.find(person => person.name === newName)

    if (findName !== undefined) {
      console.log('name repeated, not added')
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName, number:newNumber}))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log('handleNameChange:', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('handleNumberChange:', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log('handleFilter:', event.target.value)
    setNewFilter(event.target.value)
  }

  const PersonsFilter = (newFilter === '')
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={PersonsFilter}/>
    </div>
  )
}

export default App
