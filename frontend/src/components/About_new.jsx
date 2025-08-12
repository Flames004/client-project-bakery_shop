function About() {
  return (
    <section id="about" className="section" style={{ 
      background: 'var(--warm-white)'
    }}>
      <div className="container">
        <div className="features-grid">
          <div>
            <h2 style={{ 
              fontFamily: 'Poppins', 
              fontWeight: 'bold', 
              color: 'var(--deep-red)',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              marginBottom: '1.5rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>
              🕉️ हमारी कहानी (Our Legacy)
            </h2>
            <p style={{ 
              color: 'var(--text-dark)', 
              lineHeight: '1.8',
              fontSize: 'clamp(1rem, 3vw, 1.125rem)',
              marginBottom: '1.5rem',
              opacity: 0.9
            }}>
              At Maakhan Bakers, we honor the sacred tradition of maakhan (butter) that was dear to Lord Krishna. 
              Our master halwais (confectioners) begin their day at Brahma Muhurta (dawn) to craft authentic Indian 
              sweets, fresh breads, and divine delicacies using traditional recipes passed down through generations.
            </p>
            <p style={{ 
              color: 'var(--text-dark)', 
              lineHeight: '1.8',
              fontSize: 'clamp(1rem, 3vw, 1.125rem)',
              marginBottom: '2rem',
              opacity: 0.9
            }}>
              From royal ghevar and creamy rasmalai to fresh rotis and aromatic kulchas, every creation is blessed 
              with devotion and prepared with the finest desi ghee, pure milk, and premium ingredients sourced 
              from local farmers.
            </p>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 'clamp(1rem, 3vw, 1.5rem)',
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <div className="stat-highlight">
                <div style={{ 
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 'bold',
                  color: 'var(--saffron)',
                  marginBottom: '0.5rem'
                }}>
                  25+
                </div>
                <p style={{ 
                  color: 'var(--text-dark)', 
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                  margin: 0,
                  opacity: 0.8
                }}>
                  Years Legacy<br/>वर्षों की विरासत
                </p>
              </div>
              
              <div className="stat-highlight">
                <div style={{ 
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 'bold',
                  color: 'var(--saffron)',
                  marginBottom: '0.5rem'
                }}>
                  50+
                </div>
                <p style={{ 
                  color: 'var(--text-dark)', 
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                  margin: 0,
                  opacity: 0.8
                }}>
                  Sweet Varieties<br/>मिठाइयों के प्रकार
                </p>
              </div>
              
              <div className="stat-highlight">
                <div style={{ 
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 'bold',
                  color: 'var(--saffron)',
                  marginBottom: '0.5rem'
                }}>
                  1000+
                </div>
                <p style={{ 
                  color: 'var(--text-dark)', 
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                  margin: 0,
                  opacity: 0.8
                }}>
                  Happy Families<br/>संतुष्ट परिवार
                </p>
              </div>
            </div>
          </div>

          <div style={{ 
            position: 'relative',
            textAlign: 'center'
          }}>
            <div className="feature-highlight" style={{
              background: 'linear-gradient(145deg, var(--cream), var(--warm-white))',
              border: '2px solid var(--border-gold)',
              borderRadius: '1.5rem',
              padding: 'clamp(2rem, 5vw, 3rem)',
              boxShadow: '0 8px 25px rgba(139, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                fontSize: '2rem',
                opacity: 0.3
              }}>
                🏺
              </div>
              
              <div style={{ 
                fontSize: 'clamp(4rem, 8vw, 6rem)',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, var(--golden), var(--saffron))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
              }}>
                🧈
              </div>
              <h3 style={{ 
                color: 'var(--deep-red)', 
                fontWeight: 'bold',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                marginBottom: '1rem'
              }}>
                Fresh Daily Since 1999
              </h3>
              <p style={{ 
                color: 'var(--text-dark)', 
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                lineHeight: '1.6',
                margin: 0,
                opacity: 0.9
              }}>
                Every morning brings fresh maakhan, warm rotis, and divine sweets made with love and tradition.
                <br/><br/>
                <em style={{ color: 'var(--saffron)', fontStyle: 'italic' }}>
                  "मक्खन से मिली है मिठास, यही है हमारी पहचान"
                </em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
