import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/personService'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [infoMessage, setInfoMessage] = useState([null, true])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {setPersons(initialPersons)})
  }, [])

  const PersonsFilter = (newFilter === '')
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    
    const findName = persons.find(person => person.name === newName)
    const personObject = {name: newName,number: newNumber}
    if (findName === undefined) {      
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))})
        .then(info => {setInfoMessage([`Added ${newName}`, true])
          setTimeout(() => {setInfoMessage([null, true])}, 2000)})
        setNewName('')
        setNewNumber('')

    }
    else {
      if (window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')) {
        console.log('changing number')
        personService
          .update(findName.id, personObject)
          .then(returnedPerson => {setPersons(persons.map(person => person.id !== findName.id ? person : returnedPerson))})
          .then(info => {setInfoMessage([`Changed number of ${newName}`, true])
            setTimeout(() => {setInfoMessage([null, true])}, 2000)})
          .catch(error => {setInfoMessage([`Information of ${newName} has already been removed from the server`, false])
            setTimeout(() => {setInfoMessage([null, true])}, 2000)})
      }
    }
  }

  const handleNameChange = (event) => {
    console.log('handle name change:', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('handle number change:', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => { 
    console.log('handle filter change:', event.target.value)
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
            person => person.name !== event.target.id
          ))})
      )
    }
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <Notification message={infoMessage}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <Persons persons={PersonsFilter} handleDelete={handleDelete}/>
    </div>
  )

}

export default App

