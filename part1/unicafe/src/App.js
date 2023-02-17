import { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  
  const handleClickGood = () => {
    console.log('increasing good', good)
    setGood(good + 1)
    setAll(all+1)
  }

  const handleClickNeutral = () => {
    console.log('increasing neutral', neutral)
    setNeutral(neutral + 1)
    setAll(all+1)
  }

  const handleClickBad = () => {
    console.log('increasing bad', bad)
    setBad(bad + 1)
    setAll(all+1)
  }


  const StatisticsCond = (props) => {
    console.log('all', props.all)

    if (props.all === 0) {
      return (
        <div>
          No feedback given
        </div>
      )
    }   
    
    return (
      <div>
        <Statistics name='good' stat={good}/>
        <Statistics name='neutral' stat={neutral}/>
        <Statistics name='bad' stat={bad}/>
        <Statistics name='all' stat={all}/>
        <Statistics name='average' stat={(good-bad)/all}/>
        <Statistics name='positive' stat={(good/all*100)+' %'}/> 
      </div>
    )


  }

  const Statistics = (props) => {
    console.log(props.name, props.stat)

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
      <StatisticsCond all={all}/>
      
    </div>
  )
}

export default App
