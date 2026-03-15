import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/images/logo.png';
import exploreTajMahal from '../assets/images/explore_taj_mahal.jpeg';
import exploreAgraFort from '../assets/images/explore_agra_fort.jpg';
import exploreFatehpur from '../assets/images/explore_fatehpur_sikri.jpg';
import exploreItmad from '../assets/images/explore_itmad_ul_daula.jpg';
import exploreSikandra from '../assets/images/explore_sikandra.jpg';
import exploreMehtab from '../assets/images/explore_mehtab_bagh.jpg';
import exploreSaheed from '../assets/images/explore_saheed_park.jpg';
import slide1 from '../assets/images/slide1.jpeg';
import slide2 from '../assets/images/slide2.jpeg';
import slide3 from '../assets/images/slide3.jpeg';
import officeImg from '../assets/images/office.jpeg';
import reception1 from '../assets/images/reception1.jpeg';
import galleryImg from '../assets/images/gallery.jpeg';
import parkingImg from '../assets/images/parking1.jpeg';
import deluxImg from '../assets/images/delux_room.jpeg';
import acImg from '../assets/images/ac_room.jpeg';
import nonAcImg from '../assets/images/non-ac_room.jpeg';
import dormImg from '../assets/images/doormetry1.jpeg';
import confImg from '../assets/images/confrence1.jpeg';
import studyImg from '../assets/images/study1.jpeg';
import diningImg from '../assets/images/dinning1.jpeg';

const slides = [
  { img: slide1, title: 'Youth Hostel Agra', sub: 'Affordable • Safe • Government Approved Accommodation' },
  { img: slide2, title: 'Experience Agra', sub: 'Gateway to the Taj Mahal & UNESCO Heritage Sites' },
  { img: slide3, title: 'Book Your Stay', sub: 'Premium Comfort at Budget Prices Since 1956' },
];

/* FIX #3: All attraction cards now have real Wikipedia photos */
const exploreAgra = [
  { id:'taj-mahal', name:'Taj Mahal', dist:'3 km', desc:'The world-renowned monument of eternal love', img: exploreTajMahal },
  { id:'agra-fort', name:'Agra Fort', dist:'2.5 km', desc:'A mighty UNESCO World Heritage fortress', img: exploreAgraFort },
  { id:'sikandra', name:'Sikandra', dist:'13 km', desc:"Emperor Akbar's grand mausoleum with deer", img: exploreSikandra },
  { id:'itmad-ul-daula', name:'Itmad-ul-Daula', dist:'4 km', desc:'The Baby Taj — exquisite white marble tomb', img: exploreItmad },
  { id:'fatehpur-sikri', name:'Fatehpur Sikri', dist:'40 km', desc:'The abandoned Mughal capital — UNESCO site', img: exploreFatehpur },
  { id:'mehtab-bagh', name:'Mehtab Bagh', dist:'Near Taj', desc:'Best sunset view of the Taj Mahal', img: exploreMehtab },
  { id:'saheed-smarak-park', name:'Saheed Smarak Park', dist:'2 km', desc:'A serene memorial park in the heart of Agra', img: exploreSaheed },
];

const facilities = [
  { icon:'🛏️', name:'Dormitory', stat:'₹200/night', desc:'Budget-friendly shared beds' },
  { icon:'📶', name:'Free WiFi', stat:'High Speed', desc:'Throughout premises' },
  { icon:'🔒', name:'24/7 Security', stat:'CCTV', desc:'Round-the-clock safety' },
  { icon:'🚗', name:'Secure Parking', stat:'50+ Vehicles', desc:'Cars & two-wheelers' },
  { icon:'🏛️', name:'Conference Hall', stat:'₹3,500/3hrs', desc:'Meetings & seminars' },
  { icon:'🍽️', name:'Dining Hall', stat:'₹300/hr', desc:'Hygienic canteen' },
  { icon:'📚', name:'Study Room', stat:'Free', desc:'Quiet study space' },
  { icon:'🛁', name:'Hot Water', stat:'All Rooms', desc:'Geyser in select rooms' },
];

