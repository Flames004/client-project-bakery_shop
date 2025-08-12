import { useState, useEffect } from 'react';
import { adminApi } from '../services/api';
import Logo from '../components/Logo';

function AdminLoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if already logged in
    const checkAuth = async () => {
      try {
        await adminApi.getCurrentUser();
        window.location.href = '/admin-dashboard';
      } catch (error) {
        // Not logged in, stay on login page
      }
    };
    checkAuth();
  }, []);

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
      await adminApi.login(credentials);
      window.location.href = '/admin-dashboard';
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <div className="login-logo">
              <Logo size="medium" />
            </div>
            <h1 className="login-title">
              🧈 Admin Login
            </h1>
            <p className="login-subtitle">
              प्रबंधन लॉगिन (Management Login)
            </p>
          </div>

          {/* Demo Credentials Info */}
          <div className="demo-info">
            <h3>📋 Demo Credentials:</h3>
            <p><strong>Email:</strong> admin@sweetcrumbs.demo</p>
            <p><strong>Password:</strong> DemoAdmin123!</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                📧 Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                🔐 Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="login-spinner"></div>
                  Logging in...
                </>
              ) : (
                <>
                  🚪 Login to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <p>
              <a href="/" className="back-link">
                ← Back to Website
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
