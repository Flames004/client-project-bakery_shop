function Hero() {
  const scrollToOrderForm = () => {
    document.getElementById('order-form')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section id="home" className="hero-section">
      <div style={{ 
        textAlign: 'center', 
        width: '100%', 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(1rem, 3vw, 2rem)',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Hero Logo */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: 'clamp(2rem, 5vw, 3rem)'
        }}>
          <div style={{
            width: 'clamp(100px, 20vw, 140px)',
            height: 'clamp(100px, 20vw, 140px)',
            background: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #8B0000 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            border: '4px solid #FFD700',
            boxShadow: '0 12px 24px rgba(255, 215, 0, 0.4)',
            animation: 'gentlePulse 3s ease-in-out infinite',
            overflow: 'hidden'
          }}>
            {/* Peacock Feather */}
            <div style={{
              position: 'absolute',
              top: '15%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 'clamp(2rem, 8vw, 3rem)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
            }}>
              🪶
            </div>
            
            {/* Matki (Clay Pot) */}
            <div style={{
              position: 'absolute',
              bottom: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 'clamp(1.5rem, 6vw, 2rem)',
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))'
            }}>
              🏺
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 style={{ 
          fontFamily: 'Poppins', 
          fontWeight: 'bold', 
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          marginBottom: '1rem',
          textShadow: '3px 3px 6px rgba(0,0,0,0.5)',
          background: 'linear-gradient(135deg, #FFD700, #FFF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: '1.1'
        }}>
          🧈 Maakhan Bakers 🧈
        </h1>

        {/* Subtitle */}
        <h2 style={{ 
          fontFamily: 'Poppins', 
          fontWeight: '500',
          fontSize: 'clamp(1.25rem, 4vw, 2rem)',
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          color: '#FFF8DC'
        }}>
          मक्खन की मिठास, पारंपरिक स्वाद
        </h2>

        {/* Description */}
        <p style={{ 
          fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
          marginBottom: 'clamp(2rem, 5vw, 3rem)',
          maxWidth: '800px',
          margin: '0 auto clamp(2rem, 5vw, 3rem) auto',
          lineHeight: '1.6',
          textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
          color: '#FFFACD',
          opacity: 0.95
        }}>
          Divine sweets, fresh breads, and traditional delicacies made with pure desi ghee 
          and blessed with the sacred tradition of Lord Krishna's beloved maakhan.
        </p>

        {/* CTA Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: 'clamp(1rem, 3vw, 1.5rem)', 
          justifyContent: 'center',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <button 
            onClick={scrollToOrderForm}
            className="btn-primary"
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.125rem)',
              padding: 'clamp(0.75rem, 3vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
            }}
          >
            🛒 Order Fresh Sweets
          </button>
          
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary"
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.125rem)',
              padding: 'clamp(0.75rem, 3vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
            }}
          >
            📖 Our Story
          </button>
        </div>

        {/* Floating Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          opacity: 0.3,
          animation: 'float 6s ease-in-out infinite'
        }}>
          🍯
        </div>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          opacity: 0.3,
          animation: 'float 8s ease-in-out infinite reverse'
        }}>
          🥛
        </div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '20%',
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          opacity: 0.2,
          animation: 'float 7s ease-in-out infinite'
        }}>
          🏺
        </div>
      </div>
    </section>
  );
}

export default Hero;
