import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import acImg from '../assets/images/ac_room.jpeg';
import nonAcImg from '../assets/images/non-ac_room.jpeg';
import dormImg from '../assets/images/doormetry1.jpeg';
import dorm2 from '../assets/images/doormetry2.jpeg';
import deluxImg from '../assets/images/delux_room.jpeg';
import confImg from '../assets/images/confrence1.jpeg';
import conf2 from '../assets/images/confrence2.jpeg';
import diningImg from '../assets/images/dinning1.jpeg';
import dining2 from '../assets/images/dinning2.jpeg';
import slideImg from '../assets/images/slide1.jpeg';

const ROOMS = [
  { id:'delux', name:'Delux Room', img:deluxImg, price:'₹1,100', unit:'/night', category:'room', tag:'Premium', tagColor:'#8B6914', desc:'Our premium room with top amenities, TV, AC, and private attached bathroom.', amenities:['Air Conditioning','Private Bathroom','LCD TV','Hot Water','Wi-Fi','Room Service'], stars:5 },
  { id:'ac', name:'AC Room', img:acImg, price:'₹900', unit:'/night', category:'room', tag:'Most Popular', tagColor:'#1A1A1A', desc:'Comfortable air-conditioned room with attached bathroom and all essentials.', amenities:['Air Conditioning','Attached Bathroom','Hot Water','Wi-Fi','Ceiling Fan','Wardrobe'], stars:4 },
  { id:'non-ac', name:'Non-AC Room', img:nonAcImg, price:'₹750', unit:'/night', category:'room', tag:'Great Value', tagColor:'#2E7D32', desc:'Well-ventilated comfortable room with all basic amenities included.', amenities:['Ceiling Fan','Attached Bathroom','Hot Water','Wi-Fi','Study Table','Wardrobe'], stars:4 },
  { id:'dorm-others', name:'Dormitory (Others)', img:dormImg, price:'₹300', unit:'/night', category:'room', tag:'Budget', tagColor:'#1565C0', desc:'Shared accommodation for travellers in well-maintained dormitory beds.', amenities:['Shared Bathroom','Locker Storage','Wi-Fi','Common Room','24/7 Security'], stars:3 },
  { id:'dorm-students', name:'Dormitory (Students)', img:dorm2, price:'₹200', unit:'/night', category:'room', tag:'Student Special', tagColor:'#6A1B9A', desc:'Special tariff for bonafide students with valid ID. Shared dormitory.', amenities:['Student ID Required','Shared Bathroom','Locker Storage','Wi-Fi','Study Room'], stars:3 },
  { id:'conf-3hr', name:'Conference Hall (3 hrs)', img:confImg, price:'₹3,500', unit:'/3 hrs', category:'venue', tag:'Events', tagColor:'#8B6914', desc:'Fully equipped conference hall ideal for meetings, seminars and workshops.', amenities:['Projector & Screen','Microphone','AC','50 Seating Capacity','Whiteboard','Wi-Fi'], stars:5 },
  { id:'conf-7hr', name:'Conference Hall (7 hrs)', img:conf2, price:'₹7,000', unit:'/7 hrs', category:'venue', tag:'Full Day', tagColor:'#1A1A1A', desc:'Full-day booking of conference hall with all modern amenities.', amenities:['Full Day Access','Projector & Screen','AC','50 Seating','Lunch Break','Wi-Fi'], stars:5 },
  { id:'mini-lounge', name:'Mini Lounge (3 hrs)', img:diningImg, price:'₹1,800', unit:'/3 hrs', category:'venue', tag:'Small Events', tagColor:'#2E7D32', desc:'Intimate lounge space for small meetings, interviews and get-togethers.', amenities:['20 Seating Capacity','AC','TV Screen','Wi-Fi','Tea/Coffee Service'], stars:4 },
  { id:'dining-refresh', name:'Dining Refreshment', img:diningImg, price:'₹300', unit:'/hr', category:'dining', tag:'Canteen', tagColor:'#8B6914', desc:'Affordable refreshments and snacks in our hygienic dining hall.', amenities:['Hygienic Kitchen','Snacks & Beverages','Affordable Pricing','Clean Seating'], stars:4 },
  { id:'dining-meal', name:'Dining Meal', img:dining2, price:'₹600', unit:'/hr', category:'dining', tag:'Full Meals', tagColor:'#1A1A1A', desc:'Complete Indian meals prepared fresh in our hostel kitchen.', amenities:['North Indian Menu','Vegetarian Options','Fresh Cooking','Group Meals Available'], stars:4 },
];

