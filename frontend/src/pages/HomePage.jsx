import { useState, useEffect } from 'react';
import { productsApi, ordersApi } from '../services/api';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProducts from '../components/FeaturedProducts';
import SeasonalOffer from '../components/SeasonalOffer';
import OrderForm from '../components/OrderForm';
import Footer from '../components/Footer';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [allProducts, featured] = await Promise.all([
          productsApi.getAll(),
          productsApi.getAll(true)
        ]);
        setProducts(allProducts.data);
        setFeaturedProducts(featured.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleOrderSubmit = async (orderData) => {
    try {
      const response = await ordersApi.create(orderData);
      setOrderSuccess(response.data);
      // Scroll to success message
      setTimeout(() => {
        document.getElementById('order-form').scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-brown">Loading Sweet Crumbs...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <Header />
      <div style={{ paddingTop: 'clamp(80px, 15vw, 100px)' }}>
        <Hero />
        <About />
        <SeasonalOffer />
        <FeaturedProducts products={featuredProducts} />
        <OrderForm 
          products={products} 
          onOrderSubmit={handleOrderSubmit}
          orderSuccess={orderSuccess}
        />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
