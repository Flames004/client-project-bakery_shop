function Hero() {
  const scrollToOrderForm = () => {
    document.getElementById('order-form').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section id="home" className="hero-section" style={{
      minHeight: '100vh',
      background: 'linear-gradient(rgba(139, 0, 0, 0.3), rgba(255, 107, 53, 0.2)), url("https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      width: '100%',
      margin: 0,
      padding: 0
    }}>
      {/* Content */}
      <div style={{ 
        textAlign: 'center', 
        width: '100%', 
        padding: '0 1rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Logo */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '2rem' 
        }}>
          <div style={{
            width: 'clamp(80px, 15vw, 120px)',
            height: 'clamp(80px, 15vw, 120px)',
            background: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #8B0000 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            border: '4px solid #FFD700',
            boxShadow: '0 12px 24px rgba(255, 215, 0, 0.4)',
            overflow: 'hidden'
          }}>
            {/* Peacock Feather Design */}
            <div style={{
              position: 'absolute',
              top: '15%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: '#2E8B57',
              textShadow: '2px 2px 4px rgba(0,0,0,0.4)'
            }}>
              🪶
            </div>
            
            {/* Matki (Clay Pot) */}
            <div style={{
              position: 'absolute',
              bottom: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 'clamp(1.25rem, 3vw, 2rem)',
              color: '#8B4513',
              textShadow: '2px 2px 4px rgba(0,0,0,0.4)'
            }}>
              🏺
            </div>

            {/* Divine glow effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>
          </div>
        </div>

        <h1 style={{ 
          fontSize: 'clamp(2rem, 8vw, 4rem)', 
          fontWeight: 'bold', 
          marginBottom: '1rem', 
          lineHeight: '1.1',
          background: 'linear-gradient(45deg, #FFD700, #FF6B35)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          🧈 Maakhan Bakers 🧈
        </h1>
        <p style={{ 
          fontSize: 'clamp(1rem, 4vw, 1.5rem)', 
          fontWeight: '400', 
          marginBottom: '0.5rem', 
          color: '#FFD700',
          fontStyle: 'italic'
        }}>
          मक्खन की मिठास, कृष्णा का प्रेम
        </p>
        <p style={{ 
          fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', 
          marginBottom: '0.5rem', 
          color: '#FFF8DC',
          fontWeight: '300'
        }}>
          (Sweetness of Maakhan, Love of Krishna)
        </p>
        <p style={{ 
          fontSize: 'clamp(1rem, 4vw, 1.25rem)', 
          marginBottom: '2rem', 
          color: '#FFF8DC', 
          opacity: '0.95', 
          width: '100%', 
          margin: '0 auto 2rem',
          lineHeight: '1.6'
        }}>
          Traditional Indian bakery crafting divine sweets, fresh breads, and authentic delicacies inspired by the sacred tradition of maakhan beloved by Lord Krishna.
        </p>
        <button 
          onClick={scrollToOrderForm}
          className="btn-primary"
          style={{ 
            fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
            padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            border: '2px solid #FFD700',
            maxWidth: '300px',
            width: '100%'
          }}
        >
          🛒 Order Divine Delights
        </button>
      </div>
      
      {/* Scroll indicator */}
      <div style={{ 
        position: 'absolute', 
        bottom: '2rem', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        color: 'white', 
        animation: 'bounce 2s infinite',
        display: 'block'
      }}>
        <svg style={{ 
          width: 'clamp(1rem, 3vw, 1.5rem)', 
          height: 'clamp(1rem, 3vw, 1.5rem)' 
        }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

export default Hero;
