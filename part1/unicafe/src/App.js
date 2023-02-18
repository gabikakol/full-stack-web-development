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


  const Statistics = (props) => {
    console.log('all', props.all)

    if (props.all === 0) {
      return (
        <div>
          No feedback given
        </div>
      )
    }       
    return (
      <table>
        <tbody>
          <StatisticsLine text='good' value={good}/>
          <StatisticsLine text='neutral' value={neutral}/>
          <StatisticsLine text='bad' value={bad}/>
          <StatisticsLine text='all' value={all}/>
          <StatisticsLine text='average' value={(good-bad)/all}/>
          <StatisticsLine text='positive' value={(good/all*100)+' %'}/>
        </tbody>
      </table>
    )
  }

  const MyButton = (props) => {
    return (
      <div>
        <button onClick={props.action}>{props.opinion}</button>
      </div>
    )
  }

  const StatisticsLine = (props) => {
    console.log(props.text, props.value)

    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
        </tr>              
    )
  }


  return (
    <div>
      <h1>give feedback</h1>
      <MyButton action= {handleClickGood} opinion='good'/>
      <MyButton action= {handleClickNeutral} opinion='neutral'/>
      <MyButton action= {handleClickBad} opinion='bad'/>
      

      <h1>statistics</h1> 
      <Statistics all={all}/>
      
    </div>
  )
}

export default App
