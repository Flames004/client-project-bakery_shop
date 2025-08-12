import { useState, useEffect } from 'react';
import { productsApi, adminApi } from '../services/api';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeOrders: 0,
    totalProducts: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use adminApi for orders to ensure proper authentication
        const [ordersRes, productsRes] = await Promise.all([
          adminApi.getOrders(),
          productsApi.getAll()
        ]);
        
        const ordersData = ordersRes.data || [];
        const productsData = productsRes.data || [];
        
        console.log('Orders fetched:', ordersData);
        console.log('Products fetched:', productsData);
        
        setOrders(ordersData);
        setProducts(productsData);
        
        // Calculate stats
        const totalRevenue = ordersData.reduce((sum, order) => sum + (order.total || 0), 0);
        const activeOrders = ordersData.filter(order => order.status === 'pending').length;
        
        setStats({
          totalOrders: ordersData.length,
          totalRevenue,
          activeOrders,
          totalProducts: productsData.length
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.response?.data?.error || 'Failed to load dashboard data');
        
        // If authentication fails, redirect to login
        if (error.response?.status === 401) {
          window.location.href = '/admin-login';
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await adminApi.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      // Update stats after status change
      const activeOrders = orders.filter(order => 
        order.id === orderId ? newStatus === 'pending' : order.status === 'pending'
      ).length;
      
      setStats(prev => ({...prev, activeOrders}));
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update order status');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">
            Loading Admin Dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">Error Loading Dashboard</h2>
          <p className="error-message">{error}</p>
          <button 
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          🧈 Maakhan Bakers Admin Dashboard
        </h1>
        <p className="dashboard-subtitle">
          प्रबंधन पैनल (Management Panel)
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs">
        {[
          { id: 'overview', label: '📊 Overview', hindi: 'अवलोकन' },
          { id: 'orders', label: '📋 Orders', hindi: 'ऑर्डर' },
          { id: 'products', label: '🍯 Products', hindi: 'उत्पाद' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          >
            <div className="tab-label">{tab.label}</div>
            <div className="tab-hindi">({tab.hindi})</div>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="overview-tab">
          <div className="stats-grid">
            {[
              { 
                title: 'Total Orders', 
                hindi: 'कुल ऑर्डर', 
                value: stats.totalOrders, 
                icon: '📋',
                color: 'red'
              },
              { 
                title: 'Total Revenue', 
                hindi: 'कुल आय', 
                value: formatPrice(stats.totalRevenue), 
                icon: '💰',
                color: 'golden'
              },
              { 
                title: 'Active Orders', 
                hindi: 'सक्रिय ऑर्डर', 
                value: stats.activeOrders, 
                icon: '🔄',
                color: 'saffron'
              },
              { 
                title: 'Total Products', 
                hindi: 'कुल उत्पाद', 
                value: stats.totalProducts, 
                icon: '🍯',
                color: 'brown'
              }
            ].map((stat, index) => (
              <div key={index} className={`stat-card stat-${stat.color}`}>
                <div className="stat-icon">{stat.icon}</div>
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-title">{stat.title}</p>
                <p className="stat-hindi">({stat.hindi})</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="orders-tab">
          <h2 className="tab-title">
            📋 Order Management (ऑर्डर प्रबंधन)
          </h2>
          
          {orders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <p className="empty-text">
                No orders yet (अभी तक कोई ऑर्डर नहीं)
              </p>
            </div>
          ) : (
            <div className="orders-grid">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3 className="order-id">
                        Order #{order.reference || order.id}
                      </h3>
                      <div className="order-details">
                        <p><strong>Customer:</strong> {order.customer_name}</p>
                        <p><strong>Email:</strong> {order.customer_email}</p>
                        <p><strong>Phone:</strong> {order.customer_phone}</p>
                        <p><strong>Total:</strong> {formatPrice(order.total)}</p>
                        <p className="order-date">
                          <strong>Date:</strong> {formatDate(order.created_at)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="status-buttons">
                      {['pending', 'confirmed', 'ready', 'completed'].map(status => (
                        <button
                          key={status}
                          onClick={() => updateOrderStatus(order.id, status)}
                          className={`status-btn ${order.status === status ? 'active' : ''}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {order.notes && (
                    <div className="order-notes">
                      <strong>Notes:</strong>
                      <p>{order.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="products-tab">
          <h2 className="tab-title">
            🍯 Product Management (उत्पाद प्रबंधन)
          </h2>
          
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-header">
                  <h3 className="product-name">{product.name}</h3>
                  <span className={`product-badge ${product.is_featured ? 'featured' : ''}`}>
                    {product.is_featured ? '⭐ Featured' : 'Regular'}
                  </span>
                </div>
                
                <p className="product-description">{product.description}</p>
                
                <div className="product-footer">
                  <span className="product-price">
                    {formatPrice(product.price)}
                  </span>
                  <button className="edit-btn">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;