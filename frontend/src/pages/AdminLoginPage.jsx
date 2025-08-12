import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function AdminLoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    const checkAuth = async () => {
      try {
        await api.get('/admin/me');
        navigate('/admin/dashboard');
      } catch (error) {
        // Not logged in, stay on login page
      }
    };
    checkAuth();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/admin/login', credentials);
      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--cream), var(--warm-white))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(1rem, 3vw, 1.5rem)'
    }}>
      <div style={{ 
        maxWidth: '450px', 
        width: '100%',
        margin: '0 auto'
      }}>
        {/* Back to home link */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <a 
            href="/" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              color: 'var(--deep-red)', 
              textDecoration: 'none',
              transition: 'color 0.2s ease-in-out',
              fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
              fontWeight: '500'
            }}
          >
            <svg style={{ 
              width: 'clamp(1rem, 3vw, 1.25rem)', 
              height: 'clamp(1rem, 3vw, 1.25rem)', 
              marginRight: '0.5rem' 
            }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Maakhan Bakers 🧈
          </a>
        </div>

        <div className="card" style={{ 
          padding: 'clamp(1.5rem, 4vw, 2rem)',
          boxShadow: '0 10px 25px rgba(139, 0, 0, 0.15)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ 
              color: 'var(--deep-red)',
              fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              fontFamily: 'Poppins'
            }}>
              🧈 Admin Login 🧈
            </h1>
            <p style={{ color: 'var(--text-dark)' }}>
              Access the Maakhan Bakers admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label className="form-label">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="admin@maakhanbakers.in"
              />
            </div>

            <div>
              <label className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="card" style={{ 
                backgroundColor: '#fef2f2', 
                border: '2px solid #fecaca',
                padding: '0.75rem'
              }}>
                <p style={{ color: '#991b1b', fontSize: '0.875rem', margin: 0 }}>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`btn-primary ${loading ? 'disabled' : ''}`}
              style={{ width: '100%' }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg style={{ 
                    width: '1.25rem', 
                    height: '1.25rem', 
                    marginRight: '0.75rem',
                    animation: 'spin 1s linear infinite'
                  }} fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
            <p>Secure admin access for Maakhan Bakers management.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
