const Persons = ({persons, handleDelete}) => {
    console.log('Persons', persons)

    return (
      <div>
        {persons.map(person => 
        <div key={person.name}>
          {person.name} {person.number} {<input id={person.name} type='button' value='delete' onClick ={handleDelete}/>}
        </div>)}
      </div>
      )
  }

/* const clickDelete = ({person}) => {
  console.log('click delete')
  window.alert(`Delete ${person.name}?`)
} */



export default Persons

/* window.alert(`Delete ${newName}?` */