import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const loc = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn);
    const u = localStorage.getItem('yha_user');
    if (u) setUser(JSON.parse(u));
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const logout = () => {
    localStorage.removeItem('yha_token');
    localStorage.removeItem('yha_user');
    setUser(null);
    nav('/');
  };

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Rooms', to: '/rooms' },
    { label: 'Explore', to: '/explore' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'all 0.4s',
        background: scrolled ? 'rgba(13,13,13,0.97)' : 'rgba(13,13,13,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        padding: scrolled ? '10px 0' : '14px 0',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* LOGO — no image, just text to avoid white box */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#C9A84C,#9B7D35)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#000', fontSize: 16, fontWeight: 900, fontFamily: 'Playfair Display,serif' }}>Y</span>
            </div>
            <div>
              <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 14, fontWeight: 700, color: '#FFF', lineHeight: 1.1 }}>Youth Hostel Agra</div>
              <div style={{ fontSize: 8, color: '#C9A84C', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>Est. 1956 · Govt. of India</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, '@media(max-width:768px)': { display: 'none' } }} className="hide-mobile">
            {links.map(l => (
              <Link key={l.to} to={l.to} style={{
                padding: '8px 12px', fontFamily: 'DM Sans,sans-serif', fontSize: 13,
                fontWeight: 500, textDecoration: 'none',
                color: loc.pathname === l.to ? '#C9A84C' : 'rgba(255,255,255,0.75)',
                borderBottom: loc.pathname === l.to ? '1px solid #C9A84C' : '1px solid transparent',
                letterSpacing: 0.5, transition: 'color 0.2s'
              }}>{l.label}</Link>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user ? (
              <>
                {user.role === 'admin' && <Link to="/admin" style={{ fontSize: 13, color: '#C9A84C', textDecoration: 'none', fontWeight: 600 }}>Admin</Link>}
                <button onClick={logout} style={{ padding: '8px 16px', background: 'transparent', border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C', borderRadius: 2, fontSize: 12, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif' }}>Logout</button>
              </>
            ) : (
              <Link to="/rooms" style={{ padding: '9px 20px', background: 'linear-gradient(135deg,#C9A84C,#9B7D35)', color: '#000', borderRadius: 2, fontSize: 12, fontWeight: 700, textDecoration: 'none', letterSpacing: 1, textTransform: 'uppercase' }}>Book Now</Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} className="show-mobile" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 2, background: '#C9A84C',
                borderRadius: 2, marginBottom: i < 2 ? 5 : 0, transition: 'all 0.3s',
                transform: open && i === 0 ? 'rotate(45deg) translate(5px,5px)' : open && i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
                opacity: open && i === 1 ? 0 : 1
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: '#0D0D0D', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
          <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: '#C9A84C', fontSize: 28, cursor: 'pointer' }}>✕</button>
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{ fontFamily: 'Playfair Display,serif', fontSize: 26, fontWeight: 600, color: loc.pathname === l.to ? '#C9A84C' : '#FFF', textDecoration: 'none' }}>{l.label}</Link>
          ))}
          <Link to="/reviews" onClick={() => setOpen(false)} style={{ fontFamily: 'Playfair Display,serif', fontSize: 26, fontWeight: 600, color: '#FFF', textDecoration: 'none' }}>Reviews</Link>
          <Link to="/availability" onClick={() => setOpen(false)} style={{ fontFamily: 'Playfair Display,serif', fontSize: 26, fontWeight: 600, color: '#FFF', textDecoration: 'none' }}>Availability</Link>
          <Link to="/rooms" onClick={() => setOpen(false)} style={{ marginTop: 8, padding: '14px 44px', background: 'linear-gradient(135deg,#C9A84C,#9B7D35)', color: '#000', borderRadius: 2, fontSize: 13, fontWeight: 700, textDecoration: 'none', letterSpacing: 2, textTransform: 'uppercase' }}>Book Now</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) { .hide-mobile { display: none !important; } .show-mobile { display: block !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
    </>
  );
}