const hostelRules = [
  'Hostel is meant for YHA members. Bonafide students and others connected with YHA movement. Right of admission in the Hostel is reserved.',
  'No local person irrespective of his category of YHA membership, studentship or any other consideration, will be allowed to stay overnight.',
  'Booking through travel agents is prohibited.',
  'Hostel Tariff is subject to revision without prior notice. The management reserves the right to change rates.',
  'Check-out time is 10:00 AM. Late check-out charges may apply.',
  'Consumption of alcohol and smoking is strictly prohibited inside the hostel premises.',
];

const rooms = [
  { id:'office', name:'Youth Hostel Office', img:officeImg, desc:'In-charge of Youth Hostel Agra', sub:'Dr. Shravan Kumar Sehgal', isInfo:true },
  { id:'reception', name:'Reception', img:reception1, desc:'Friendly & Helpful reception desk available for Check IN & Check OUT and guest assistances', isInfo:true },
  { id:'gallery', name:'Youth Hostel Gallery', img:galleryImg, desc:'Our gallery provides a visual overview of the facilities and services available at Youth Hostel Agra', isInfo:true },
  { id:'parking', name:'Hostel Parking Area', img:parkingImg, desc:'Safe and secure parking space available inside the hostel premises with CCTV surveillance 24×7 Security.', isInfo:true },
  { id:'delux', name:'Delux Room', img:deluxImg, desc:'Comfortable Air-Conditioner with Double Bed & Designer Interior', price:'₹1100/- Night', bookable:true },
  { id:'ac', name:'AC Room', img:acImg, desc:'Comfortable air-conditioned room with basic amenities', price:'₹900/- Night', bookable:true },
  { id:'non-ac', name:'Non-AC Room', img:nonAcImg, desc:'Well ventilated non-ac room suitable for budget stay', price:'₹750/- Night', bookable:true },
  { id:'dormitory', name:'Dormitory', img:dormImg, desc:'Shared Accommodation with multiple beds', prices:[{label:'For Others',val:'₹300'},{label:'For Students',val:'₹200'}], bookable:true },
  { id:'conference', name:'Conference Hall', img:confImg, desc:'A fully air-conditioned and well-equipped space, ideal for meetings, seminars, workshops, training programs.', prices:[{label:'Up to 3 Hours',val:'₹3,500'},{label:'Up to 7 Hours',val:'₹7,000'}], bookable:true },
  { id:'lounge', name:'Mini Lounge (Lobby)', img:studyImg, desc:'A comfortable space designed for small meetings, waiting, and informal gatherings.', prices:[{label:'Up to 3 Hours',val:'₹1,800'}], bookable:true },
  { id:'dining', name:'Hostel Dining Area', img:diningImg, desc:'Clean and hygienic dining hall suitable for refreshments, lunch and dinner services.', prices:[{label:'Refreshment (Up to 1 Hr)',val:'₹300'},{label:'Lunch & Dinner (Up to 1 Hr)',val:'₹600'}], bookable:true },
  { id:'study', name:'Study Area & TV Area', img:galleryImg, desc:'Dedicated study area and TV lounge for hostel students to study or relax in a calm environment.', prices:[{label:'Time Limit',val:'30 min – 1 Hour'},{label:'Access',val:'Students Only'}], bookable:false },
];

