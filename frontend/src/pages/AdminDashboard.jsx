import { useState, useEffect } from 'react';
import { ordersApi, productsApi, adminApi } from '../services/api';

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
        const [ordersRes, productsRes] = await Promise.all([
          ordersApi.getAll(),
          productsApi.getAll()
        ]);
        
        const ordersData = ordersRes.data || [];
        const productsData = productsRes.data || [];
        
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
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await ordersApi.updateStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--cream), var(--warm-white))'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid var(--golden)',
            borderTop: '4px solid var(--deep-red)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: 'var(--text-dark)', fontSize: '1.125rem' }}>
            Loading Admin Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, var(--cream), var(--warm-white))',
      padding: 'clamp(1rem, 3vw, 2rem)',
      width: '100%'
    }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, var(--deep-red), var(--saffron))',
        color: 'white',
        padding: 'clamp(1.5rem, 4vw, 2rem)',
        borderRadius: '1rem',
        marginBottom: '2rem',
        textAlign: 'center',
        boxShadow: '0 8px 25px rgba(139, 0, 0, 0.3)'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(1.75rem, 6vw, 2.5rem)', 
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          marginBottom: '0.5rem'
        }}>
          🧈 Maakhan Bakers Admin Dashboard
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 3vw, 1.125rem)', opacity: '0.9' }}>
          प्रबंधन पैनल (Management Panel)
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: 'clamp(0.5rem, 2vw, 1rem)', 
        marginBottom: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {[
          { id: 'overview', label: '📊 Overview', hindi: 'अवलोकन' },
          { id: 'orders', label: '📋 Orders', hindi: 'ऑर्डर' },
          { id: 'products', label: '🍯 Products', hindi: 'उत्पाद' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id 
                ? 'linear-gradient(135deg, var(--golden), var(--saffron))'
                : 'var(--warm-white)',
              color: activeTab === tab.id ? 'white' : 'var(--text-dark)',
              border: `2px solid ${activeTab === tab.id ? 'var(--golden)' : 'var(--border-gold)'}`,
              padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: 'clamp(0.75rem, 2.5vw, 1rem)',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              textShadow: activeTab === tab.id ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none',
              minWidth: 'clamp(100px, 20vw, 150px)',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'block' }}>
              {tab.label}
            </div>
            <div style={{ fontSize: '0.75em', opacity: '0.8' }}>
              ({tab.hindi})
            </div>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Stats Cards */}
            {[
              { 
                title: 'Total Orders', 
                hindi: 'कुल ऑर्डर', 
                value: stats.totalOrders, 
                icon: '📋',
                color: 'var(--deep-red)'
              },
              { 
                title: 'Total Revenue', 
                hindi: 'कुल आय', 
                value: formatPrice(stats.totalRevenue), 
                icon: '💰',
                color: 'var(--golden)'
              },
              { 
                title: 'Active Orders', 
                hindi: 'सक्रिय ऑर्डर', 
                value: stats.activeOrders, 
                icon: '🔄',
                color: 'var(--saffron)'
              },
              { 
                title: 'Total Products', 
                hindi: 'कुल उत्पाद', 
                value: stats.totalProducts, 
                icon: '🍯',
                color: 'var(--brown)'
              }
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  background: 'linear-gradient(145deg, var(--warm-white), var(--cream))',
                  border: '2px solid var(--border-gold)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  textAlign: 'center',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                  {stat.icon}
                </div>
                <h3 style={{ 
                  color: stat.color, 
                  fontSize: '2rem', 
                  fontWeight: 'bold',
                  marginBottom: '0.25rem'
                }}>
                  {stat.value}
                </h3>
                <p style={{ color: 'var(--text-dark)', fontSize: '1rem' }}>
                  {stat.title}
                </p>
                <p style={{ color: 'var(--text-dark)', fontSize: '0.875rem', opacity: '0.8' }}>
                  ({stat.hindi})
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          <h2 style={{ 
            color: 'var(--deep-red)', 
            marginBottom: '1.5rem',
            fontSize: '1.75rem',
            fontWeight: 'bold'
          }}>
            📋 Order Management (ऑर्डर प्रबंधन)
          </h2>
          
          {orders.length === 0 ? (
            <div style={{
              background: 'var(--warm-white)',
              border: '2px solid var(--border-gold)',
              borderRadius: '1rem',
              padding: '3rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
              <p style={{ color: 'var(--text-dark)', fontSize: '1.125rem' }}>
                No orders yet (अभी तक कोई ऑर्डर नहीं)
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {orders.map((order) => (
                <div
                  key={order.id}
                  style={{
                    background: 'linear-gradient(145deg, var(--warm-white), var(--cream))',
                    border: '2px solid var(--border-gold)',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <h3 style={{ 
                        color: 'var(--deep-red)', 
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                      }}>
                        Order #{order.reference || order.id}
                      </h3>
                      <p style={{ color: 'var(--text-dark)', marginBottom: '0.25rem' }}>
                        <strong>Customer:</strong> {order.customer_name}
                      </p>
                      <p style={{ color: 'var(--text-dark)', marginBottom: '0.25rem' }}>
                        <strong>Email:</strong> {order.customer_email}
                      </p>
                      <p style={{ color: 'var(--text-dark)', marginBottom: '0.25rem' }}>
                        <strong>Phone:</strong> {order.customer_phone}
                      </p>
                      <p style={{ color: 'var(--text-dark)', marginBottom: '0.25rem' }}>
                        <strong>Total:</strong> {formatPrice(order.total)}
                      </p>
                      <p style={{ color: 'var(--text-dark)', fontSize: '0.875rem' }}>
                        <strong>Date:</strong> {formatDate(order.created_at)}
                      </p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {['pending', 'confirmed', 'ready', 'completed'].map(status => (
                        <button
                          key={status}
                          onClick={() => updateOrderStatus(order.id, status)}
                          style={{
                            background: order.status === status 
                              ? 'linear-gradient(135deg, var(--golden), var(--saffron))'
                              : 'var(--warm-white)',
                            color: order.status === status ? 'white' : 'var(--text-dark)',
                            border: `2px solid ${order.status === status ? 'var(--golden)' : 'var(--border-gold)'}`,
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            textTransform: 'capitalize'
                          }}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {order.notes && (
                    <div style={{ 
                      marginTop: '1rem',
                      padding: '0.75rem',
                      background: 'var(--cream)',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border-gold)'
                    }}>
                      <strong style={{ color: 'var(--text-dark)' }}>Notes:</strong>
                      <p style={{ color: 'var(--text-dark)', marginTop: '0.25rem' }}>
                        {order.notes}
                      </p>
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
        <div>
          <h2 style={{ 
            color: 'var(--deep-red)', 
            marginBottom: '1.5rem',
            fontSize: '1.75rem',
            fontWeight: 'bold'
          }}>
            🍯 Product Management (उत्पाद प्रबंधन)
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  background: 'linear-gradient(145deg, var(--warm-white), var(--cream))',
                  border: '2px solid var(--border-gold)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ 
                    color: 'var(--deep-red)', 
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    flex: 1
                  }}>
                    {product.name}
                  </h3>
                  <span style={{
                    background: product.is_featured 
                      ? 'linear-gradient(135deg, var(--golden), var(--saffron))'
                      : 'var(--cream)',
                    color: product.is_featured ? 'white' : 'var(--text-dark)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    {product.is_featured ? '⭐ Featured' : 'Regular'}
                  </span>
                </div>
                
                <p style={{ 
                  color: 'var(--text-dark)', 
                  fontSize: '0.875rem',
                  marginBottom: '1rem',
                  lineHeight: '1.5'
                }}>
                  {product.description}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ 
                    color: 'var(--deep-red)', 
                    fontSize: '1.25rem',
                    fontWeight: 'bold'
                  }}>
                    {formatPrice(product.price)}
                  </span>
                  <button style={{
                    background: 'linear-gradient(135deg, var(--saffron), var(--golden))',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>
                    Edit
                  </button>
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