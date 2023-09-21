const Persons = ({persons, handleDelete}) => {
  return (
    <div>
      {persons.map(person => <div key={person.name}> 
          {person.name} {person.number} {<input id={person.name} type='button' value='delete' onClick ={handleDelete}/>} </div>)}
    </div>
  )
} 

export default Persons