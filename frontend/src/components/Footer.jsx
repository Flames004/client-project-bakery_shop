function Footer() {
  return (
    <footer style={{ 
      background: 'linear-gradient(135deg, var(--brown), var(--deep-red))',
      color: 'var(--cream)', 
      padding: 'clamp(2rem, 5vw, 3rem) 0'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'clamp(1.5rem, 4vw, 2rem)'
        }}>
          {/* Brand */}
          <div>
            <h3 style={{ 
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              color: 'var(--golden)',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
              marginBottom: '1rem'
            }}>
              🧈 Maakhan Bakers 🧈
            </h3>
            <p style={{ 
              color: 'var(--cream)', 
              marginBottom: '0.5rem', 
              lineHeight: 1.6,
              fontSize: 'clamp(0.875rem, 2.5vw, 0.95rem)',
              fontStyle: 'italic'
            }}>
              मक्खन की मिठास, कृष्णा का प्रेम
            </p>
            <p style={{ 
              color: 'rgba(255,248,220,0.9)', 
              marginBottom: '1rem', 
              lineHeight: 1.6,
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)'
            }}>
              Traditional Indian bakery crafting divine sweets and authentic delicacies 
              inspired by the sacred tradition of maakhan beloved by Lord Krishna.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <a href="#" style={{ 
                color: 'var(--golden)', 
                transition: 'color 0.2s ease-in-out',
                textDecoration: 'none',
                padding: '0.5rem'
              }} aria-label="Facebook">
                <svg style={{ 
                  width: 'clamp(1.25rem, 3vw, 1.5rem)', 
                  height: 'clamp(1.25rem, 3vw, 1.5rem)' 
                }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" style={{ 
                color: 'var(--golden)', 
                transition: 'color 0.2s ease-in-out',
                textDecoration: 'none',
                padding: '0.5rem'
              }} aria-label="Instagram">
                <svg style={{ 
                  width: 'clamp(1.25rem, 3vw, 1.5rem)', 
                  height: 'clamp(1.25rem, 3vw, 1.5rem)' 
                }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ 
              color: 'var(--golden)',
              fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>संपर्क सूत्र (Contact Info)</h4>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.75rem', 
              color: 'var(--cream)',
              fontSize: 'clamp(0.875rem, 2.5vw, 0.95rem)'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--golden)', marginRight: '0.5rem' }}>📍</span>
                <div>
                  <div style={{ fontWeight: '500' }}>Gala No. 12, Padmavatai Park</div>
                  <div>Opposite Jalaram Temple, Dadra</div>
                  <div>UT of DNH & DD, India 🇮🇳</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'var(--golden)', marginRight: '0.5rem' }}>📞</span>
                <span>+91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'var(--golden)', marginRight: '0.5rem' }}>📧</span>
                <span>hello@maakhanbakers.in</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ 
              color: 'var(--golden)',
              fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>समय सारणी (Opening Hours)</h4>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.5rem', 
              color: 'var(--cream)',
              fontSize: 'clamp(0.875rem, 2.5vw, 0.95rem)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>सोमवार - शुक्रवार</span>
                <span>5:00 AM - 9:00 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>शनिवार (Saturday)</span>
                <span>5:00 AM - 10:00 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>रविवार (Sunday)</span>
                <span>6:00 AM - 8:00 PM</span>
              </div>
              <div style={{ 
                fontSize: 'clamp(0.75rem, 2vw, 0.8rem)', 
                marginTop: '0.5rem', 
                fontStyle: 'italic' 
              }}>
                🕉️ Special timings during festivals
              </div>
            </div>
            <div className="card" style={{ 
              marginTop: '1rem', 
              padding: 'clamp(0.5rem, 2vw, 0.75rem)', 
              background: 'linear-gradient(45deg, var(--saffron), var(--golden))',
              color: 'white'
            }}>
              <p style={{ 
                fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)', 
                fontWeight: '500',
                margin: 0
              }}>
                🛵 Dadra & Nagar Haveli में मुफ्त डिलीवरी!
              </p>
              <p style={{ 
                fontSize: 'clamp(0.7rem, 2vw, 0.75rem)', 
                margin: '0.25rem 0 0 0',
                opacity: 0.9
              }}>
                Free delivery in DNH & DD region
              </p>
            </div>
          </div>
        </div>

        <hr style={{ 
          border: 'none', 
          borderTop: '1px solid var(--border-gold)', 
          margin: 'clamp(1.5rem, 4vw, 2rem) 0' 
        }} />
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
          color: 'var(--cream)',
          gap: '1rem'
        }}>
          <p style={{ 
            textAlign: 'center', 
            margin: 0,
            fontStyle: 'italic'
          }}>
            "हर व्यंजन में भगवान का आशीर्वाद है" - Every delicacy is blessed by the divine 🙏
          </p>
          <p style={{ 
            textAlign: 'center', 
            margin: 0,
            opacity: 0.8
          }}>
            © 2024 Maakhan Bakers. All rights reserved. Made with ❤️ in Dadra & Nagar Haveli, India.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