const TABS = [
  { id:'all', label:'All' },
  { id:'room', label:'Rooms' },
  { id:'venue', label:'Venues' },
  { id:'dining', label:'Dining' },
];

export default function RoomsPage() {
  const [tab, setTab] = useState('all');
  const filtered = tab === 'all' ? ROOMS : ROOMS.filter(r => r.category === tab);

  return (
    <div style={{ background:'#fff' }}>
      {/* Hero */}
      <div style={{ position:'relative', height:320, overflow:'hidden' }}>
        <img src={slideImg} alt="Rooms" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 100%)' }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 6vw' }}>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:3.5, textTransform:'uppercase', color:'#C9A84C', marginBottom:10 }}>Accommodation</span>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,5vw,3.2rem)', fontWeight:800, color:'#fff', marginBottom:12 }}>Rooms & Venues</h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.8)', maxWidth:480 }}>Affordable accommodation by the Government of India — from dormitory beds to premium rooms.</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background:'#F8F6F1', borderBottom:'1px solid #E8E2D9', padding:'0 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', gap:4 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding:'16px 24px', background:'none', border:'none', cursor:'pointer', fontFamily:'DM Sans,sans-serif', fontSize:14, fontWeight:tab===t.id?700:500, color:tab===t.id?'#1A1A1A':'#7A7A7A', borderBottom:tab===t.id?'2px solid #1A1A1A':'2px solid transparent', transition:'all 0.25s' }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section style={{ padding:'60px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:28 }}>
            {filtered.map(r => (
              <div key={r.id} className="card">
                <div style={{ position:'relative', height:230, overflow:'hidden' }}>
                  <img src={r.img} alt={r.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s' }}
                    onMouseEnter={e=>e.target.style.transform='scale(1.06)'}
                    onMouseLeave={e=>e.target.style.transform='scale(1)'} />
                  <span style={{ position:'absolute', top:14, left:14, background:r.tagColor, color:'#fff', fontSize:10, fontWeight:700, letterSpacing:1.5, padding:'4px 14px', borderRadius:50, textTransform:'uppercase' }}>{r.tag}</span>
                  <div style={{ position:'absolute', top:14, right:14, display:'flex', gap:2 }}>
                    {Array.from({length:5}).map((_,i) => <span key={i} style={{ color:i<r.stars?'#F59E0B':'rgba(255,255,255,0.4)', fontSize:13 }}>★</span>)}
                  </div>
                </div>
                <div style={{ padding:'22px 24px' }}>
                  <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:20, fontWeight:700, color:'#1A1A1A', marginBottom:8 }}>{r.name}</h3>
                  <p style={{ fontSize:14, color:'#7A7A7A', marginBottom:16, lineHeight:1.65 }}>{r.desc}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:20 }}>
                    {r.amenities.slice(0,4).map(a => (
                      <span key={a} style={{ fontSize:11, padding:'4px 10px', background:'#F8F6F1', border:'1px solid #E8E2D9', borderRadius:50, color:'#4A4A4A', fontWeight:500 }}>{a}</span>
                    ))}
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:16, borderTop:'1px solid #F0EAE0' }}>
                    <div>
                      <span style={{ fontFamily:'Playfair Display,serif', fontSize:24, fontWeight:800, color:'#1A1A1A' }}>{r.price}</span>
                      <span style={{ fontSize:13, color:'#7A7A7A' }}>{r.unit}</span>
                    </div>
                    <Link to={`/book/${r.id}`} style={{ padding:'10px 22px', background:'#2E7D32', color:'#fff', borderRadius:8, fontSize:13, fontWeight:600, textDecoration:'none', transition:'all 0.3s' }}
                      onMouseEnter={e=>{ e.target.style.background='#1B5E20'; e.target.style.transform='translateY(-1px)'; }}
                      onMouseLeave={e=>{ e.target.style.background='#2E7D32'; e.target.style.transform='none'; }}>
                      Reserve Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
