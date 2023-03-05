import { useState, useEffect } from 'react'

import './index.css'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/personsService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)

/*  { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'} */

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {setPersons(initialPersons)})
  }, [])

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const personObject = {name: newName, number:newNumber}

    const findName = persons.find(person => person.name === newName)

    if (findName !== undefined) {
      console.log('name repeated, not added')
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log('change number')
        personService
          .update(findName.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== findName.id ? person : returnedPerson))
          })
          .then(info => {setInfoMessage(`Changed number of ${newName}`)
            setTimeout(() => {setInfoMessage(null)}, 2000)
          })
          console.log('.then(info-changed)', infoMessage)
      }
    }
    else {
      setPersons(persons.concat(personObject))

      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      .then(info => {setInfoMessage(`Added ${newName}`)
        setTimeout(() => {setInfoMessage(null)}, 2000)
      })
      console.log('.then(info-added)', infoMessage)
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

  const handleDelete = (event) => {
    console.log('click delete')
    const id = persons.find(person => person.name === event.target.id).id
    console.log('delete id', id)

    if (window.confirm(`Delete ${event.target.id}?`)) {
      return (
        personService
          .deleteNumber(id)
          .then(returnedPerson => {setPersons(persons.filter(
            person => person.name !== event.target.id))})
      )
    }
  }

  const PersonsFilter = (newFilter === '')
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={infoMessage}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={PersonsFilter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
