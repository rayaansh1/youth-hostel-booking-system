import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem('yha_token', data.token);
      localStorage.setItem('yha_user', JSON.stringify(data.user));
      navigate(data.user.role === 'admin' ? '/admin' : '/');
    } catch (err) { setError(err.message || 'Login failed'); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 80, padding: '100px 24px 60px' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#C9A84C' }}>Welcome Back</span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 800, color: '#FFF', marginTop: 8 }}>Sign In</h1>
        </div>
        <div style={{ background: '#1A1A1A', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8, padding: '40px' }}>
          {error && <div style={{ background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.3)', color: '#E74C3C', padding: '12px 16px', borderRadius: 4, marginBottom: 20, fontSize: 14 }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            {[{ label: 'Email Address', key: 'email', type: 'email', placeholder: 'your@email.com' }, { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' }].map(f => (
              <div key={f.key} style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#9A9A9A', marginBottom: 8 }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{ width: '100%', padding: '13px 16px', background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2, color: '#FFF', fontFamily: 'DM Sans, sans-serif', fontSize: 14, outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#C9A84C'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
            ))}
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #C9A84C, #9B7D35)', color: '#000', border: 'none', borderRadius: 2, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif', marginTop: 8 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#666' }}>Don't have an account? <Link to="/register" style={{ color: '#C9A84C', textDecoration: 'none' }}>Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem('yha_token', data.token);
      localStorage.setItem('yha_user', JSON.stringify(data.user));
      navigate('/');
    } catch (err) { setError(err.message || 'Registration failed'); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#C9A84C' }}>Join Us</span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 800, color: '#FFF', marginTop: 8 }}>Create Account</h1>
        </div>
        <div style={{ background: '#1A1A1A', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8, padding: '40px' }}>
          {error && <div style={{ background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.3)', color: '#E74C3C', padding: '12px 16px', borderRadius: 4, marginBottom: 20, fontSize: 14 }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            {[{ label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your full name' }, { label: 'Email Address', key: 'email', type: 'email', placeholder: 'your@email.com' }, { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+91 XXXXX XXXXX' }, { label: 'Password', key: 'password', type: 'password', placeholder: 'Min. 8 characters' }].map(f => (
              <div key={f.key} style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#9A9A9A', marginBottom: 8 }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{ width: '100%', padding: '13px 16px', background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2, color: '#FFF', fontFamily: 'DM Sans, sans-serif', fontSize: 14, outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#C9A84C'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
            ))}
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #C9A84C, #9B7D35)', color: '#000', border: 'none', borderRadius: 2, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif', marginTop: 8 }}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#666' }}>Already have an account? <Link to="/login" style={{ color: '#C9A84C', textDecoration: 'none' }}>Login</Link></p>
        </div>
      </div>
    </div>
  );
};
