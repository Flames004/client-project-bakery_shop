import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(255, 248, 220, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-gold)',
      padding: '0.75rem 0'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 clamp(1rem, 3vw, 2rem)'
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: 'clamp(35px, 7vw, 45px)',
            height: 'clamp(35px, 7vw, 45px)',
            background: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #8B0000 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            border: '2px solid #FFD700',
            boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)'
          }}>
            <span style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: '#2E8B57'
            }}>🪶</span>
            <span style={{
              position: 'absolute',
              bottom: '20%',
              fontSize: 'clamp(0.75rem, 2vw, 1rem)',
              color: '#8B4513'
            }}>🏺</span>
          </div>
          <div>
            <h1 style={{
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              color: 'var(--deep-red)',
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              margin: 0,
              lineHeight: 1.2
            }}>
              🧈 Maakhan Bakers
            </h1>
            <p style={{
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
              color: 'var(--brown)',
              margin: 0,
              fontStyle: 'italic'
            }}>
              मक्खन की मिठास
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(0.75rem, 2vw, 1.5rem)'
        }}>
          {/* Home Link */}
          <a 
            href="#home" 
            style={{
              color: 'var(--text-dark)',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
              transition: 'color 0.3s ease',
              display: 'none'
            }}
            className="nav-link"
          >
            Home
          </a>
          
          {/* Order Link */}
          <a 
            href="#order-form" 
            style={{
              color: 'var(--text-dark)',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
              transition: 'color 0.3s ease',
              display: 'none'
            }}
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('order-form')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            Order Now
          </a>

          {/* Admin Login Button */}
          <button
            onClick={() => navigate('/admin/login')}
            style={{
              background: 'linear-gradient(135deg, var(--saffron), var(--golden))',
              color: 'white',
              border: 'none',
              padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1.25rem)',
              borderRadius: '0.5rem',
              fontWeight: '600',
              fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 53, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(255, 107, 53, 0.3)';
            }}
          >
            👨‍💼 Admin Login
          </button>
        </nav>
      </div>

      {/* Mobile Navigation Enhancement */}
      <style jsx>{`
        @media (min-width: 768px) {
          .nav-link {
            display: block !important;
          }
        }
        
        .nav-link:hover {
          color: var(--saffron) !important;
        }
      `}</style>
    </header>
  );
}

export default Header;
