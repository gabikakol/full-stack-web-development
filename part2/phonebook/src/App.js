import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas',
    number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  const Person = ({person}) => {
    return (
      <div>
        {person.name} {person.number}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} person={person}/>)}
    </div>
  )
}

export default App

