const App = () => {
  console.log('test App')

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

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
      <Content part={part1} exercises={exercises1}/>
      <Content part={part2} exercises={exercises2}/>
      <Content part={part3} exercises={exercises3}/>
      <Total points={exercises1+exercises2+exercises3}/>
    </div>
  )
}

const Header = (props) => {
  console.log('test Header2')

  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  console.log('test Content2')

  return (
    <p>{props.part} {props.exercises}</p>
  )
}

export default App

const Total = (props) => {
  console.log('test Total2')

  return (
    <p>Number of exercises {props.points}</p>
  )
}