import {Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductsTest from './pages/ProductsTest';
import Products from './pages/Products';
import NotFound from './pages/NotFound';


function App() {
  return (
    <div>
      <nav>
        <Link to='/'>Home</Link>
        <br />
        <Link to='/products'>Products</Link>
        <br />
        <Link to='/productstest'>Productstest</Link>
        <br />
        <br />
        <br />
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productstest" element={<ProductsTest />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
