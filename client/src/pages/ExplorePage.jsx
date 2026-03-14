import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import slideImg from '../assets/images/slide1.jpeg';
import exploreTajMahal from '../assets/images/explore_taj_mahal.jpeg';
import exploreAgraFort from '../assets/images/explore_agra_fort.jpg';
import exploreFatehpur from '../assets/images/explore_fatehpur_sikri.jpg';
import exploreItmad from '../assets/images/explore_itmad_ul_daula.jpg';
import exploreSikandra from '../assets/images/explore_sikandra.jpg';
import exploreMehtab from '../assets/images/explore_mehtab_bagh.jpg';
import exploreSaheed from '../assets/images/explore_saheed_park.jpg';

const PLACES = [
  { id:'taj-mahal', name:'Taj Mahal', dist:'3 km', emoji:'🕌',
    img: exploreTajMahal, heroImg: exploreTajMahal,
    tagline:'The Monument of Eternal Love',
    desc:'The Taj Mahal is an ivory-white marble mausoleum on the right bank of river Yamuna. It was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife Mumtaz Mahal.',
    history:'Construction of the Taj Mahal began in 1632 and was completed in 1653. Over 20,000 artisans worked under the guidance of a board of architects. The principal architect was Ustad Ahmad Lahauri.',
    facts:{ entry:'₹50 (Indians) / ₹1,100 (Foreigners)', timing:'Sunrise to Sunset (Closed Friday)', built:'1631–1653', builtBy:'Emperor Shah Jahan', unesco:'World Heritage Site 1983' },
    tips:['Visit at sunrise for the best photos and fewer crowds','Photography inside the main mausoleum is not allowed','Carry ID proof for ticket purchase','Wear comfortable shoes as you walk on marble floors'] },
  { id:'agra-fort', name:'Agra Fort', dist:'2.5 km', emoji:'🏰',
    img: exploreAgraFort, heroImg: exploreAgraFort,
    tagline:'The Mighty Mughal Fortress',
    desc:'Agra Fort is a UNESCO World Heritage site about 2.5 km northwest of the Taj Mahal. The Agra fort is a historical fort in the city of Agra in Uttar Pradesh, India.',
    history:'The Agra Fort was built by the Mughal Emperor Akbar in 1565. It was later used by Shah Jahan. The fort served as the main residence of the emperors of the Mughal Dynasty till 1638.',
    facts:{ entry:'₹40 (Indians) / ₹600 (Foreigners)', timing:'Sunrise to Sunset', built:'1565', builtBy:'Emperor Akbar', unesco:'World Heritage Site 1983' },
    tips:['Best visited in the morning or late afternoon','Hire a licensed guide inside for historical context','The Diwan-i-Am and Diwan-i-Khas are must-see halls','Excellent views of the Taj Mahal from the Musamman Burj'] },
  { id:'fatehpur-sikri', name:'Fatehpur Sikri', dist:'40 km', emoji:'🏛️',
    img: exploreFatehpur, heroImg: exploreFatehpur,
    tagline:'The Abandoned Mughal Capital',
    desc:'Fatehpur Sikri is a city and a municipal board in Agra district in the state of Uttar Pradesh, India. The city itself was founded as the capital of the Mughal Empire in 1571 by Emperor Akbar.',
    history:'Fatehpur Sikri was the capital of the Mughal Empire from 1571 to 1585. Akbar abandoned the city due to shortage of water. The entire city complex is built from red sandstone.',
    facts:{ entry:'₹40 (Indians) / ₹610 (Foreigners)', timing:'Sunrise to Sunset', built:'1571', builtBy:'Emperor Akbar', unesco:'World Heritage Site 1986' },
    tips:['Take a guided tour — complex is vast','Best combined with Agra Fort on the same day','The Buland Darwaza is the highest gateway in the world','Try to visit early morning to avoid heat'] },
  { id:'itmad-ul-daula', name:'Itmad-ul-Daula', dist:'4 km', emoji:'💎',
    img: exploreItmad, heroImg: exploreItmad,
    tagline:'The Baby Taj',
    desc:'The tomb of Itmad-ud-Daula is a Mughal mausoleum in Agra. Sometimes described as a jewel box, it is often called the Baby Taj as it is considered the draft for the Taj Mahal.',
    history:'Built between 1622 and 1628 by Nur Jahan (wife of Emperor Jahangir) for her father Mirza Ghiyas Beg. It was the first Mughal structure to be built entirely from white marble with pietra dura inlay work.',
    facts:{ entry:'₹25 (Indians) / ₹310 (Foreigners)', timing:'Sunrise to Sunset', built:'1622–1628', builtBy:'Empress Nur Jahan', unesco:'ASI Protected Monument' },
    tips:['Less crowded than Taj Mahal — great for photography','The inlay work is incredibly detailed up close','Located by the river — beautiful surroundings','Can be visited en route to Taj Mahal'] },
  { id:'sikandra', name:'Sikandra', dist:'13 km', emoji:'🌿',
    img: exploreSikandra, heroImg: exploreSikandra,
    tagline:"Emperor Akbar's Grand Mausoleum",
    desc:"Sikandra is a suburb of Agra city that holds the Tomb of Akbar the Great — the third Mughal emperor. The tomb is set in large grounds with deer, monkeys and birds freely roaming.",
    history:"Akbar himself designed and partially built his own tomb between 1600 and 1605. It was completed by his son Jahangir in 1613. The complex blends Hindu, Islamic and Christian styles of architecture.",
    facts:{ entry:'₹30 (Indians) / ₹310 (Foreigners)', timing:'Sunrise to Sunset', built:'1605–1613', builtBy:'Emperor Akbar / Jahangir', unesco:'ASI Protected Monument' },
    tips:['Deer roam freely inside — great for wildlife photography','The main gate is one of the finest examples of Mughal architecture','Combine with a visit to Taj Mahal on the same day','Morning visits recommended for clear photography'] },
  { id:'mehtab-bagh', name:'Mehtab Bagh', dist:'Near Taj Mahal', emoji:'🌙',
    img: exploreMehtab, heroImg: exploreMehtab,
    tagline:'The Moonlight Garden',
    desc:'Mehtab Bagh (Moonlight Garden) is a charbagh complex located in Agra, India, across the Yamuna river from the Taj Mahal. It offers the best unobstructed view of the Taj Mahal.',
    history:"Mehtab Bagh was originally built by the Mughal Emperor Babur in the 16th century. It was later restored by Shah Jahan as part of the extended Taj Mahal complex along the Yamuna riverfront.",
    facts:{ entry:'₹20 (Indians) / ₹200 (Foreigners)', timing:'Sunrise to Sunset', built:'16th Century', builtBy:'Emperor Babur', unesco:'Part of Taj Mahal Complex' },
    tips:['Best place to photograph Taj Mahal at sunset','Less crowded than the Taj Mahal itself','Walk along the Yamuna riverfront for beautiful views','Combine with Taj Mahal visit — located directly opposite'] },
];

