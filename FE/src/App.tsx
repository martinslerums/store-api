import {Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductsTest from './pages/ProductsTest';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import LoginPage from './pages/Login';
import DashboardTest from './components/DashboardTest';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productstest" element={<ProductsTest />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardTest />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
