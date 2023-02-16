const App = () => {
  console.log('test App')

  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total exs={parts[0].exercises+parts[1].exercises+parts[2].exercises}/>
    </div>
  )
}

const Header = (props) => {
  console.log(props)

  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)

  return (
    <div>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
    </div>

  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)

  return (
    <div>
      <p>Number of exercises {props.exs}</p>
    </div>
  )
}

export default App
