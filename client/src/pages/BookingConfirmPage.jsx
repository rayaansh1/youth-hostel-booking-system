import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import QRCode from 'qrcode';

export default function BookingConfirmPage() {
  const loc = useLocation();
  const booking = loc.state?.booking || {
    bookingId: 'YHA' + Date.now(),
    roomId: 'ac',
    roomName: 'AC Room',
    guestName: 'Guest',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now()+86400000).toISOString().split('T')[0],
    guests: 1,
    price: '₹900',
    phone: '',
  };

  const printRef = useRef();

  const handleDownloadPDF = async () => {
    const canvas = document.createElement('canvas');
    await QRCode.toCanvas(canvas, booking.bookingId, { width: 120 });
    const qrDataUrl = canvas.toDataURL();

    const win = window.open('', '_blank');
    win.document.write(`
      <html><head><title>Booking Receipt - ${booking.bookingId}</title>
      <style>
        body { font-family: 'DM Sans', Arial, sans-serif; background: #fff; color: #111; margin: 0; padding: 0; }
        .receipt { max-width: 600px; margin: 0 auto; padding: 40px; }
        .header { background: linear-gradient(135deg, #C9A84C, #9B7D35); padding: 28px 32px; border-radius: 8px 8px 0 0; display: flex; justify-content: space-between; align-items: center; }
        .header h1 { color: #000; font-size: 22px; margin: 0; font-family: Georgia, serif; }
        .header p { color: rgba(0,0,0,0.6); font-size: 12px; margin: 4px 0 0; }
        .body { border: 2px solid #C9A84C; border-top: none; border-radius: 0 0 8px 8px; padding: 28px 32px; }
        .booking-id { text-align: center; background: #FDF8EE; border: 1px solid #C9A84C; border-radius: 6px; padding: 16px; margin-bottom: 24px; }
        .booking-id h2 { font-size: 28px; color: #8B6914; margin: 0; letter-spacing: 3px; font-family: Georgia, serif; }
        .booking-id p { color: #888; font-size: 12px; margin: 4px 0 0; }
        .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #F0EAE0; }
        .row:last-child { border-bottom: none; }
        .label { color: #888; font-size: 13px; }
        .value { color: #111; font-size: 13px; font-weight: 600; }
        .qr-section { text-align: center; margin-top: 24px; padding-top: 24px; border-top: 1px dashed #C9A84C; }
        .qr-section img { width: 120px; height: 120px; }
        .qr-section p { font-size: 11px; color: #888; margin-top: 8px; }
        .footer { text-align: center; margin-top: 20px; font-size: 11px; color: #888; }
        @media print { body { print-color-adjust: exact; } }
      </style></head>
      <body>
        <div class="receipt">
          <div class="header">
            <div><h1>Youth Hostel Agra</h1><p>Ministry of Youth Affairs & Sports, Govt. of India</p></div>
            <div style="text-align:right"><p style="font-size:11px;color:rgba(0,0,0,0.5)">BOOKING RECEIPT</p><p style="font-size:12px;font-weight:600;color:#000">${new Date().toLocaleDateString('en-IN')}</p></div>
          </div>
          <div class="body">
            <div class="booking-id">
              <p>Booking Reference</p>
              <h2>${booking.bookingId}</h2>
              <p>Please show this ID at check-in</p>
            </div>
            <div class="row"><span class="label">Guest Name</span><span class="value">${booking.guestName}</span></div>
            <div class="row"><span class="label">Room Type</span><span class="value">${booking.roomName}</span></div>
            <div class="row"><span class="label">Check-In</span><span class="value">${booking.checkIn}</span></div>
            <div class="row"><span class="label">Check-Out</span><span class="value">${booking.checkOut}</span></div>
            <div class="row"><span class="label">Guests</span><span class="value">${booking.guests}</span></div>
            <div class="row"><span class="label">Amount</span><span class="value" style="color:#8B6914;font-size:16px">${booking.price}</span></div>
            <div class="row"><span class="label">Status</span><span class="value" style="color:#2E7D32">✓ Confirmed</span></div>
            <div class="qr-section">
              <img src="${qrDataUrl}" alt="QR Code" />
              <p>Scan at check-in counter</p>
            </div>
          </div>
          <div class="footer">MG Road, Agra, Uttar Pradesh | +91 9368054835 | myh.agra@gmail.com</div>
        </div>
        <script>window.onload = () => { window.print(); }</script>
      </body></html>
    `);
    win.document.close();
  };

  return (
    <div style={{ background:'#0D0D0D', minHeight:'100vh', padding:'120px 24px 80px' }}>
      <div style={{ maxWidth:600, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ width:80, height:80, borderRadius:'50%', background:'linear-gradient(135deg,#C9A84C,#9B7D35)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontSize:36 }}>✓</div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'2rem', color:'#FFF', marginBottom:8 }}>Booking Confirmed!</h1>
          <p style={{ color:'#888', fontSize:15 }}>Your stay has been reserved. WhatsApp confirmation sent to owner.</p>
        </div>

        <div style={{ background:'#1A1A1A', border:'1px solid rgba(201,168,76,0.3)', borderRadius:12, overflow:'hidden', marginBottom:24 }}>
          <div style={{ background:'linear-gradient(135deg,#C9A84C,#9B7D35)', padding:'20px 28px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontFamily:'Playfair Display,serif', fontSize:18, fontWeight:700, color:'#000' }}>Youth Hostel Agra</div>
              <div style={{ fontSize:11, color:'rgba(0,0,0,0.6)' }}>Ministry of Youth Affairs & Sports</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:11, color:'rgba(0,0,0,0.5)' }}>BOOKING RECEIPT</div>
              <div style={{ fontSize:13, fontWeight:700, color:'#000' }}>{new Date().toLocaleDateString('en-IN')}</div>
            </div>
          </div>
          <div style={{ padding:'24px 28px' }}>
            <div style={{ textAlign:'center', background:'rgba(201,168,76,0.05)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:8, padding:'16px', marginBottom:24 }}>
              <div style={{ fontSize:12, color:'#888', marginBottom:4 }}>Booking Reference</div>
              <div style={{ fontFamily:'Playfair Display,serif', fontSize:28, fontWeight:800, color:'#C9A84C', letterSpacing:3 }}>{booking.bookingId}</div>
              <div style={{ fontSize:11, color:'#666', marginTop:4 }}>Show this ID at check-in</div>
            </div>
            {[['Guest Name',booking.guestName],['Room Type',booking.roomName],['Check-In',booking.checkIn],['Check-Out',booking.checkOut],['No. of Guests',booking.guests],['Amount',booking.price],['Status','✓ Confirmed']].map(([l,v]) => (
              <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize:13, color:'#888' }}>{l}</span>
                <span style={{ fontSize:13, fontWeight:600, color:l==='Status'?'#4CAF50':l==='Amount'?'#C9A84C':'#FFF' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
          <button onClick={handleDownloadPDF} style={{ flex:1, padding:'14px', background:'linear-gradient(135deg,#C9A84C,#9B7D35)', color:'#000', border:'none', borderRadius:6, fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif', letterSpacing:1 }}>
            📄 Download PDF Receipt
          </button>
          <a href={`https://wa.me/917060563072?text=Booking+Confirmed+${booking.bookingId}+for+${booking.roomName}+CheckIn:${booking.checkIn}`} target="_blank" rel="noreferrer"
            style={{ flex:1, padding:'14px', background:'#25D366', color:'#FFF', border:'none', borderRadius:6, fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif', letterSpacing:1, textDecoration:'none', textAlign:'center', display:'block' }}>
            💬 Share on WhatsApp
          </a>
        </div>
        <div style={{ textAlign:'center', marginTop:20 }}>
          <Link to="/" style={{ color:'#C9A84C', textDecoration:'none', fontSize:14 }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
