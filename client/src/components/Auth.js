import React, { useState  } from 'react';
import { User, Mail, Lock, UserCheck, BookOpen } from 'lucide-react';

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock authentication
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      username: formData.username || formData.email.split('@')[0],
      email: formData.email,
      role: formData.role,
      avatar: {
        skinColor: '#F4A460',
        hairColor: '#8B4513',
        hairStyle: 'short',
        eyeColor: '#4B5563',
        outfit: 'casual',
        accessory: 'none'
      },
      points: 0,
      stars: 3,
      badges: [],
      level: 1
    };

    onLogin(userData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <BookOpen size={32} color="#fff" />
          </div>
          <h1>LearnSphere</h1>
          <p>{isLogin ? 'Welcome back!' : 'Join the learning revolution'}</p>
        </div>

        <div className="auth-toggle">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={isLogin ? 'active' : ''}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={!isLogin ? 'active' : ''}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <User className="input-icon" size={18} />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required={!isLogin}
              />
            </div>
          )}

          <div className="input-group">
            <Mail className="input-icon" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="input-group">
                <Lock className="input-icon" size={18} />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <UserCheck className="input-icon" size={18} />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            </>
          )}

          <button type="submit" className="auth-submit">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
