const Persons = ({persons}) => {
    console.log('Persons', persons)
    return (
      persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
    )
  }

export default Persons