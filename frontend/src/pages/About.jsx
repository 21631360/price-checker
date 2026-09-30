import './pages.css';

export default function About() {
  return (
    <div className="container">
      <div className="page-content">
        <h1>About Price Checker</h1>
        <p className="description-text">
          Price Checker helps you find the best prices on your favorite perfumes across different retailers.
        </p>
        
        <h2>Features</h2>
        <ul>
          <li>Search perfumes by name, brand, or description</li>
          <li>View prices and ratings</li>
          <li>Compare prices across retailers</li>
          <li>Add perfumes to your cart</li>
        </ul>

        <h2>Contact Us</h2>
        <p>Have questions? Reach out to us at support@pricechecker.com</p>
      </div>
    </div>
  );
}