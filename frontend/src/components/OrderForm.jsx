import { useState } from 'react';

function OrderForm({ products, onOrderSubmit, orderSuccess }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: ''
  });
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const addOrderItem = () => {
    setOrderItems([...orderItems, { productId: '', quantity: 1 }]);
  };

  const removeOrderItem = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const updateOrderItem = (index, field, value) => {
    const updatedItems = orderItems.map((item, i) => 
      i === index ? { ...item, [field]: field === 'quantity' ? parseInt(value) || 1 : value } : item
    );
    setOrderItems(updatedItems);
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      const product = products.find(p => p.id === parseInt(item.productId));
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Email is invalid';
    }
    
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone number is required';
    }
    
    if (orderItems.length === 0) {
      newErrors.items = 'At least one item is required';
    }
    
    const invalidItems = orderItems.filter(item => !item.productId || item.quantity < 1);
    if (invalidItems.length > 0) {
      newErrors.items = 'Please select valid products and quantities';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const orderData = {
        ...formData,
        items: orderItems.map(item => ({
          productId: parseInt(item.productId),
          quantity: item.quantity
        }))
      };
      
      await onOrderSubmit(orderData);
      
      // Reset form
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        notes: ''
      });
      setOrderItems([]);
      setErrors({});
      
    } catch (error) {
      console.error('Order submission error:', error);
      setErrors({ submit: 'Failed to place order. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (orderSuccess) {
    return (
      <section id="order-form" className="section white-bg">
        <div className="container" style={{ width: '100%' }}>
          <div className="text-center">
            <div className="card p-8 mb-8" style={{ 
              background: 'linear-gradient(145deg, #dcfce7, #bbf7d0)', 
              border: '3px solid var(--golden)',
              boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)'
            }}>
              <div style={{ color: 'var(--deep-red)', marginBottom: '1rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, var(--golden), var(--saffron))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  border: '3px solid var(--deep-red)',
                  fontSize: '2rem'
                }}>
                  ✅
                </div>
              </div>
              <h3 className="text-3xl mb-4" style={{ 
                fontFamily: 'Poppins', 
                fontWeight: 'bold', 
                color: 'var(--deep-red)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}>
                🎉 ऑर्डर सफलतापूर्वक दिया गया! (Order Placed Successfully!)
              </h3>
              <p className="text-lg mb-4" style={{ color: 'var(--text-dark)' }}>
                धन्यवाद! आपका ऑर्डर रेफरेंस नंबर है: (Thank you! Your order reference number is:)
              </p>
              <div className="card p-4 mb-4" style={{ 
                background: 'linear-gradient(145deg, var(--warm-white), var(--cream))', 
                border: '2px solid var(--golden)',
                display: 'inline-block',
                borderRadius: '0.75rem'
              }}>
                <span style={{ 
                  fontFamily: 'monospace', 
                  fontSize: '1.75rem', 
                  fontWeight: 'bold', 
                  color: 'var(--deep-red)',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                }}>
                  {orderSuccess.reference}
                </span>
              </div>
              <div style={{ 
                background: 'linear-gradient(135deg, var(--saffron), var(--golden))',
                color: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                margin: '1rem 0',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0' }}>
                  कुल राशि (Total): {formatPrice(orderSuccess.total)}
                </p>
              </div>
              <p style={{ color: 'var(--text-dark)', fontSize: '1rem', marginTop: '1rem' }}>
                🕐 हमारी टीम जल्द ही आपसे संपर्क करेगी। (Our team will contact you shortly.)
              </p>
              <p style={{ color: 'var(--text-dark)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                🧈 मक्खन की मिठास के साथ तैयार किया जाएगा। (Prepared with the sweetness of maakhan.)
              </p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary"
              style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}
            >
              🛒 नया ऑर्डर दें (Place New Order)
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="order-form" className="section white-bg">
      <div className="container" style={{ width: '100%' }}>
        <div className="text-center mb-8">
          <h2 className="heading-2 mb-4" style={{ color: 'var(--deep-red)' }}>
            🛒 अपना ऑर्डर दें (Place Your Order)
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-dark)', width: '100%', margin: '0 auto' }}>
            Divine delights await! Fill out the form below and we'll prepare your 
            authentic Indian sweets and treats with love and devotion.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card" style={{ 
          padding: 'clamp(1rem, 4vw, 2rem)',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Customer Information */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ 
              color: 'var(--deep-red)', 
              fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
              marginBottom: '1rem',
              fontFamily: 'Poppins',
              fontWeight: '600'
            }}>
              📝 Contact Information (संपर्क जानकारी)
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'clamp(1rem, 3vw, 1.5rem)'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--text-dark)',
                  fontWeight: '500',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'
                }}>
                  Full Name * (पूरा नाम)
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: 'clamp(0.75rem, 2vw, 1rem)',
                    border: `2px solid ${errors.customerName ? '#DC2626' : 'var(--border-gold)'}`,
                    borderRadius: '0.5rem',
                    fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                    backgroundColor: 'var(--warm-white)',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="John Doe"
                />
                {errors.customerName && (
                  <p style={{ color: '#DC2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.customerName}
                  </p>
                )}
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--text-dark)',
                  fontWeight: '500',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'
                }}>
                  Email Address * (ईमेल पता)
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: 'clamp(0.75rem, 2vw, 1rem)',
                    border: `2px solid ${errors.customerEmail ? '#DC2626' : 'var(--border-gold)'}`,
                    borderRadius: '0.5rem',
                    fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                    backgroundColor: 'var(--warm-white)',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="john@example.com"
                />
                {errors.customerEmail && (
                  <p style={{ color: '#DC2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.customerEmail}
                  </p>
                )}
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--text-dark)',
                  fontWeight: '500',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'
                }}>
                  Phone Number * (फोन नंबर)
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  className={`form-input ${errors.customerPhone ? 'error' : ''}`}
                  placeholder="(555) 123-4567"
                />
                {errors.customerPhone && (
                  <p className="error-message">{errors.customerPhone}</p>
                )}
              </div>
              <div>
                <label className="form-label">
                  Special Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="form-input"
                  placeholder="Any special requests or dietary requirements..."
                />
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 className="heading-3" style={{ color: '#4a3f35' }}>
                Order Items
              </h3>
              <button
                type="button"
                onClick={addOrderItem}
                className="btn-secondary"
                style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
              >
                Add Item
              </button>
            </div>
            
            {orderItems.length === 0 && (
              <div className="text-center" style={{ padding: '2rem 0', color: '#6b7280' }}>
                <p>No items added yet. Click "Add Item" to start your order.</p>
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orderItems.map((item, index) => (
                <div key={index} className="card" style={{ padding: '1rem' }}>
                  <div className="grid grid-2" style={{ gap: '1rem', alignItems: 'end' }}>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label className="form-label">
                        Product
                      </label>
                      <select
                        value={item.productId}
                        onChange={(e) => updateOrderItem(index, 'productId', e.target.value)}
                        className="form-input"
                      >
                        <option value="">Select a product</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name} - {formatPrice(product.price)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="form-label">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateOrderItem(index, 'quantity', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => removeOrderItem(index)}
                        className="btn-danger"
                        style={{ width: '100%' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {errors.items && (
              <p className="error-message" style={{ marginTop: '0.5rem' }}>{errors.items}</p>
            )}
          </div>

          {/* Order Total */}
          {orderItems.length > 0 && (
            <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem', border: '2px solid #4a3f35' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="heading-3" style={{ color: '#4a3f35' }}>
                  Total:
                </span>
                <span style={{ 
                  fontFamily: 'Poppins', 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: '#4a3f35' 
                }}>
                  {formatPrice(calculateTotal())}
                </span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            {errors.submit && (
              <p className="error-message" style={{ marginBottom: '1rem' }}>{errors.submit}</p>
            )}
            <button
              type="submit"
              disabled={loading || orderItems.length === 0}
              className={`btn-primary ${loading || orderItems.length === 0 ? 'disabled' : ''}`}
              style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <svg style={{ 
                    width: '1.25rem', 
                    height: '1.25rem', 
                    marginRight: '0.75rem',
                    animation: 'spin 1s linear infinite'
                  }} fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Placing Order...
                </span>
              ) : (
                'Place Order'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default OrderForm;
