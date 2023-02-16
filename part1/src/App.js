const App = () => {
  console.log('test App')

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [
    {name: 'Fundamentals of React'}, 
    {name: 'Using props to pass data'},
    {name: 'State of component'}
  ]
  const points = [
    {pts: 10},
    {pts: 7},
    {pts: 14}
  ]

  return (
    <div>
      <h2>step1</h2>
      <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>

      <br/>
      <h2>step2</h2>
      <Header course={course} />
      <Content part={parts} exercises={points}/>
      <Total points={exercises1+exercises2+exercises3}/>
    </div>
  )
}

const Header = (props) => {
  console.log('test Header')

  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log('test Content')

  return (
    <div>
      <Part part={props.part[0].name} exercises={props.exercises[0].pts}/>
      <Part part={props.part[1].name} exercises={props.exercises[1].pts}/>
      <Part part={props.part[2].name} exercises={props.exercises[2].pts}/>

    </div>
    
  )
}

const Part = (props) => {
  console.log('test Part')
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  console.log('test Total')

  return (
    <div>
      <p>Number of exercises {props.points}</p>
    </div>
  )
}

export default App