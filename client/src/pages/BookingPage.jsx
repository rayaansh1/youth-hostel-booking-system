import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import deluxImg from '../assets/images/delux_room.jpeg';
import acImg from '../assets/images/ac_room.jpeg';
import nonAcImg from '../assets/images/non-ac_room.jpeg';
import dormImg from '../assets/images/doormetry1.jpeg';
import confImg from '../assets/images/confrence1.jpeg';
import studyImg from '../assets/images/study1.jpeg';
import diningImg from '../assets/images/dinning1.jpeg';

const roomData = {
  delux: { name: 'Delux Room', img: deluxImg, price: 1100, unit: 'Night', desc: 'Comfortable Air-Conditioner with Double Bed & Designer Interior', amenities: ['Air Conditioning', 'Double Bed', 'WiFi', 'Attached Bathroom', 'Geyser', 'Wardrobe'] },
  ac: { name: 'AC Room', img: acImg, price: 900, unit: 'Night', desc: 'Comfortable air-conditioned room with basic amenities', amenities: ['Air Conditioning', 'Double Bed', 'WiFi', 'Attached Bathroom'] },
  'non-ac': { name: 'Non-AC Room', img: nonAcImg, price: 750, unit: 'Night', desc: 'Well ventilated non-ac room suitable for budget stay', amenities: ['Ceiling Fan', 'Double Bed', 'WiFi', 'Shared Bathroom'] },
  dormitory: { name: 'Dormitory', img: dormImg, price: 300, priceStudent: 200, unit: 'Night', desc: 'Shared Accommodation with multiple beds', amenities: ['Ceiling Fan', 'Shared Beds', 'WiFi', 'Shared Bathroom', 'Locker'] },
  conference: { name: 'Conference Hall', img: confImg, price: 3500, price7: 7000, unit: '3 Hours', desc: 'Fully AC conference hall for meetings, seminars & workshops', amenities: ['Air Conditioning', 'Projector', 'Whiteboard', 'Sound System', 'Stage', '100+ Seats'] },
  lounge: { name: 'Mini Lounge (Lobby)', img: studyImg, price: 1800, unit: '3 Hours', desc: 'Comfortable space for small meetings and informal gatherings', amenities: ['Air Conditioning', 'Comfortable Seating', 'TV'] },
  dining: { name: 'Hostel Dining Area', img: diningImg, price: 300, priceMeal: 600, unit: '1 Hour', desc: 'Clean and hygienic dining hall for refreshments & meals', amenities: ['Hygienic', 'Large Capacity', 'Self Service', 'Dining Tables'] },
};

const BookingPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = roomData[roomId];
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ guestName: '', guestEmail: '', guestPhone: '', checkIn: '', checkOut: '', guests: 1, specialRequests: '', isStudent: false });

  if (!room) return (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, paddingTop: 80 }}>
      <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#FFF', fontSize: 28 }}>Room not found</h2>
      <Link to="/rooms" style={{ color: '#C9A84C', textDecoration: 'none' }}>← Back to Rooms</Link>
    </div>
  );

  const calcTotal = () => {
    if (!form.checkIn || !form.checkOut) return room.price;
    const nights = Math.max(1, Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24)));
    const basePrice = (roomId === 'dormitory' && form.isStudent) ? (room.priceStudent || room.price) : room.price;
    return basePrice * nights;
  };

  const nights = form.checkIn && form.checkOut
    ? Math.max(1, Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24)))
    : 1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.guestName || !form.guestEmail || !form.guestPhone || !form.checkIn || !form.checkOut) {
      alert('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const bookingData = {
        ...form,
        roomType: roomId,
        roomName: room.name,
        totalAmount: calcTotal(),
        checkIn: new Date(form.checkIn).toISOString(),
        checkOut: new Date(form.checkOut).toISOString(),
      };

      // Save to MongoDB
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();

      // Open WhatsApp
      if (data.whatsappURL) window.open(data.whatsappURL, '_blank');

      navigate('/booking-confirm', { state: { booking: data.booking, room } });
    } catch (err) {
      // Offline fallback — still open WhatsApp
      const bookingId = 'YHA' + Date.now().toString().slice(-6);
      const msg = `🏨 *NEW BOOKING - Youth Hostel Agra*\n\n📋 *Booking ID:* ${bookingId}\n👤 *Guest:* ${form.guestName}\n📞 *Phone:* ${form.guestPhone}\n📧 *Email:* ${form.guestEmail}\n🛏️ *Room:* ${room.name}\n📅 *Check-in:* ${form.checkIn}\n📅 *Check-out:* ${form.checkOut}\n👥 *Guests:* ${form.guests}\n💰 *Total:* ₹${calcTotal()}\n📝 *Requests:* ${form.specialRequests || 'None'}`;
      window.open(`https://wa.me/919368054835?text=${encodeURIComponent(msg)}`, '_blank');
      navigate('/booking-confirm', { state: { booking: { bookingId, ...form, roomName: room.name, totalAmount: calcTotal() }, room } });
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', paddingTop: 80 }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
        <img src={room.img} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Reserve Your Stay</span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#FFF' }}>Book {room.name}</h1>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40 }}>

        {/* Booking Form */}
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#FFF', marginBottom: 8 }}>Guest Information</h2>
          <div style={{ width: 40, height: 2, background: '#C9A84C', marginBottom: 32 }} />
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              {[
                { label: 'Full Name *', key: 'guestName', type: 'text', placeholder: 'Enter your full name' },
                { label: 'Email Address *', key: 'guestEmail', type: 'email', placeholder: 'your@email.com' },
                { label: 'Phone Number *', key: 'guestPhone', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
                { label: 'Number of Guests', key: 'guests', type: 'number', placeholder: '1', min: 1, max: 10 },
                { label: 'Check-in Date *', key: 'checkIn', type: 'date' },
                { label: 'Check-out Date *', key: 'checkOut', type: 'date' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#9A9A9A', marginBottom: 8 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} min={f.min} max={f.max}
                    value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{ width: '100%', padding: '13px 16px', background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2, color: '#FFF', fontFamily: 'DM Sans, sans-serif', fontSize: 14, outline: 'none', colorScheme: 'dark' }}
                    onFocus={e => e.target.style.borderColor = '#C9A84C'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>
              ))}
            </div>

            {roomId === 'dormitory' && (
              <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                <input type="checkbox" id="student" checked={form.isStudent} onChange={e => setForm({ ...form, isStudent: e.target.checked })} style={{ accentColor: '#C9A84C', width: 16, height: 16 }} />
                <label htmlFor="student" style={{ fontSize: 14, color: '#CCC', cursor: 'pointer' }}>I am a student (₹200 rate applies)</label>
              </div>
            )}

            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#9A9A9A', marginBottom: 8 }}>Special Requests</label>
              <textarea rows={4} placeholder="Any special requirements or requests..." value={form.specialRequests} onChange={e => setForm({ ...form, specialRequests: e.target.value })}
                style={{ width: '100%', padding: '13px 16px', background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2, color: '#FFF', fontFamily: 'DM Sans, sans-serif', fontSize: 14, resize: 'vertical', outline: 'none' }}
                onFocus={e => e.target.style.borderColor = '#C9A84C'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>

            <button type="submit" disabled={loading} style={{ width: '100%', padding: '16px', background: loading ? '#555' : 'linear-gradient(135deg, #C9A84C, #9B7D35)', color: '#000', border: 'none', borderRadius: 2, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, fontFamily: 'DM Sans, sans-serif', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s' }}>
              {loading ? 'Processing...' : '✓ Confirm Booking & Send WhatsApp'}
            </button>
            <p style={{ textAlign: 'center', fontSize: 12, color: '#666', marginTop: 12 }}>A WhatsApp message will be sent to the hostel owner for confirmation</p>
          </form>
        </div>

        {/* Booking Summary */}
        <div>
          <div style={{ background: '#1A1A1A', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 6, overflow: 'hidden', position: 'sticky', top: 100 }}>
            <img src={room.img} alt={room.name} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
            <div style={{ padding: 28 }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#FFF', marginBottom: 6 }}>{room.name}</h3>
              <p style={{ fontSize: 13, color: '#888', marginBottom: 20, lineHeight: 1.6 }}>{room.desc}</p>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16, marginBottom: 16 }}>
                {[
                  { label: 'Room Type', val: room.name },
                  { label: 'Check-in', val: form.checkIn || '—' },
                  { label: 'Check-out', val: form.checkOut || '—' },
                  { label: 'Duration', val: form.checkIn && form.checkOut ? `${nights} Night${nights > 1 ? 's' : ''}` : '—' },
                  { label: 'Guests', val: form.guests },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: 13, color: '#888' }}>{r.label}</span>
                    <span style={{ fontSize: 13, color: '#DDD', fontWeight: 500 }}>{r.val}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid rgba(201,168,76,0.2)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#FFF' }}>Total Amount</span>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 800, color: '#C9A84C' }}>₹{calcTotal().toLocaleString()}</span>
              </div>

              <div style={{ marginTop: 20 }}>
                <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#9A9A9A', marginBottom: 12 }}>Amenities</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {room.amenities.map(a => (
                    <span key={a} style={{ padding: '4px 10px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C', fontSize: 11, borderRadius: 50 }}>✓ {a}</span>
                  ))}
                </div>
              </div>

              <a href="https://wa.me/919368054835" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20, padding: '11px', background: '#25D366', color: '#FFF', borderRadius: 2, fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>
                💬 Chat with Hostel
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:900px){.booking-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
};

export default BookingPage;
