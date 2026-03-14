import React, { useState, useEffect } from 'react';

const SAMPLE_REVIEWS = [
  { id:1, name:'Anjali S.', bookingId:'YHA001', rating:5, text:'Wonderful stay! Clean rooms and friendly staff. Perfect location near Taj Mahal.', date:'2024-01-15', avatar:'AS' },
  { id:2, name:'Rahul M.', bookingId:'YHA002', rating:5, text:'Great value for money. Very close to all major attractions. Highly recommended!', date:'2024-01-20', avatar:'RM' },
  { id:3, name:'Priya K.', bookingId:'YHA003', rating:4, text:'Clean, affordable and safe. Dormitory was well maintained. Will visit again!', date:'2024-02-01', avatar:'PK' },
  { id:4, name:'Arjun T.', bookingId:'YHA004', rating:5, text:'Amazing experience. The staff was very helpful. Location is perfect for tourists.', date:'2024-02-10', avatar:'AT' },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS);
  const [form, setForm] = useState({ name:'', bookingId:'', rating:5, text:'' });
  const [submitted, setSubmitted] = useState(false);
  const [hover, setHover] = useState(0);
  const [filter, setFilter] = useState(0);

  const avgRating = (reviews.reduce((a,r)=>a+r.rating,0)/reviews.length).toFixed(1);
  const filtered = filter === 0 ? reviews : reviews.filter(r=>r.rating===filter);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!form.name || !form.bookingId || !form.text) return;
    const newReview = { ...form, id:Date.now(), date:new Date().toISOString().split('T')[0], avatar:form.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) };
    setReviews(r=>[newReview,...r]);
    setForm({ name:'', bookingId:'', rating:5, text:'' });
    setSubmitted(true);
    setTimeout(()=>setSubmitted(false),4000);
  };

  const stars = (n, interactive=false, size=20) => Array.from({length:5}).map((_,i)=>(
    <span key={i} onClick={interactive?()=>setForm(f=>({...f,rating:i+1})):undefined}
      onMouseEnter={interactive?()=>setHover(i+1):undefined}
      onMouseLeave={interactive?()=>setHover(0):undefined}
      style={{ color:(interactive?(hover||form.rating):n)>i?'#F59E0B':'#444', fontSize:size, cursor:interactive?'pointer':'default', transition:'color 0.15s' }}>★</span>
  ));

  return (
    <div style={{ background:'#0D0D0D', minHeight:'100vh', paddingTop:80 }}>
      <div style={{ background:'linear-gradient(135deg,#C9A84C,#9B7D35)', padding:'60px 24px', textAlign:'center' }}>
        <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:800, color:'#000', marginBottom:12 }}>Guest Reviews</h1>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12 }}>
          <span style={{ fontFamily:'Playfair Display,serif', fontSize:48, fontWeight:800, color:'#000' }}>{avgRating}</span>
          <div>
            <div>{stars(Math.round(avgRating),false,28)}</div>
            <div style={{ fontSize:13, color:'rgba(0,0,0,0.6)', marginTop:4 }}>Based on {reviews.length} reviews</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'60px 24px', display:'grid', gridTemplateColumns:'1fr 400px', gap:48, alignItems:'start' }}>
        {/* Reviews list */}
        <div>
          <div style={{ display:'flex', gap:8, marginBottom:28, flexWrap:'wrap' }}>
            {[0,5,4,3,2,1].map(n=>(
              <button key={n} onClick={()=>setFilter(n)} style={{ padding:'6px 16px', background:filter===n?'#C9A84C':'rgba(255,255,255,0.05)', color:filter===n?'#000':'#AAA', border:'1px solid rgba(201,168,76,0.3)', borderRadius:50, fontSize:12, cursor:'pointer', fontFamily:'DM Sans,sans-serif', transition:'all 0.2s' }}>
                {n===0?'All':n+' ★'}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {filtered.map(r=>(
              <div key={r.id} style={{ background:'#1A1A1A', border:'1px solid rgba(255,255,255,0.06)', borderRadius:10, padding:'22px 24px', transition:'all 0.3s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(201,168,76,0.25)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.06)';}}>
                <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:12 }}>
                  <div style={{ width:44, height:44, borderRadius:'50%', background:'linear-gradient(135deg,#C9A84C,#9B7D35)', display:'flex', alignItems:'center', justifyContent:'center', color:'#000', fontSize:14, fontWeight:700, flexShrink:0 }}>{r.avatar}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:15, fontWeight:600, color:'#FFF' }}>{r.name}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div>{stars(r.rating,false,14)}</div>
                      <span style={{ fontSize:11, color:'#555' }}>• {r.date}</span>
                    </div>
                  </div>
                  <div style={{ fontSize:11, color:'#555', background:'rgba(255,255,255,0.04)', padding:'3px 10px', borderRadius:50 }}>#{r.bookingId}</div>
                </div>
                <p style={{ fontSize:14, color:'#AAA', lineHeight:1.7 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit review form */}
        <div style={{ position:'sticky', top:100 }}>
          <div style={{ background:'#1A1A1A', border:'1px solid rgba(201,168,76,0.2)', borderRadius:12, padding:'28px 24px' }}>
            <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:20, color:'#FFF', marginBottom:6 }}>Write a Review</h3>
            <p style={{ fontSize:13, color:'#666', marginBottom:24 }}>Verified guests only. Enter your booking ID.</p>
            {submitted ? (
              <div style={{ textAlign:'center', padding:'32px 0' }}>
                <div style={{ fontSize:48, marginBottom:12 }}>⭐</div>
                <div style={{ color:'#C9A84C', fontFamily:'Playfair Display,serif', fontSize:18, fontWeight:700 }}>Thank you!</div>
                <div style={{ color:'#666', fontSize:13, marginTop:6 }}>Your review has been submitted.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {[['name','Your Name','text'],['bookingId','Booking ID (e.g. YHA001)','text']].map(([field,ph,type])=>(
                  <div key={field} style={{ marginBottom:14 }}>
                    <label style={{ fontSize:11, color:'#888', letterSpacing:1.5, textTransform:'uppercase', display:'block', marginBottom:5 }}>{field==='bookingId'?'Booking ID':'Name'}</label>
                    <input type={type} placeholder={ph} value={form[field]} onChange={e=>setForm({...form,[field]:e.target.value})} required
                      style={{ width:'100%', padding:'10px 14px', background:'#0D0D0D', border:'1px solid rgba(255,255,255,0.1)', borderRadius:6, color:'#FFF', fontSize:14, fontFamily:'DM Sans,sans-serif', outline:'none', boxSizing:'border-box' }} />
                  </div>
                ))}
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontSize:11, color:'#888', letterSpacing:1.5, textTransform:'uppercase', display:'block', marginBottom:8 }}>Your Rating</label>
                  <div style={{ display:'flex', gap:4 }}>{stars(0,true,32)}</div>
                </div>
                <div style={{ marginBottom:20 }}>
                  <label style={{ fontSize:11, color:'#888', letterSpacing:1.5, textTransform:'uppercase', display:'block', marginBottom:5 }}>Your Review</label>
                  <textarea placeholder="Share your experience..." value={form.text} onChange={e=>setForm({...form,text:e.target.value})} required rows={4}
                    style={{ width:'100%', padding:'10px 14px', background:'#0D0D0D', border:'1px solid rgba(255,255,255,0.1)', borderRadius:6, color:'#FFF', fontSize:14, fontFamily:'DM Sans,sans-serif', outline:'none', resize:'vertical', boxSizing:'border-box' }} />
                </div>
                <button type="submit" style={{ width:'100%', padding:'13px', background:'linear-gradient(135deg,#C9A84C,#9B7D35)', color:'#000', border:'none', borderRadius:6, fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif', letterSpacing:1 }}>
                  Submit Review ★
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
