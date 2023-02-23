const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <h4>Number of exercises {sum}</h4>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part}/>)}
    </div>
  )
}

const Sum = ({parts}) => {
  const calcSum = parts.reduce((prev, cur) => prev+cur.exercises, 0)
  return (
    <Total sum={calcSum}/>
  )
}

/* 
const Sum = ({parts}) => {
  console.log('array', parts)
  let calcSum = 0
  parts.forEach(item => (
    calcSum += item.exercises
  ))
  console.log('sum', calcSum)
  return (
    <Total sum={calcSum}/>
  )
} 
*/

const Course = (props) => {
  console.log('component Course')
  return (
    <div>
      <Header course={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Sum parts={props.course.parts}/>
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'test',
        exercises: 100,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App