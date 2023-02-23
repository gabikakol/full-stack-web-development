const Header = ({ course }) => <h2>{course}</h2>

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

const Course = ({course}) => {
  console.log('component Course')
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Sum parts={course.parts}/>
    </div>
  )
}

export default Course