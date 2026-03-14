import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../assets/images/logo.png';

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

  const logout = () => { localStorage.removeItem('yha_token'); localStorage.removeItem('yha_user'); setUser(null); nav('/'); };

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Rooms', to: '/rooms' },
    { label: 'Explore', to: '/explore' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000, transition:'all 0.4s',
        background: scrolled ? 'rgba(13,13,13,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
        padding: scrolled ? '14px 0' : '22px 0',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
      }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>

          <Link to="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:38, height:38, background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.3)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
              {/* FIX #2: logo filter to remove white box */}
              <img src={logoImg} alt="GOI" style={{ width:28, height:28, objectFit:'contain', filter:'brightness(0) invert(1)' }} />
            </div>
            <div>
              <div style={{ fontFamily:'Playfair Display,serif', fontSize:16, fontWeight:700, color:'#FFF', lineHeight:1.1 }}>Youth Hostel Agra</div>
              <div style={{ fontSize:9, color:'#C9A84C', letterSpacing:2, textTransform:'uppercase', fontWeight:600 }}>Est. 1956 · Govt. of India</div>
            </div>
          </Link>

          <div className="hide-mobile" style={{ display:'flex', alignItems:'center', gap:4 }}>
            {links.map(l => (
              <Link key={l.to} to={l.to} style={{ padding:'8px 14px', fontFamily:'DM Sans,sans-serif', fontSize:13, fontWeight:500, textDecoration:'none',
                color: loc.pathname===l.to ? '#C9A84C' : 'rgba(255,255,255,0.75)',
                borderBottom: loc.pathname===l.to ? '1px solid #C9A84C' : '1px solid transparent',
                letterSpacing:0.5, transition:'color 0.2s' }}>{l.label}</Link>
            ))}
          </div>

          <div className="hide-mobile" style={{ display:'flex', alignItems:'center', gap:16 }}>
            <a href="tel:+919368054835" style={{ fontSize:13, color:'rgba(255,255,255,0.65)', textDecoration:'none', display:'flex', alignItems:'center', gap:5 }}>
              📞 +91 9368054835
            </a>
            {user ? (
              <>
                {user.role==='admin' && <Link to="/admin" style={{ fontSize:13, color:'#C9A84C', textDecoration:'none', fontWeight:600 }}>Admin</Link>}
                <button onClick={logout} style={{ padding:'8px 18px', background:'transparent', border:'1px solid rgba(201,168,76,0.4)', color:'#C9A84C', borderRadius:2, fontSize:12, cursor:'pointer', fontFamily:'DM Sans,sans-serif', letterSpacing:1, textTransform:'uppercase' }}>Logout</button>
              </>
            ) : (
              <Link to="/rooms" style={{ padding:'10px 24px', background:'linear-gradient(135deg,#C9A84C,#9B7D35)', color:'#000', borderRadius:2, fontSize:12, fontWeight:700, textDecoration:'none', letterSpacing:1.5, textTransform:'uppercase' }}>Book Now</Link>
            )}
          </div>

          <button className="show-mobile" onClick={() => setOpen(!open)} style={{ background:'none', border:'none', cursor:'pointer', padding:8 }}>
            {[0,1,2].map(i => <span key={i} style={{ display:'block', width:22, height:2, background:'#C9A84C', borderRadius:2, marginBottom:i<2?5:0, transition:'all 0.3s',
              transform: open && i===0 ? 'rotate(45deg) translate(5px,5px)' : open && i===2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
              opacity: open && i===1 ? 0 : 1 }} />)}
          </button>
        </div>
      </nav>

      {open && (
        <div style={{ position:'fixed', inset:0, zIndex:999, background:'#0D0D0D', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:32 }}>
          {links.map(l => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{ fontFamily:'Playfair Display,serif', fontSize:28, fontWeight:600, color:'#FFF', textDecoration:'none' }}>{l.label}</Link>)}
          <Link to="/rooms" onClick={() => setOpen(false)} style={{ marginTop:8, padding:'14px 44px', background:'linear-gradient(135deg,#C9A84C,#9B7D35)', color:'#000', borderRadius:2, fontSize:13, fontWeight:700, textDecoration:'none', letterSpacing:2, textTransform:'uppercase' }}>Book Now</Link>
        </div>
      )}
    </>
  );
}
