import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    console.log('increasing good', good)
    setGood(good + 1)
  }

  const handleClickNeutral = () => {
    console.log('increasing neutral', neutral)
    setNeutral(neutral + 1)
  }

  const handleClickBad = () => {
    console.log('increasing bad', bad)
    setBad(bad + 1)
  }

  const Statistics = (props) => {
    return (
      <div>
        <p>{props.name} {props.stat}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleClickGood}>good</button>
      <button onClick={handleClickNeutral}>neutral</button>
      <button onClick={handleClickBad}>bad</button>
      <h1>statistics</h1>
      <Statistics name='good' stat={good}/>
      <Statistics name='neutral' stat={neutral}/>
      <Statistics name='bad' stat={bad}/>
      <Statistics name='all' stat={good+neutral+bad}/>
      <Statistics name='average' stat={(good-bad)/(good+neutral+bad)}/>
      <Statistics name='positive' stat={(good/(good+neutral+bad)*100)+' %'}/> 
    </div>
  )
}

export default App
