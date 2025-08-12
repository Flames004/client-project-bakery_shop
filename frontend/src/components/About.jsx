function About() {
  return (
    <section id="about" className="section" style={{ 
      background: 'var(--warm-white)',
      padding: 'clamp(3rem, 6vw, 4rem) 0'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ 
              fontFamily: 'Poppins', 
              fontWeight: 'bold', 
              color: 'var(--deep-red)',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              marginBottom: '1.5rem'
            }}>
              🕉️ हमारी कहानी (Our Legacy)
            </h2>
            <p style={{ 
              color: 'var(--text-dark)', 
              lineHeight: '1.8',
              fontSize: 'clamp(1rem, 3vw, 1.125rem)',
              marginBottom: '1.5rem'
            }}>
              At Maakhan Bakers, we honor the sacred tradition of maakhan (butter) that was dear to Lord Krishna. 
              Our master halwais (confectioners) begin their day at Brahma Muhurta (dawn) to craft authentic Indian 
              sweets, fresh breads, and divine delicacies using traditional recipes passed down through generations.
            </p>
            <p style={{ 
              color: 'var(--text-dark)', 
              lineHeight: '1.8',
              fontSize: 'clamp(1rem, 3vw, 1.125rem)',
              marginBottom: '2rem'
            }}>
              From royal ghevar and creamy rasmalai to fresh rotis and aromatic kulchas, every creation is blessed 
              with devotion and prepared with the finest desi ghee, pure milk, and premium ingredients sourced 
              from local farmers.
            </p>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: 'clamp(1rem, 3vw, 2rem)',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ 
                  fontWeight: 'bold', 
                  color: 'var(--saffron)',
                  fontSize: 'clamp(2rem, 5vw, 3rem)'
                }}>25+</div>
                <div style={{ 
                  color: 'var(--text-dark)',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                  fontWeight: '500'
                }}>वर्षों का अनुभव</div>
                <div style={{ 
                  color: 'var(--brown)', 
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)'
                }}>Years Experience</div>
              </div>
              <div>
                <div style={{ 
                  fontWeight: 'bold', 
                  color: 'var(--saffron)',
                  fontSize: 'clamp(2rem, 5vw, 3rem)'
                }}>5000+</div>
                <div style={{ 
                  color: 'var(--text-dark)',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                  fontWeight: '500'
                }}>खुश ग्राहक</div>
                <div style={{ 
                  color: 'var(--brown)', 
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)'
                }}>Happy Families</div>
              </div>
              <div>
                <div style={{ 
                  fontWeight: 'bold', 
                  color: 'var(--saffron)',
                  fontSize: 'clamp(2rem, 5vw, 3rem)'
                }}>100+</div>
                <div style={{ 
                  color: 'var(--text-dark)',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                  fontWeight: '500'
                }}>पारंपरिक व्यंजन</div>
                <div style={{ 
                  color: 'var(--brown)', 
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)'
                }}>Traditional Recipes</div>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop" 
              alt="Traditional Indian sweets being made"
              className="rounded-2xl shadow-xl"
              style={{ width: '100%' }}
            />
            <div className="card p-6" style={{ 
              position: 'absolute', 
              bottom: '-1.5rem', 
              left: '-1.5rem', 
              background: 'linear-gradient(45deg, var(--golden), var(--saffron))',
              boxShadow: '0 20px 25px rgba(0, 0, 0, 0.2)',
              color: 'white'
            }}>
              <div className="text-xl" style={{ fontFamily: 'Poppins', fontWeight: '600' }}>
                🌅 प्रतिदिन ताज़ा
              </div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem' }}>
                Fresh Daily with Divine Blessings
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
