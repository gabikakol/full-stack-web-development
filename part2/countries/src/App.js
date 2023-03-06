import {useState, useEffect} from 'react'
import axios from 'axios'

const CountryObject = (props) => {
  return (
    {name: props.name.common, 
    capital: props.capital,
    area: props.area,
    languages: props.languages,
    flag: props.flags.png
    }
  )
}

const App = () => {

  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([]) 
  const countriesList = countries.map(CountryObject)

  useEffect(() => {
    console.log('useEffect ran')
    axios
      .get(`https://restcountries.com/v3.1/all/`)
      .then(response => {setCountries(response.data)})
  }, [])

  const handleNewSearch = (event) => {
    console.log('searching:', event.target.value)
    setNewSearch(event.target.value)
  }

  const CountriesShow = ({toShow}) => {
    {console.log('countriesShow', toShow)}

    if (toShow.length === 250) {
      return (
        <div></div>
      )
    }

    if (toShow.length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    }

    if (toShow.length === 1) {
      return (
        <div>
          {toShow.map(country => <ShowDetailed key={country.name} country={country}/>)}
        </div>
      )
    }

    return (
      <div>
      {toShow.map(country => <div key={country.name}>{country.name}</div>)}
      </div>  
    )
  } 

  const ShowDetailed = (country) => {
    {console.log('one country:', country)}
    return (
      <div>
        <h1>{country.country.name}</h1>
        <div>capital: {country.country.capital}</div>
        <div>area: {country.country.area}</div> 
        <div>
          <h3>languages:</h3>
            <ul>
              <li>...</li>
            </ul>
        </div>
        <div>
          <img src={country.country.flag} alt="country's flag"/>
        </div>
      </div>
    )
  }

  const filterCountries = (newSearch === '')
  ? countriesList
  : countriesList.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <form>
      find countries: <input value={newSearch} onChange={handleNewSearch}/>
      </form>
      <div>
        <CountriesShow toShow={filterCountries}/>
      </div>
    </div>
  )
}

export default App
