import { useState, useEffect } from 'react';
import './Home.css';

export default function Home() {
  const [perfumes, setPerfumes] = useState([]);
  const [filteredPerfumes, setFilteredPerfumes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPerfumes();
  }, []);

  const fetchPerfumes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/perfumes');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setPerfumes(data);
      setFilteredPerfumes(data);
      setError('');
    } catch (err) {
      setError(`Failed to fetch perfumes: ${err.message}`);
      setPerfumes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredPerfumes(perfumes);
    } else {
      const filtered = perfumes.filter((perfume) =>
        perfume.name.toLowerCase().includes(query) ||
        perfume.brand.toLowerCase().includes(query) ||
        perfume.description.toLowerCase().includes(query)
      );
      setFilteredPerfumes(filtered);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setFilteredPerfumes(perfumes);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>💎 Price Checker</h1>
        <p>Compare prices and find the best deals</p>
      </div>

      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search by perfume name, brand, or description..."
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={handleClear}>
              ✕
            </button>
          )}
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="results-info">
        <p>Found {filteredPerfumes.length} perfumes</p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#999' }}>Loading...</p>
      ) : filteredPerfumes.length === 0 ? (
        <div className="no-results">
          <p>No perfumes found. Try a different search!</p>
        </div>
      ) : (
        <div className="perfumes-grid">
          {filteredPerfumes.map((perfume) => (
            <div key={perfume.id} className="perfume-card">
              <div className="perfume-header">
                <h2>{perfume.name}</h2>
                <span className="brand">{perfume.brand}</span>
              </div>
              <p className="description">{perfume.description}</p>
              <div className="perfume-details">
                <div className="volume">📦 {perfume.volume}</div>
                <div className="rating">⭐ {perfume.rating}</div>
              </div>
              <div className="perfume-footer">
                <div className="price">${perfume.price}</div>
                <button className="buy-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}