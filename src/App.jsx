import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [catImage, setCatImage] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchCat = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search')
      setCatImage(response.data[0].url)
    } catch (error) {
      console.error('Error fetching cat:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCat()
  }, [])

  return (
    <div className="app">
      <h1>Random Cat Generator</h1>
      <div className="cat-container">
        {loading ? (
          <p>Loading...</p>
        ) : catImage ? (
          <img src={catImage} alt="Random cat" className="cat-image" />
        ) : (
          <p>Failed to load cat image</p>
        )}
      </div>
      <button onClick={fetchCat} className="refresh-btn">
        Load another
      </button>
    </div>
  )
}

export default App
