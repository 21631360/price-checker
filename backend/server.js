import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Sample perfume database
const perfumes = [
  {
    id: 1,
    name: 'Chanel No. 5',
    brand: 'Chanel',
    price: 199.99,
    volume: '50ml',
    rating: 4.8,
    description: 'Classic timeless fragrance'
  },
  {
    id: 2,
    name: 'Dior Sauvage',
    brand: 'Dior',
    price: 159.99,
    volume: '100ml',
    rating: 4.7,
    description: 'Fresh and spicy aromatic'
  },
  {
    id: 3,
    name: 'Perfume Nectar',
    brand: 'Lancôme',
    price: 129.99,
    volume: '75ml',
    rating: 4.6,
    description: 'Sweet and elegant fragrance'
  },
  {
    id: 4,
    name: 'Gucci Bloom',
    brand: 'Gucci',
    price: 149.99,
    volume: '50ml',
    rating: 4.5,
    description: 'Floral and romantic scent'
  },
  {
    id: 5,
    name: 'Versace Eros',
    brand: 'Versace',
    price: 139.99,
    volume: '100ml',
    rating: 4.6,
    description: 'Mint and vanilla blend'
  },
  {
    id: 6,
    name: 'Prada Luna Rossa',
    brand: 'Prada',
    price: 169.99,
    volume: '100ml',
    rating: 4.7,
    description: 'Bold and sophisticated'
  },
  {
    id: 7,
    name: 'Tom Ford Black Orchid',
    brand: 'Tom Ford',
    price: 189.99,
    volume: '50ml',
    rating: 4.8,
    description: 'Dark and sensual fragrance'
  },
  {
    id: 8,
    name: 'Yves Saint Laurent Mon Parfum',
    brand: 'YSL',
    price: 119.99,
    volume: '75ml',
    rating: 4.4,
    description: 'Oriental and warm'
  }
];

// Routes

// Get all perfumes
app.get('/api/perfumes', (req, res) => {
  res.json(perfumes);
});

// Search perfumes by name or brand
app.get('/api/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  
  if (!query) {
    return res.json(perfumes);
  }
  
  const results = perfumes.filter(p => 
    p.name.toLowerCase().includes(query) ||
    p.brand.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  );
  
  res.json(results);
});

// Get single perfume by ID
app.get('/api/perfumes/:id', (req, res) => {
  const perfume = perfumes.find(p => p.id === parseInt(req.params.id));
  
  if (!perfume) {
    return res.status(404).json({ error: 'Perfume not found' });
  }
  
  res.json(perfume);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`🎀 Backend server running on http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/api/search?q=perfume`);
});