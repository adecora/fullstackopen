import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export const useDidMount = () => {
  const isMountRef = useRef(false)

  useEffect(() => {
    isMountRef.current = true
  }, [])

  return isMountRef.current
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const isMount = useDidMount()

  useEffect(() => {
    if (isMount) {
      axios
        .get(
          `https://restcountries.com/v2/name/${name}?fullText=true`
        )
        .then(country => {
          if (country.data.status === 404) {
            setCountry({ found: false })
          } else {
            setCountry({
              data: country.data[0],
              found: true
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [name])

  return country
}