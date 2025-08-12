function FeaturedProducts({ products }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (
    <section id="products" className="section cream-bg" style={{ padding: 'clamp(2rem, 5vw, 4rem) 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: 'clamp(2rem, 5vw, 3rem)'
        }}>
          <h2 style={{ 
            fontFamily: 'Poppins', 
            fontWeight: 'bold', 
            color: 'var(--deep-red)',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            marginBottom: '1rem'
          }}>
            🍯 Featured Delights (मुख्य व्यंजन)
          </h2>
          <p style={{ 
            color: 'var(--text-dark)', 
            fontSize: 'clamp(1rem, 3vw, 1.125rem)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Our most beloved creations, baked fresh daily with premium ingredients 
            and served with a sprinkle of love.
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(1rem, 3vw, 2rem)',
          padding: '0 1rem'
        }}>
          {products.map((product) => (
            <div 
              key={product.id} 
              className="card" 
              style={{ 
                transition: 'transform 0.3s, box-shadow 0.3s',
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div>
                <h3 style={{ 
                  fontFamily: 'Poppins', 
                  fontWeight: '600', 
                  color: 'var(--deep-red)',
                  fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                  marginBottom: '0.75rem'
                }}>
                  {product.name}
                </h3>
                <p style={{ 
                  color: 'var(--text-dark)', 
                  fontSize: 'clamp(0.875rem, 2.5vw, 0.95rem)', 
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  {product.description}
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <span style={{ 
                  fontWeight: 'bold', 
                  color: 'var(--golden)',
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
                }}>
                  {formatPrice(product.price)}
                </span>
                <button 
                  className="btn-primary" 
                  style={{ 
                    fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)', 
                    padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem)',
                    minWidth: '100px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center p-8">
            <div style={{ color: '#9ca3af', marginBottom: '1rem' }}>
              <svg style={{ width: '4rem', height: '4rem', margin: '0 auto' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p style={{ color: '#6b5b73' }}>No featured products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
