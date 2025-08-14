import React, { useState } from 'react';
import styles from './LoginCypher.module.css';

// 🎤 LoginCypher - The main authentication component
// Netflix-style full-bleed layout with hip-hop professional aesthetic
const LoginCypher = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // 🔒 Handle the login flow with proper validation
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // API call will go here - Lyricist handles the backend
      console.log('🎵 Dropping the login request...', credentials);
    } catch (error) {
      console.error('❌ Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginStage}>
      <div className={styles.backgroundVideo}>
        {/* Background video goes here */}
      </div>
      
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Claim Cipher</h1>
        <h2 className={styles.subtitle}>No Matter What</h2>
        
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            className={styles.input}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            className={styles.input}
            required
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className={styles.loginButton}
          >
            {loading ? '🎵 Dropping...' : '🎤 Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCypher;