// Detail Page
function ExploreDetailPage({ id }) {
  const place = PLACES.find(p => p.id === id);
  const [imgErr, setImgErr] = useState(false);
  const [heroErr, setHeroErr] = useState(false);

  if (!place) return (
    <div style={{ padding:'120px 24px', textAlign:'center' }}>
      <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:28, marginBottom:16 }}>Place not found</h2>
      <Link to="/explore" style={{ color:'#8B6914', fontWeight:600 }}>← Back to Explore</Link>
    </div>
  );

  return (
    <div style={{ background:'#fff' }}>
      {/* Hero */}
      <div style={{ position:'relative', height:450, overflow:'hidden' }}>
        {!heroErr ? (
          <img src={place.heroImg} alt={place.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={()=>setHeroErr(true)} />
        ) : (
          <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,#F2EDE3,#C9A84C)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:100 }}>{place.emoji}</div>
        )}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'0 6vw 48px' }}>
          <Link to="/explore" style={{ fontSize:13, color:'rgba(255,255,255,0.75)', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:6, marginBottom:16 }}>← All Attractions</Link>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:3, color:'#C9A84C', textTransform:'uppercase', marginBottom:8 }}>{place.dist} from Youth Hostel Agra</div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:800, color:'#fff' }}>{place.name}</h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.8)', marginTop:8 }}>{place.tagline}</p>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'64px 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:56, alignItems:'start' }}>
          <div>
            <p style={{ fontSize:16, color:'#4A4A4A', lineHeight:1.9, marginBottom:32 }}>{place.desc}</p>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:24, fontWeight:700, color:'#1A1A1A', marginBottom:14 }}>History</h2>
            <div style={{ width:40, height:3, background:'#C9A84C', borderRadius:2, marginBottom:20 }} />
            <p style={{ fontSize:15, color:'#4A4A4A', lineHeight:1.9, marginBottom:36 }}>{place.history}</p>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:24, fontWeight:700, color:'#1A1A1A', marginBottom:14 }}>Visitor Tips</h2>
            <div style={{ width:40, height:3, background:'#C9A84C', borderRadius:2, marginBottom:20 }} />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {place.tips.map((tip,i) => (
                <div key={i} style={{ display:'flex', gap:12, padding:'16px 18px', background:'#F8F6F1', border:'1px solid #E8E2D9', borderRadius:12 }}>
                  <div style={{ width:22, height:22, borderRadius:'50%', background:'#2E7D32', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ color:'#fff', fontSize:11, fontWeight:700 }}>✓</span>
                  </div>
                  <p style={{ fontSize:13, color:'#4A4A4A', lineHeight:1.6 }}>{tip}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop:48, padding:'28px 32px', background:'#1A1A1A', borderRadius:18 }}>
              <div style={{ fontFamily:'Playfair Display,serif', fontSize:20, fontWeight:700, color:'#fff', marginBottom:8 }}>Stay Nearby</div>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.6)', marginBottom:20 }}>Youth Hostel Agra is just {place.dist} from {place.name}. Book your affordable stay now!</p>
              <div style={{ display:'flex', gap:12 }}>
                <Link to="/rooms" style={{ padding:'12px 24px', background:'#fff', color:'#1A1A1A', borderRadius:8, fontSize:14, fontWeight:700, textDecoration:'none' }}>Book Stay</Link>
                <a href="https://wa.me/919368054835" target="_blank" rel="noreferrer" style={{ padding:'12px 24px', background:'#25D366', color:'#fff', borderRadius:8, fontSize:14, fontWeight:600, textDecoration:'none' }}>WhatsApp</a>
              </div>
            </div>
          </div>

          {/* Sidebar facts */}
          <div style={{ position:'sticky', top:100 }}>
            <div style={{ background:'#F8F6F1', border:'1px solid #E8E2D9', borderRadius:18, padding:'28px 24px', marginBottom:20 }}>
              <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:18, fontWeight:700, color:'#1A1A1A', marginBottom:20 }}>Key Facts</h3>
              {Object.entries(place.facts).map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14, paddingBottom:14, borderBottom:'1px solid #E8E2D9' }}>
                  <span style={{ fontSize:12, color:'#7A7A7A', textTransform:'uppercase', letterSpacing:1, fontWeight:600, flex:1 }}>{k.replace(/-/g,' ')}</span>
                  <span style={{ fontSize:13, color:'#1A1A1A', fontWeight:600, textAlign:'right', flex:1.5 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background:'#FDF8EE', border:'1px solid #E8D5A0', borderRadius:18, padding:'24px' }}>
              <div style={{ fontSize:12, fontWeight:700, color:'#8B6914', letterSpacing:2, textTransform:'uppercase', marginBottom:8 }}>Distance from Hostel</div>
              <div style={{ fontFamily:'Playfair Display,serif', fontSize:28, fontWeight:800, color:'#8B6914' }}>{place.dist}</div>
              <div style={{ fontSize:13, color:'#7A7A7A', marginTop:4 }}>Youth Hostel Agra</div>
            </div>
          </div>
        </div>

        {/* Other places */}
        <div style={{ marginTop:72 }}>
          <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:28, fontWeight:700, color:'#1A1A1A', marginBottom:8 }}>Other Attractions</h2>
          <div style={{ width:40, height:3, background:'#C9A84C', borderRadius:2, marginBottom:32 }} />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:20 }}>
            {PLACES.filter(p=>p.id!==id).slice(0,4).map(p => (
              <Link key={p.id} to={`/explore/${p.id}`} style={{ textDecoration:'none' }}>
                <div className="card">
                  <div style={{ height:150, overflow:'hidden' }}>
                    <img src={p.img} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s' }}
                      onMouseEnter={e=>e.target.style.transform='scale(1.06)'}
                      onMouseLeave={e=>e.target.style.transform='scale(1)'} />
                  </div>
                  <div style={{ padding:'14px 16px' }}>
                    <div style={{ fontFamily:'Playfair Display,serif', fontSize:15, fontWeight:700, color:'#1A1A1A', marginBottom:4 }}>{p.name}</div>
                    <div style={{ fontSize:12, color:'#8B6914', fontWeight:600 }}>{p.dist} away</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// List Page
function ExploreListPage() {
  const [imgErr, setImgErr] = useState({});
  return (
    <div style={{ background:'#fff' }}>
      <div style={{ position:'relative', height:320, overflow:'hidden' }}>
        <img src={PLACES[0].img} alt="Explore Agra" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.25) 100%)' }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 6vw' }}>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:3.5, textTransform:'uppercase', color:'#C9A84C', marginBottom:10 }}>Discover</span>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,5vw,3.2rem)', fontWeight:800, color:'#fff', marginBottom:12 }}>Explore Agra</h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.8)', maxWidth:480 }}>UNESCO World Heritage Sites and magnificent monuments — all within easy reach from Youth Hostel Agra.</p>
        </div>
      </div>

      <section style={{ padding:'72px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:28 }}>
            {PLACES.map(p => (
              <Link key={p.id} to={`/explore/${p.id}`} style={{ textDecoration:'none' }}>
                <div className="card">
                  <div style={{ height:240, overflow:'hidden', position:'relative' }}>
                    {!imgErr[p.id] ? (
                      <img src={p.img} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s' }}
                        onError={()=>setImgErr(e=>({...e,[p.id]:true}))}
                        onMouseEnter={e=>e.target.style.transform='scale(1.06)'}
                        onMouseLeave={e=>e.target.style.transform='scale(1)'} />
                    ) : (
                      <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,#F2EDE3,#E8D5A0)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:70 }}>{p.emoji}</div>
                    )}
                    <div style={{ position:'absolute', top:14, right:14, background:'rgba(255,255,255,0.93)', borderRadius:50, padding:'4px 14px', fontSize:11, fontWeight:600, color:'#8B6914' }}>{p.dist}</div>
                  </div>
                  <div style={{ padding:'20px 24px' }}>
                    <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:21, fontWeight:700, color:'#1A1A1A', marginBottom:8 }}>{p.name}</h3>
                    <p style={{ fontSize:14, color:'#7A7A7A', lineHeight:1.65, marginBottom:14 }}>{p.desc}</p>
                    <span style={{ fontSize:13, fontWeight:600, color:'#8B6914', display:'flex', alignItems:'center', gap:4 }}>Explore More →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ExplorePage() {
  const { placeId } = useParams();
  return placeId ? <ExploreDetailPage id={placeId} /> : <ExploreListPage />;
}