const Counter = ({ end, suffix='' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start=0; const step=end/60;
        const t=setInterval(()=>{ start+=step; if(start>=end){setCount(end);clearInterval(t);}else setCount(Math.floor(start)); },25);
      }
    },{ threshold:0.5 });
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[end]);
  return <span ref={ref}>{count}{suffix}</span>;
};

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [imgErr, setImgErr] = useState({});
  const exploreRef = useRef(null); // FIX #4: scroll ref

  useEffect(() => {
    const t = setInterval(()=>setSlide(s=>(s+1)%slides.length),5000);
    return ()=>clearInterval(t);
  },[]);

  // FIX #4: smooth scroll to TOP of explore section
  const scrollToExplore = (e) => {
    e.preventDefault();
    if(exploreRef.current) {
      const top = exploreRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior:'smooth' });
    }
  };

  return (
    <div style={{ background:'#0D0D0D' }}>

      {/* GOVERNMENT HEADER — dark, gold text, no logo images */}
      <div style={{ background:'#0D0D0D', padding:'12px 24px', paddingTop:74, display:'flex', alignItems:'center', justifyContent:'center', gap:16, flexWrap:'wrap', borderBottom:'1px solid rgba(201,168,76,0.15)' }}>
        <div style={{ width:44, height:44, background:'linear-gradient(135deg,#C9A84C,#9B7D35)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <span style={{ color:'#000', fontSize:20 }}>🏛️</span>
        </div>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:13, fontWeight:600, color:'#C9A84C' }}>युवा कार्यक्रम एवं खेल मंत्रालय · भारत सरकार</div>
          <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:14, fontWeight:700, color:'#C9A84C' }}>Ministry of Youth Affairs & Sports</div>
          <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:12, color:'rgba(255,255,255,0.6)' }}>Government of India · Est. 1956</div>
        </div>
        <div style={{ width:44, height:44, background:'linear-gradient(135deg,#C9A84C,#9B7D35)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <span style={{ color:'#000', fontSize:20 }}>🇮🇳</span>
        </div>
      </div>

      {/* HERO SLIDER */}
      <div style={{ position:'relative', height:'92vh', overflow:'hidden' }}>
        {slides.map((s,i) => (
          <div key={i} style={{ position:'absolute', inset:0, transition:'opacity 1.2s ease', opacity:i===slide?1:0, zIndex:i===slide?1:0 }}>
            <img src={s.img} alt={s.title} style={{ width:'100%', height:'100%', objectFit:'cover', transform:i===slide?'scale(1.05)':'scale(1)', transition:'transform 6s ease' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.65))' }} />
          </div>
        ))}
        <div style={{ position:'absolute', inset:0, zIndex:5, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 24px' }}>
          <div style={{ background:'rgba(201,168,76,0.15)', border:'1px solid rgba(201,168,76,0.4)', borderRadius:50, padding:'6px 20px', fontSize:11, letterSpacing:3, textTransform:'uppercase', color:'#C9A84C', marginBottom:24, backdropFilter:'blur(10px)' }}>
            Government Approved • Est. 1956
          </div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2.8rem,7vw,6rem)', fontWeight:900, color:'#FFF', lineHeight:1.05, marginBottom:20, textShadow:'0 4px 30px rgba(0,0,0,0.5)', letterSpacing:-1 }}>
            {slides[slide].title}
          </h1>
          <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(0.9rem,2vw,1.2rem)', color:'rgba(255,255,255,0.85)', letterSpacing:2, marginBottom:48, fontWeight:500 }}>
            {slides[slide].sub}
          </p>
          <div style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center' }}>
            <Link to="/rooms" style={{ padding:'16px 40px', background:'linear-gradient(135deg,#C9A84C,#9B7D35)', color:'#000', borderRadius:2, fontSize:13, letterSpacing:2, textTransform:'uppercase', textDecoration:'none', fontWeight:700, fontFamily:'DM Sans,sans-serif', boxShadow:'0 10px 40px rgba(201,168,76,0.4)' }}>Book Now</Link>
            {/* FIX #4: scroll to explore section */}
            <a href="#explore" onClick={scrollToExplore} style={{ padding:'16px 40px', background:'transparent', border:'1px solid rgba(255,255,255,0.5)', color:'#FFF', borderRadius:2, fontSize:13, letterSpacing:2, textTransform:'uppercase', textDecoration:'none', fontWeight:500, fontFamily:'DM Sans,sans-serif', backdropFilter:'blur(10px)' }}>
              Explore Agra
            </a>
          </div>
        </div>
        <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', zIndex:10, display:'flex', gap:10 }}>
          {slides.map((_,i) => (
            <button key={i} onClick={()=>setSlide(i)} style={{ width:i===slide?32:8, height:8, borderRadius:4, background:i===slide?'#C9A84C':'rgba(255,255,255,0.4)', border:'none', cursor:'pointer', transition:'all 0.4s', padding:0 }} />
          ))}
        </div>
      </div>

      {/* STATS */}
      <div style={{ background:'linear-gradient(135deg,#C9A84C 0%,#9B7D35 100%)', padding:'50px 24px' }}>
        <div style={{ maxWidth:1000, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:24, textAlign:'center' }}>
          {[{num:1956,suffix:'',label:'Established'},{num:5600,suffix:'+',label:'Hostels Worldwide'},{num:56,suffix:'',label:'Countries'},{num:10000,suffix:'+',label:'Happy Guests'}].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, color:'#0D0D0D', lineHeight:1 }}><Counter end={s.num} suffix={s.suffix} /></div>
              <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:12, fontWeight:600, letterSpacing:2, textTransform:'uppercase', color:'rgba(0,0,0,0.6)', marginTop:6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HISTORY */}
      <section style={{ padding:'100px 24px', background:'#0D0D0D' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:11, fontWeight:700, letterSpacing:4, textTransform:'uppercase', color:'#C9A84C' }}>Our Story</span>
          <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'#FFF', margin:'12px 0 24px' }}>History</h2>
          <div style={{ width:60, height:2, background:'linear-gradient(90deg,#C9A84C,transparent)', marginBottom:32 }} />
          <div style={{ border:'1px solid rgba(201,168,76,0.15)', borderLeft:'3px solid #C9A84C', borderRadius:'0 4px 4px 0', padding:'32px 40px', background:'rgba(201,168,76,0.03)' }}>
            <p style={{ fontSize:15, color:'#C0B49A', lineHeight:2, textAlign:'justify' }}>
              THE YOUTH HOSTEL MOVEMENT, was the brainchild of an ancient German Richard Schirmann, who believed in the virtues of group excursions to study geography, history and the world of nature. He took delight in organising weeklong trails for students. During an excursion in 1909, one night on 26th August, a terrible storm raged with thunder and lightning. While his young wards were fitfully asleep in the school premises, Richard lay awake toying at the idea of utilising the school buildings during holidays. Thus the first youth hostel was opened in 1912 in Altena, Germany. In 1956, Pt. Jawaharlal Nehru welcomed the growth of the Youth Hostel Movement in India saying: "I welcome the growth of the Youth Hostel Movement in India. Apart from the obvious advantages of travel in various parts of the country, there is, I think, a basic significance in men and women doing so in the impressionable years of our lives." The International Youth Hostel Federation was inaugurated in 1932. At present there are 5600 Youth Hostels in 56 countries covering all the continents.
            </p>
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section style={{ padding:'80px 24px', background:'#111' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', textAlign:'center' }}>
          <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:11, fontWeight:700, letterSpacing:4, textTransform:'uppercase', color:'#C9A84C' }}>What We Offer</span>
          <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(1.8rem,3vw,2.5rem)', fontWeight:700, color:'#FFF', margin:'12px 0 48px' }}>Facilities Available</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:16 }}>
            {facilities.map(f => (
              <div key={f.name} style={{ display:'flex', alignItems:'center', gap:16, padding:'20px 24px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(201,168,76,0.1)', borderLeft:'3px solid #C9A84C', borderRadius:'0 4px 4px 0', transition:'all 0.3s' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='rgba(201,168,76,0.07)'; e.currentTarget.style.transform='translateX(6px)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.transform='translateX(0)'; }}>
                <span style={{ fontSize:24 }}>{f.icon}</span>
                <div style={{ textAlign:'left' }}>
                  <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:15, fontWeight:600, color:'#DDD' }}>{f.name}</div>
                  <div style={{ fontSize:12, color:'#888', marginTop:2 }}>{f.desc}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#C9A84C', marginTop:3 }}>{f.stat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section style={{ padding:'100px 24px', background:'#0D0D0D' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:60 }}>
            <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:11, fontWeight:700, letterSpacing:4, textTransform:'uppercase', color:'#C9A84C' }}>Stay With Us</span>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'#FFF', margin:'12px 0' }}>Accommodation & Room Types</h2>
            <div style={{ width:60, height:2, background:'linear-gradient(90deg,transparent,#C9A84C,transparent)', margin:'0 auto' }} />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(380px,100%),1fr))', gap:28 }}>
            {rooms.map(room => (
              <div key={room.id} style={{ background:'#1A1A1A', border:'1px solid rgba(255,255,255,0.06)', borderRadius:6, overflow:'hidden', transition:'all 0.4s' }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-8px)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.35)'; e.currentTarget.style.boxShadow='0 20px 60px rgba(0,0,0,0.5)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow='none'; }}>
                <div style={{ position:'relative', height:240, overflow:'hidden' }}>
                  <img src={room.img} alt={room.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s ease' }}
                    onMouseEnter={e=>e.target.style.transform='scale(1.06)'}
                    onMouseLeave={e=>e.target.style.transform='scale(1)'} />
                  {room.bookable && <div style={{ position:'absolute', top:14, right:14 }}><span style={{ background:'rgba(201,168,76,0.9)', color:'#000', fontSize:11, fontWeight:700, letterSpacing:1, textTransform:'uppercase', padding:'4px 12px', borderRadius:2 }}>Available</span></div>}
                </div>
                <div style={{ padding:'24px 28px 28px' }}>
                  <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:20, fontWeight:700, color:'#FFF', marginBottom:10 }}>{room.name}</h3>
                  <p style={{ fontSize:14, color:'#888', lineHeight:1.7, marginBottom:room.sub?8:16 }}>{room.desc}</p>
                  {room.sub && <p style={{ fontSize:15, fontWeight:700, color:'#C9A84C', marginBottom:16 }}>{room.sub}</p>}
                  {room.price && (
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:16, marginTop:8 }}>
                      <span style={{ fontSize:13, color:'#888' }}>Price :</span>
                      <span style={{ fontFamily:'Playfair Display,serif', fontSize:18, fontWeight:700, color:'#C9A84C' }}>{room.price}</span>
                    </div>
                  )}
                  {room.prices && room.prices.map(p => (
                    <div key={p.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:10, marginTop:8 }}>
                      <span style={{ fontSize:13, color:'#888' }}>{p.label}</span>
                      <span style={{ fontFamily:'Playfair Display,serif', fontSize:16, fontWeight:700, color:'#C9A84C' }}>{p.val}</span>
                    </div>
                  ))}
                  {room.bookable && (
                    <Link to={`/book/${room.id}`} style={{ display:'block', textAlign:'center', marginTop:20, padding:'12px', background:'linear-gradient(135deg,#C9A84C,#9B7D35)', color:'#000', borderRadius:2, fontSize:12, letterSpacing:2, textTransform:'uppercase', textDecoration:'none', fontWeight:700, fontFamily:'DM Sans,sans-serif' }}>
                      Book This Room
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIX #3 + FIX #4: EXPLORE AGRA — real photos + scroll anchor at TOP */}
      <section id="explore" ref={exploreRef} style={{ padding:'100px 24px', background:'#111', scrollMarginTop:'80px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:60 }}>
            <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:11, fontWeight:700, letterSpacing:4, textTransform:'uppercase', color:'#C9A84C' }}>Nearby Attractions</span>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'#FFF', margin:'12px 0' }}>EXPLORE AGRA</h2>
            <div style={{ width:60, height:2, background:'linear-gradient(90deg,transparent,#C9A84C,transparent)', margin:'0 auto' }} />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(340px,100%),1fr))', gap:24 }}>
            {exploreAgra.map(place => (
              <Link key={place.id} to={`/explore/${place.id}`} style={{ textDecoration:'none' }}>
                <div style={{ background:'#1A1A1A', border:'1px solid rgba(255,255,255,0.06)', borderRadius:6, overflow:'hidden', transition:'all 0.4s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-8px)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.35)'; e.currentTarget.style.boxShadow='0 20px 60px rgba(0,0,0,0.5)'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow='none'; }}>
                  <div style={{ position:'relative', height:220, overflow:'hidden' }}>
                    {!imgErr[place.id] ? (
                      <img src={place.img} alt={place.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s' }}
                        onError={()=>setImgErr(e=>({...e,[place.id]:true}))}
                        onMouseEnter={e=>e.target.style.transform='scale(1.06)'}
                        onMouseLeave={e=>e.target.style.transform='scale(1)'} />
                    ) : (
                      <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,#1A1A1A,#2A2A1A)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:60 }}>🏛️</div>
                    )}
                    <div style={{ position:'absolute', top:12, right:12, background:'rgba(201,168,76,0.9)', borderRadius:2, padding:'3px 10px', fontSize:11, fontWeight:700, color:'#000', letterSpacing:1 }}>{place.dist}</div>
                  </div>
                  <div style={{ padding:'20px 24px' }}>
                    <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:20, fontWeight:700, color:'#FFF', marginBottom:8 }}>{place.name}</h3>
                    <p style={{ fontSize:14, color:'#888', lineHeight:1.65, marginBottom:12 }}>{place.desc}</p>
                    <span style={{ fontSize:12, fontWeight:600, color:'#C9A84C', letterSpacing:1, textTransform:'uppercase' }}>Explore →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOSTEL RULES */}
      <section style={{ padding:'100px 24px', background:'#0D0D0D' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(1.8rem,3vw,2.5rem)', fontWeight:800, color:'#FFF', letterSpacing:2, textTransform:'uppercase' }}>HOSTEL RULES & REGULATIONS</h2>
            <div style={{ width:80, height:2, background:'linear-gradient(90deg,transparent,#C9A84C,transparent)', margin:'16px auto 0' }} />
          </div>
          <div style={{ border:'1px solid rgba(201,168,76,0.2)', borderLeft:'4px solid #C9A84C', borderRadius:'0 8px 8px 0', background:'rgba(201,168,76,0.03)', padding:'32px 40px', maxHeight:360, overflowY:'auto' }}>
            {hostelRules.map((rule,i) => (
              <div key={i} style={{ display:'flex', gap:16, marginBottom:20, paddingBottom:20, borderBottom:i<hostelRules.length-1?'1px solid rgba(255,255,255,0.04)':'none' }}>
                <span style={{ color:'#C9A84C', fontSize:16, marginTop:2, flexShrink:0 }}>✓</span>
                <p style={{ fontSize:14, color:'#AAA', lineHeight:1.85 }}>{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'80px 24px', background:'linear-gradient(135deg,#C9A84C 0%,#9B7D35 50%,#7A6128 100%)', textAlign:'center' }}>
        <div style={{ maxWidth:700, margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(1.8rem,4vw,3rem)', fontWeight:800, color:'#0D0D0D', marginBottom:16 }}>Ready to Experience Agra?</h2>
          <p style={{ fontSize:16, color:'rgba(0,0,0,0.65)', marginBottom:36, lineHeight:1.7 }}>Book your stay at Youth Hostel Agra — affordable, safe and government approved accommodation right in the heart of the city.</p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/rooms" style={{ padding:'16px 44px', background:'#0D0D0D', color:'#C9A84C', borderRadius:2, fontSize:13, letterSpacing:2, textTransform:'uppercase', textDecoration:'none', fontWeight:700, fontFamily:'DM Sans,sans-serif' }}>Book Now</Link>
            <a href="https://wa.me/919368054835" target="_blank" rel="noreferrer" style={{ padding:'16px 44px', background:'#25D366', color:'#FFF', borderRadius:2, fontSize:13, letterSpacing:2, textTransform:'uppercase', textDecoration:'none', fontWeight:700, fontFamily:'DM Sans,sans-serif' }}>💬 WhatsApp Us</a>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/919368054835" target="_blank" rel="noreferrer" className="whatsapp-float">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>
    </div>
  );
}
