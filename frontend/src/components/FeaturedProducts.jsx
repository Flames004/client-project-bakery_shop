function FeaturedProducts({ products }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (
    <section id="products" className="section cream-bg">
      <div className="container">
        <div style={{ 
          textAlign: 'center', 
          marginBottom: 'clamp(2rem, 5vw, 3rem)'
        }}>
          <h2 style={{ 
            fontFamily: 'Poppins', 
            fontWeight: 'bold', 
            color: 'var(--deep-red)',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            🍯 Featured Products 🍯
          </h2>
          <p style={{ 
            fontSize: 'clamp(1rem, 3vw, 1.125rem)', 
            color: 'var(--text-dark)',
            marginBottom: '0.5rem'
          }}>
            Our handpicked selection of premium sweets and delicacies
          </p>
          <p style={{ 
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', 
            color: 'var(--text-dark)',
            fontStyle: 'italic',
            opacity: 0.8
          }}>
            हमारी विशेष मिठाइयों का संग्रह
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="card product-card"
            >
              <div style={{ 
                padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    gap: '0.5rem'
                  }}>
                    <h3 style={{ 
                      fontFamily: 'Poppins', 
                      fontWeight: '600', 
                      color: 'var(--deep-red)',
                      fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                      margin: 0,
                      lineHeight: '1.3',
                      flex: 1
                    }}>
                      {product.name}
                    </h3>
                    {product.is_featured && (
                      <span style={{
                        background: 'linear-gradient(135deg, var(--golden), var(--saffron))',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}>
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  
                  <p style={{ 
                    color: 'var(--text-dark)', 
                    fontSize: 'clamp(0.875rem, 2.5vw, 0.95rem)', 
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    opacity: 0.9
                  }}>
                    {product.description}
                  </p>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-gold)',
                  gap: '1rem'
                }}>
                  <span style={{ 
                    fontFamily: 'Poppins', 
                    fontWeight: 'bold', 
                    color: 'var(--deep-red)',
                    fontSize: 'clamp(1.25rem, 4vw, 1.5rem)'
                  }}>
                    {formatPrice(product.price)}
                  </span>
                  <button 
                    className="btn-secondary"
                    style={{
                      fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                      padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.25rem)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {products.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: 'var(--warm-white)',
            borderRadius: '1rem',
            border: '2px solid var(--border-gold)'
          }}>
            <div style={{ 
              fontSize: '4rem',
              marginBottom: '1rem',
              opacity: 0.5
            }}>
              🍯
            </div>
            <p style={{ 
              color: 'var(--text-dark)',
              fontSize: '1.125rem',
              margin: 0
            }}>
              No featured products available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
