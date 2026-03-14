import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/images/logo.png';

export default function Footer() {
  return (
    <footer style={{ background:'#111', color:'#fff', padding:'60px 24px 28px', borderTop:'1px solid rgba(201,168,76,0.1)' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:40, marginBottom:48 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
              <div style={{ width:36, height:36, background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src={logoImg} alt="logo" style={{ width:26, height:26, objectFit:'contain', filter:'brightness(0) invert(1)' }} />
              </div>
              <div>
                <div style={{ fontFamily:'Playfair Display,serif', fontSize:15, fontWeight:700, color:'#FFF' }}>Youth Hostel Agra</div>
                <div style={{ fontSize:9, color:'#C9A84C', letterSpacing:2 }}>GOVT. OF INDIA</div>
              </div>
            </div>
            <p style={{ fontSize:13, color:'rgba(255,255,255,0.4)', lineHeight:1.8, marginBottom:20 }}>Ministry of Youth Affairs & Sports, Government of India. Est. 1956.</p>
            <div style={{ display:'flex', gap:10 }}>
              <a href="https://wa.me/917060563072" target="_blank" rel="noreferrer" style={{ width:34, height:34, borderRadius:'50%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily:'Playfair Display,serif', fontSize:14, fontWeight:600, color:'#C9A84C', marginBottom:20, letterSpacing:2, textTransform:'uppercase' }}>Quick Links</h4>
            {[['Home','/'],['Rooms','/rooms'],['Gallery','/gallery'],['Explore Agra','/explore'],['Guest Reviews','/reviews'],['Availability','/availability'],['Contact','/contact']].map(([l,p]) => (
              <Link key={p} to={p} style={{ display:'block', fontSize:13, color:'rgba(255,255,255,0.4)', textDecoration:'none', marginBottom:10, transition:'color 0.2s' }}
                onMouseEnter={e=>e.target.style.color='#C9A84C'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.4)'}>{l}</Link>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily:'Playfair Display,serif', fontSize:14, fontWeight:600, color:'#C9A84C', marginBottom:20, letterSpacing:2, textTransform:'uppercase' }}>Contact</h4>
            {[['📍','MG Road, Agra, UP'],['📞','+91 9368054835'],['✉️','myh.agra@gmail.com'],['⏰','Open 24 Hours']].map(([icon,text]) => (
              <div key={text} style={{ display:'flex', gap:10, marginBottom:12 }}>
                <span style={{ fontSize:14 }}>{icon}</span>
                <span style={{ fontSize:13, color:'rgba(255,255,255,0.4)' }}>{text}</span>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily:'Playfair Display,serif', fontSize:14, fontWeight:600, color:'#C9A84C', marginBottom:20, letterSpacing:2, textTransform:'uppercase' }}>Tariff</h4>
            {[['Delux Room','₹1,100/night'],['AC Room','₹900/night'],['Non-AC Room','₹750/night'],['Dormitory','₹200/night']].map(([r,p]) => (
              <div key={r} style={{ display:'flex', justifyContent:'space-between', marginBottom:10, paddingBottom:10, borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize:13, color:'rgba(255,255,255,0.4)' }}>{r}</span>
                <span style={{ fontSize:13, color:'#C9A84C', fontWeight:600 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <p style={{ fontSize:12, color:'rgba(255,255,255,0.25)' }}>© 2024 Youth Hostel Agra. Ministry of Youth Affairs & Sports, Govt. of India.</p>
          <p style={{ fontSize:12, color:'rgba(255,255,255,0.25)' }}>In-charge: Dr. Shravan Kumar Sehgal</p>
        </div>
      </div>
    </footer>
  );
}
