import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ROOMS = [
  { id:'delux', name:'Delux Room', price:'₹1,100/night', capacity:2, total:3 },
  { id:'ac', name:'AC Room', price:'₹900/night', capacity:2, total:5 },
  { id:'non-ac', name:'Non-AC Room', price:'₹750/night', capacity:2, total:6 },
  { id:'dorm-others', name:'Dormitory (Others)', price:'₹300/night', capacity:1, total:20 },
  { id:'dorm-students', name:'Dormitory (Students)', price:'₹200/night', capacity:1, total:20 },
];

// Simulate some random bookings
const getAvailable = (roomId, dateStr) => {
  const seed = (roomId+dateStr).split('').reduce((a,c)=>a+c.charCodeAt(0),0);
  const room = ROOMS.find(r=>r.id===roomId);
  if(!room) return 0;
  const booked = seed % (room.total+1);
  return Math.max(0, room.total - booked);
};

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export default function AvailabilityPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(null);
  const [roomFilter, setRoomFilter] = useState('all');

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();

  const prevMonth = () => { if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1); };
  const nextMonth = () => { if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1); };

  const getDateStr = (d) => `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  const isPast = (d) => new Date(getDateStr(d)) < new Date(today.toDateString());

  const getStatusColor = (available, total) => {
    if(available === 0) return '#EF4444';
    if(available <= total * 0.3) return '#F59E0B';
    return '#22C55E';
  };

  const selectedDate = selected ? getDateStr(selected) : null;
  const filteredRooms = roomFilter==='all' ? ROOMS : ROOMS.filter(r=>r.id===roomFilter);

  return (
    <div style={{ background:'#0D0D0D', minHeight:'100vh', paddingTop:80 }}>
      <div style={{ background:'linear-gradient(135deg,#C9A84C,#9B7D35)', padding:'60px 24px', textAlign:'center' }}>
        <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:800, color:'#000', marginBottom:8 }}>Room Availability</h1>
        <p style={{ fontSize:15, color:'rgba(0,0,0,0.6)' }}>Check real-time availability for any date</p>
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'60px 24px', display:'grid', gridTemplateColumns:'1fr 380px', gap:40, alignItems:'start' }}>

        {/* Calendar */}
        <div>
          <div style={{ background:'#1A1A1A', border:'1px solid rgba(201,168,76,0.2)', borderRadius:14, padding:'28px', marginBottom:24 }}>
            {/* Month nav */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
              <button onClick={prevMonth} style={{ background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.3)', color:'#C9A84C', padding:'8px 16px', borderRadius:6, cursor:'pointer', fontSize:18, fontFamily:'DM Sans,sans-serif' }}>‹</button>
              <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:22, color:'#FFF', fontWeight:700 }}>{MONTHS[month]} {year}</h2>
              <button onClick={nextMonth} style={{ background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.3)', color:'#C9A84C', padding:'8px 16px', borderRadius:6, cursor:'pointer', fontSize:18, fontFamily:'DM Sans,sans-serif' }}>›</button>
            </div>
            {/* Days header */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:4, marginBottom:8 }}>
              {DAYS.map(d=><div key={d} style={{ textAlign:'center', fontSize:11, color:'#666', fontWeight:600, padding:'6px 0', letterSpacing:1 }}>{d}</div>)}
            </div>
            {/* Calendar grid */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:4 }}>
              {Array.from({length:firstDay}).map((_,i)=><div key={'e'+i} />)}
              {Array.from({length:daysInMonth}).map((_,i)=>{
                const d = i+1;
                const past = isPast(d);
                const isToday = d===today.getDate() && month===today.getMonth() && year===today.getFullYear();
                const isSel = selected===d;
                // Overall availability for this day
                const totalAvail = ROOMS.reduce((sum,r)=>sum+getAvailable(r.id,getDateStr(d)),0);
                const totalRooms = ROOMS.reduce((sum,r)=>sum+r.total,0);
                const color = past ? '#333' : getStatusColor(totalAvail, totalRooms);

                return (
                  <button key={d} onClick={()=>!past&&setSelected(d)} disabled={past}
                    style={{ aspectRatio:'1', borderRadius:8, border:isSel?'2px solid #C9A84C':isToday?'1px solid rgba(201,168,76,0.5)':'1px solid transparent',
                      background:isSel?'rgba(201,168,76,0.2)':past?'transparent':'rgba(255,255,255,0.02)',
                      color:past?'#333':'#FFF', cursor:past?'default':'pointer', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:2,
                      fontSize:14, fontFamily:'DM Sans,sans-serif', fontWeight:isToday?700:400, transition:'all 0.2s',
                      opacity:past?0.4:1 }}
                    onMouseEnter={e=>!past&&(e.currentTarget.style.background='rgba(201,168,76,0.1)')}
                    onMouseLeave={e=>e.currentTarget.style.background=isSel?'rgba(201,168,76,0.2)':'rgba(255,255,255,0.02)'}>
                    <span>{d}</span>
                    {!past && <span style={{ width:6, height:6, borderRadius:'50%', background:color, display:'block' }} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div style={{ display:'flex', gap:20, justifyContent:'center' }}>
            {[['#22C55E','Available'],['#F59E0B','Limited'],['#EF4444','Full']].map(([c,l])=>(
              <div key={l} style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ width:10, height:10, borderRadius:'50%', background:c, display:'block' }} />
                <span style={{ fontSize:12, color:'#666' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Availability Details */}
        <div style={{ position:'sticky', top:100 }}>
          <div style={{ background:'#1A1A1A', border:'1px solid rgba(201,168,76,0.2)', borderRadius:14, padding:'24px' }}>
            {selectedDate ? (
              <>
                <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:18, color:'#FFF', marginBottom:4 }}>
                  {new Date(selectedDate+'T00:00:00').toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}
                </h3>
                <p style={{ fontSize:12, color:'#666', marginBottom:20 }}>Room availability for selected date</p>
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {filteredRooms.map(room => {
                    const avail = getAvailable(room.id, selectedDate);
                    const color = getStatusColor(avail, room.total);
                    return (
                      <div key={room.id} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:10, padding:'14px 16px' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                          <div>
                            <div style={{ fontSize:14, fontWeight:600, color:'#FFF' }}>{room.name}</div>
                            <div style={{ fontSize:12, color:'#C9A84C', marginTop:2 }}>{room.price}</div>
                          </div>
                          <div style={{ textAlign:'right' }}>
                            <div style={{ fontSize:18, fontWeight:800, color }}>{avail}</div>
                            <div style={{ fontSize:10, color:'#555' }}>of {room.total} free</div>
                          </div>
                        </div>
                        <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:50, height:4, overflow:'hidden' }}>
                          <div style={{ height:'100%', width:`${(avail/room.total)*100}%`, background:color, borderRadius:50, transition:'width 0.4s' }} />
                        </div>
                        {avail > 0 && (
                          <Link to={`/book/${room.id}`} style={{ display:'block', marginTop:12, padding:'8px', background:'linear-gradient(135deg,#C9A84C,#9B7D35)', color:'#000', borderRadius:6, fontSize:12, fontWeight:700, textDecoration:'none', textAlign:'center', letterSpacing:1, textTransform:'uppercase' }}>
                            Book Now
                          </Link>
                        )}
                        {avail === 0 && <div style={{ marginTop:8, textAlign:'center', fontSize:12, color:'#EF4444' }}>Fully Booked</div>}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div style={{ textAlign:'center', padding:'40px 20px' }}>
                <div style={{ fontSize:48, marginBottom:16 }}>📅</div>
                <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:18, color:'#FFF', marginBottom:8 }}>Select a Date</h3>
                <p style={{ fontSize:13, color:'#555' }}>Click any date on the calendar to see room availability</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
