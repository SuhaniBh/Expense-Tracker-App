import React, { useState } from 'react';
import styled from "styled-components";
import bg from '../../img/bg.png';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../styles/Layouts';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate authentication delay
    setTimeout(() => {
      setLoading(false);
      
      // Accept any credentials and set authentication flag
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('userEmail', email);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <LoginStyled bg={bg}>
      <MainLayout>
        <div className="login-content">
          <div className="login-form">
            <div className="logo">
              <h1>Your Money</h1>
            </div>
            <h2>Welcome Back</h2>
            <p className="subtitle">Sign in to access your financial dashboard</p>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@example.com"
                  required
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <div className="forgot-password">
                  <a href="#">Forgot password?</a>
                </div>
              </div>
              <button 
                type="submit" 
                className="login-btn"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            
            <div className="register-prompt">
              <p>Don't have an account? <a href="#">Register</a></p>
            </div>
          </div>
          
          <div className="login-image">
            <div className="feature-card">
              <h3>Track Your Finances</h3>
              <p>Gain insights into your spending habits and income sources</p>
            </div>
            <div className="feature-card">
              <h3>Plan For The Future</h3>
              <p>Set financial goals and track your progress</p>
            </div>
            <div className="feature-card">
              <h3>Secure & Private</h3>
              <p>Your financial data is encrypted and never shared</p>
            </div>
          </div>
        </div>
      </MainLayout>
    </LoginStyled>
  );
}

const LoginStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .login-content {
    display: flex;
    width: 100%;
    height: 80vh;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow: hidden;
  }
  
  .login-form {
    flex: 1;
    padding: 3rem;
    display: flex;
    flex-direction: column;
  }
  
  .logo {
    margin-bottom: 2rem;
  }
  
  .logo h1 {
    color: rgba(34, 34, 96, 1);
    font-size: 2rem;
  }
  
  h2 {
    color: rgba(34, 34, 96, 1);
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    color: rgba(34, 34, 96, 0.6);
    margin-bottom: 2rem;
  }
  
  .error-message {
    background-color: rgba(255, 77, 77, 0.1);
    color: #ff4d4d;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    border-left: 4px solid #ff4d4d;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 400px;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  label {
    color: rgba(34, 34, 96, 0.8);
    font-size: 0.9rem;
  }
  
  input {
    padding: 1rem;
    border-radius: 10px;
    border: 2px solid rgba(34, 34, 96, 0.2);
    background: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  input:focus {
    border-color: rgba(34, 34, 96, 0.6);
    outline: none;
  }
  
  .forgot-password {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
  }
  
  .forgot-password a {
    color: rgba(34, 34, 96, 0.8);
    font-size: 0.9rem;
    text-decoration: none;
  }
  
  .forgot-password a:hover {
    text-decoration: underline;
  }
  
  .login-btn {
    background: rgba(34, 34, 96, 1);
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
  }
  
  .login-btn:hover {
    background: rgba(34, 34, 96, 0.8);
  }
  
  .login-btn:disabled {
    background: rgba(34, 34, 96, 0.5);
    cursor: not-allowed;
  }
  
  .register-prompt {
    margin-top: 2rem;
    text-align: center;
    color: rgba(34, 34, 96, 0.6);
  }
  
  .register-prompt a {
    color: rgba(34, 34, 96, 1);
    text-decoration: none;
    font-weight: bold;
  }
  
  .register-prompt a:hover {
    text-decoration: underline;
  }
  
  .login-image {
    flex: 1;
    background: linear-gradient(135deg, rgba(114, 103, 240, 0.9), rgba(93, 85, 203, 0.9));
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
  }
  
  .feature-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
  }
  
  .feature-card h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
  
  @media (max-width: 768px) {
    .login-content {
      flex-direction: column;
      height: auto;
    }
    
    .login-form {
      padding: 2rem;
    }
    
    .login-image {
      padding: 2rem;
    }
  }
`;

export default Login;