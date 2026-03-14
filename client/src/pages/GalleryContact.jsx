import React, { useState } from 'react';
import slide1 from '../assets/images/slide1.jpeg';
import slide2 from '../assets/images/slide2.jpeg';
import slide3 from '../assets/images/slide3.jpeg';
import acImg from '../assets/images/ac_room.jpeg';
import nonAcImg from '../assets/images/non-ac_room.jpeg';
import deluxImg from '../assets/images/delux_room.jpeg';
import dorm1 from '../assets/images/doormetry1.jpeg';
import dorm2 from '../assets/images/doormetry2.jpeg';
import dorm3 from '../assets/images/doormetry3.jpeg';
import conf1 from '../assets/images/confrence1.jpeg';
import conf2 from '../assets/images/confrence2.jpeg';
import dining1 from '../assets/images/dinning1.jpeg';
import dining2 from '../assets/images/dinning2.jpeg';
import parking1 from '../assets/images/parking1.jpeg';
import study1 from '../assets/images/study1.jpeg';
import rec1 from '../assets/images/reception1.jpeg';
import gallery from '../assets/images/gallery.jpeg';

const PHOTOS = [
  { img:slide1, cat:'exterior', label:'Building Front' },
  { img:slide2, cat:'exterior', label:'Hostel Campus' },
  { img:slide3, cat:'exterior', label:'Hostel Facade' },
  { img:rec1, cat:'interior', label:'Reception' },
  { img:acImg, cat:'rooms', label:'AC Room' },
  { img:nonAcImg, cat:'rooms', label:'Non-AC Room' },
  { img:deluxImg, cat:'rooms', label:'Delux Room' },
  { img:dorm1, cat:'rooms', label:'Dormitory' },
  { img:dorm2, cat:'rooms', label:'Dormitory Beds' },
  { img:dorm3, cat:'rooms', label:'Dormitory View' },
  { img:conf1, cat:'venues', label:'Conference Hall' },
  { img:conf2, cat:'venues', label:'Conference Setup' },
  { img:dining1, cat:'dining', label:'Dining Hall' },
  { img:dining2, cat:'dining', label:'Canteen' },
  { img:parking1, cat:'amenities', label:'Parking Area' },
  { img:study1, cat:'amenities', label:'Study Room' },
  { img:gallery, cat:'amenities', label:'Common Area' },
];

const TABS = [
  { id:'all', label:'All' },
  { id:'exterior', label:'Exterior' },
  { id:'rooms', label:'Rooms' },
  { id:'venues', label:'Venues' },
  { id:'dining', label:'Dining' },
  { id:'amenities', label:'Amenities' },
];

