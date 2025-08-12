function Logo({ size = 'medium' }) {
  const sizes = {
    small: { width: '60px', height: '60px', fontSize: '1.5rem' },
    medium: { width: '80px', height: '80px', fontSize: '2rem' },
    large: { width: '120px', height: '120px', fontSize: '3rem' }
  };

  const currentSize = sizes[size];

  return (
    <div style={{
      width: currentSize.width,
      height: currentSize.height,
      background: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #8B0000 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      border: '3px solid #FFD700',
      boxShadow: '0 8px 16px rgba(255, 215, 0, 0.3)',
      overflow: 'hidden'
    }}>
      {/* Peacock Feather Design */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: currentSize.fontSize,
        color: '#2E8B57',
        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
      }}>
        🪶
      </div>
      
      {/* Matki (Clay Pot) */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: size === 'large' ? '2rem' : size === 'medium' ? '1.5rem' : '1rem',
        color: '#8B4513',
        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
      }}>
        🏺
      </div>
      
      {/* Maakhan (Butter) flowing effect */}
      <div style={{
        position: 'absolute',
        bottom: '30%',
        left: '55%',
        transform: 'translateX(-50%)',
        fontSize: size === 'large' ? '1.5rem' : size === 'medium' ? '1rem' : '0.8rem',
        color: '#FFFACD',
        animation: 'flow 2s ease-in-out infinite',
        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
      }}>
        🧈
      </div>

      {/* Divine glow effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.2) 0%, transparent 70%)',
        borderRadius: '50%'
      }}></div>
    </div>
  );
}

export default Logo;
