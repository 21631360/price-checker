import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [perfumes, setPerfumes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch all perfumes on mount
  useEffect(() => {
    fetchPerfumes('')
  }, [])

  // Fetch perfumes from backend
  const fetchPerfumes = async (query) => {
    setLoading(true)
    setError(null)
    
    try {
      const url = query 
        ? `/api/search?q=${encodeURIComponent(query)}`
        : '/api/perfumes'
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setPerfumes(data)
    } catch (err) {
      setError(`Failed to fetch perfumes: ${err.message}`)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    fetchPerfumes(value)
  }

  // Clear search
  const handleClear = () => {
    setSearchTerm('')
    fetchPerfumes('')
  }

  return (
    <div className="container">
      <header className="header">
        <h1>🌸 Perfume Price Comparison</h1>
        <p>Find your favorite scents at the best prices</p>
      </header>

      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by perfume name, brand, or description..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={handleClear} className="clear-btn">✕</button>
          )}
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="results-info">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>Found <strong>{perfumes.length}</strong> perfume{perfumes.length !== 1 ? 's' : ''}</p>
        )}
      </div>

      <div className="perfumes-grid">
        {perfumes.map(perfume => (
          <div key={perfume.id} className="perfume-card">
            <div className="perfume-header">
              <h2>{perfume.name}</h2>
              <span className="brand">{perfume.brand}</span>
            </div>
            
            <p className="description">{perfume.description}</p>
            
            <div className="perfume-details">
              <span className="volume">📦 {perfume.volume}</span>
              <span className="rating">⭐ {perfume.rating}</span>
            </div>
            
            <div className="perfume-footer">
              <span className="price">${perfume.price.toFixed(2)}</span>
              <button className="buy-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      {!loading && perfumes.length === 0 && (
        <div className="no-results">
          <p>No perfumes found. Try a different search!</p>
        </div>
      )}
    </div>
  )
}

export default App