export function GalleryPage() {
  const [tab, setTab] = useState('all');
  const [light, setLight] = useState(null);
  const photos = tab==='all' ? PHOTOS : PHOTOS.filter(p=>p.cat===tab);

  return (
    <div style={{ background:'#fff' }}>
      <div style={{ position:'relative', height:300, overflow:'hidden' }}>
        <img src={gallery} alt="Gallery" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.55)' }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 6vw' }}>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,5vw,3rem)', fontWeight:800, color:'#fff', marginBottom:10 }}>Gallery</h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.8)' }}>A visual tour of Youth Hostel Agra</p>
        </div>
      </div>

      <div style={{ background:'#F8F6F1', borderBottom:'1px solid #E8E2D9', padding:'0 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', gap:4, overflowX:'auto' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={()=>setTab(t.id)} style={{ padding:'16px 22px', background:'none', border:'none', cursor:'pointer', fontFamily:'DM Sans,sans-serif', fontSize:14, fontWeight:tab===t.id?700:500, color:tab===t.id?'#1A1A1A':'#7A7A7A', borderBottom:tab===t.id?'2px solid #1A1A1A':'2px solid transparent', transition:'all 0.25s', whiteSpace:'nowrap' }}>{t.label}</button>
          ))}
        </div>
      </div>

      <section style={{ padding:'60px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', columns:'3 280px', gap:18 }}>
          {photos.map((p,i) => (
            <div key={i} onClick={()=>setLight(p)} style={{ breakInside:'avoid', marginBottom:18, borderRadius:14, overflow:'hidden', cursor:'pointer', position:'relative', border:'1px solid #E8E2D9', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', transition:'all 0.35s' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 36px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.06)'; }}>
              <img src={p.img} alt={p.label} style={{ width:'100%', display:'block', objectFit:'cover' }} />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'linear-gradient(transparent,rgba(0,0,0,0.65))', padding:'24px 14px 12px' }}>
                <span style={{ fontSize:12, fontWeight:600, color:'#fff' }}>{p.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {light && (
        <div onClick={()=>setLight(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.92)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
          <img src={light.img} alt={light.label} style={{ maxWidth:'90vw', maxHeight:'85vh', objectFit:'contain', borderRadius:12 }} />
          <button onClick={()=>setLight(null)} style={{ position:'absolute', top:24, right:28, background:'none', border:'none', color:'#fff', fontSize:32, cursor:'pointer', lineHeight:1 }}>×</button>
        </div>
      )}
    </div>
  );
}

export function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <div style={{ background:'#fff' }}>
      <div style={{ position:'relative', height:300, overflow:'hidden' }}>
        <img src={slide1} alt="Contact" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.55)' }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 6vw' }}>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,5vw,3rem)', fontWeight:800, color:'#fff', marginBottom:10 }}>Contact Us</h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.8)' }}>We're here to help you plan your stay</p>
        </div>
      </div>

      <section style={{ padding:'72px 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:56 }}>
          <div>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:3.5, textTransform:'uppercase', color:'#8B6914', display:'block', marginBottom:10 }}>Get In Touch</span>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'2rem', fontWeight:700, color:'#1A1A1A', marginBottom:12 }}>Contact Information</h2>
            <div style={{ width:40, height:3, background:'#C9A84C', borderRadius:2, marginBottom:32 }} />
            {[['📍','Address','MG Road, Agra, Uttar Pradesh 282001, India'],['📞','Phone','+91 9368054835'],['✉️','Email','myh.agra@gmail.com'],['⏰','Hours','Open 24 Hours / 7 Days']].map(([icon,label,val]) => (
              <div key={label} style={{ display:'flex', gap:16, marginBottom:24, padding:'18px 20px', background:'#F8F6F1', border:'1px solid #E8E2D9', borderRadius:12 }}>
                <span style={{ fontSize:22, flexShrink:0, marginTop:2 }}>{icon}</span>
                <div>
                  <div style={{ fontSize:11, fontWeight:700, color:'#8B6914', letterSpacing:1.5, textTransform:'uppercase', marginBottom:4 }}>{label}</div>
                  <div style={{ fontSize:15, color:'#1A1A1A', fontWeight:500 }}>{val}</div>
                </div>
              </div>
            ))}
            <a href="https://wa.me/917060563072" target="_blank" rel="noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 28px', background:'#25D366', color:'#fff', borderRadius:10, fontSize:14, fontWeight:700, textDecoration:'none', marginTop:8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:3.5, textTransform:'uppercase', color:'#8B6914', display:'block', marginBottom:10 }}>Send Message</span>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'2rem', fontWeight:700, color:'#1A1A1A', marginBottom:12 }}>Write to Us</h2>
            <div style={{ width:40, height:3, background:'#C9A84C', borderRadius:2, marginBottom:32 }} />
            {sent ? (
              <div style={{ padding:'40px', background:'#F0FDF4', border:'1px solid #BBF7D0', borderRadius:16, textAlign:'center' }}>
                <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
                <div style={{ fontFamily:'Playfair Display,serif', fontSize:22, fontWeight:700, color:'#1A1A1A', marginBottom:8 }}>Message Sent!</div>
                <p style={{ fontSize:14, color:'#4A4A4A' }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {['name','email','phone'].map(f => (
                  <div key={f} style={{ marginBottom:16 }}>
                    <label style={{ fontSize:12, fontWeight:700, color:'#8B6914', letterSpacing:1.5, textTransform:'uppercase', display:'block', marginBottom:6 }}>{f.charAt(0).toUpperCase()+f.slice(1)}</label>
                    <input type={f==='email'?'email':f==='phone'?'tel':'text'} className="form-inp" required value={form[f]} onChange={e=>setForm({...form,[f]:e.target.value})} placeholder={`Your ${f}`} />
                  </div>
                ))}
                <div style={{ marginBottom:24 }}>
                  <label style={{ fontSize:12, fontWeight:700, color:'#8B6914', letterSpacing:1.5, textTransform:'uppercase', display:'block', marginBottom:6 }}>Message</label>
                  <textarea className="form-inp" rows={5} required value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us how we can help you..." style={{ resize:'vertical' }} />
                </div>
                <button type="submit" className="btn-green" style={{ borderRadius:10, padding:'14px 28px', fontSize:15, width:'100%' }}>Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
