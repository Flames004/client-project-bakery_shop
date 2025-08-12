function SeasonalOffer() {
  return (
    <section style={{ 
      background: 'linear-gradient(135deg, var(--saffron), var(--golden))',
      padding: 'clamp(3rem, 6vw, 4rem) 0',
      textAlign: 'center'
    }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            backgroundColor: 'white', 
            borderRadius: '9999px', 
            padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 4vw, 1.5rem)', 
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            border: '2px solid var(--golden)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            <span style={{ 
              color: 'var(--deep-red)', 
              fontWeight: '600', 
              fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em'
            }}>
              🪔 दीवाली विशेष (Diwali Special) 🪔
            </span>
          </div>
          <h3 className="text-3xl mb-4" style={{ 
            fontFamily: 'Poppins', 
            fontWeight: 'bold', 
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            25% Off all Festival Sweets! �✨
          </h3>
          <p className="text-lg mb-6" style={{ 
            color: 'white', 
            width: '100%', 
            margin: '0 auto 1.5rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
          }}>
            Celebrate the Festival of Lights with authentic mithai, ghevar, and traditional sweets 
            made with pure desi ghee and blessed with Krishna's love.
          </p>
          <div className="flex flex-center" style={{ gap: '1rem', flexWrap: 'wrap', color: 'white' }}>
            <div className="flex" style={{ alignItems: 'center' }}>
              <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', color: 'var(--golden)' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              ₹500+ पर मुफ्त डिलीवरी (Free delivery)
            </div>
            <div className="flex" style={{ alignItems: 'center' }}>
              <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', color: 'var(--golden)' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Valid until Diwali week
            </div>
            <div className="flex" style={{ alignItems: 'center' }}>
              <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', color: 'var(--golden)' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              सीमित समय के लिए (Limited time)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeasonalOffer;
