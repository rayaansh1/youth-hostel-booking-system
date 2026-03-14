import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ totalBookings: 0, confirmedBookings: 0, pendingBookings: 0, totalUsers: 0, totalRevenue: 0, recentBookings: [] });
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('yha_user') || '{}');
  const token = localStorage.getItem('yha_token');

  useEffect(() => {
    if (!token || user.role !== 'admin') { navigate('/login'); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [statsRes, bookingsRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/admin/bookings', { headers }),
      ]);
      if (statsRes.ok) setStats(await statsRes.json());
      if (bookingsRes.ok) setBookings(await bookingsRes.json());
    } catch (err) {
      console.log('Using demo data');
      setStats({ totalBookings: 24, confirmedBookings: 18, pendingBookings: 4, totalUsers: 31, totalRevenue: 48500, recentBookings: [] });
      setBookings([
        { _id: '1', bookingId: 'YHA123456', guestName: 'Rahul Sharma', guestEmail: 'rahul@gmail.com', guestPhone: '9876543210', roomName: 'Delux Room', checkIn: '2026-03-15', checkOut: '2026-03-17', totalAmount: 2200, status: 'confirmed' },
        { _id: '2', bookingId: 'YHA789012', guestName: 'Priya Singh', guestEmail: 'priya@gmail.com', guestPhone: '9876543211', roomName: 'AC Room', checkIn: '2026-03-18', checkOut: '2026-03-19', totalAmount: 900, status: 'pending' },
        { _id: '3', bookingId: 'YHA345678', guestName: 'Amit Kumar', guestEmail: 'amit@gmail.com', guestPhone: '9876543212', roomName: 'Dormitory', checkIn: '2026-03-20', checkOut: '2026-03-22', totalAmount: 600, status: 'confirmed' },
      ]);
    }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`/api/bookings/${id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ status }) });
      setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
    } catch (err) { setBookings(bookings.map(b => b._id === id ? { ...b, status } : b)); }
  };

  const statusColor = { confirmed: '#2ECC71', pending: '#F39C12', cancelled: '#E74C3C', completed: '#3498DB' };

  const statCards = [
    { label: 'Total Bookings', val: stats.totalBookings, icon: '📋', color: '#C9A84C' },
    { label: 'Confirmed', val: stats.confirmedBookings, icon: '✅', color: '#2ECC71' },
    { label: 'Pending', val: stats.pendingBookings, icon: '⏳', color: '#F39C12' },
    { label: 'Total Guests', val: stats.totalUsers, icon: '👥', color: '#3498DB' },
    { label: 'Total Revenue', val: `₹${Number(stats.totalRevenue).toLocaleString()}`, icon: '💰', color: '#C9A84C' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', paddingTop: 80 }}>
      {/* Header */}
      <div style={{ background: '#111', borderBottom: '1px solid rgba(201,168,76,0.15)', padding: '32px 32px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
            <div>
              <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#C9A84C' }}>Admin Panel</span>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: '#FFF', marginTop: 4 }}>Youth Hostel Dashboard</h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 14, color: '#888' }}>Welcome, {user.name || 'Admin'}</span>
              <button onClick={fetchData} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C', borderRadius: 2, fontSize: 12, letterSpacing: 1, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>↻ Refresh</button>
            </div>
          </div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0 }}>
            {['overview', 'bookings'].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: '12px 28px', background: 'transparent', border: 'none', borderBottom: tab === t ? '2px solid #C9A84C' : '2px solid transparent', color: tab === t ? '#C9A84C' : '#666', fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, transition: 'all 0.3s' }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 32px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 80 }}>
            <div style={{ width: 48, height: 48, border: '3px solid rgba(201,168,76,0.3)', borderTop: '3px solid #C9A84C', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#888' }}>Loading dashboard...</p>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : (
          <>
            {tab === 'overview' && (
              <>
                {/* Stat Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
                  {statCards.map(s => (
                    <div key={s.label} style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: '24px 28px', borderTop: `3px solid ${s.color}` }}>
                      <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.val}</div>
                      <div style={{ fontSize: 12, color: '#888', letterSpacing: 1.5, textTransform: 'uppercase' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: '28px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: '#FFF', marginBottom: 20 }}>Quick Actions</h3>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {[
                      { label: '📋 View All Bookings', action: () => setTab('bookings') },
                      { label: '💬 WhatsApp Owner', action: () => window.open('https://wa.me/919368054835', '_blank') },
                      { label: '🏠 View Website', action: () => window.open('/', '_blank') },
                    ].map(a => (
                      <button key={a.label} onClick={a.action} style={{ padding: '12px 24px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C', borderRadius: 2, fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.3s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.2)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; }}
                      >{a.label}</button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab === 'bookings' && (
              <div style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#FFF' }}>All Bookings ({bookings.length})</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'rgba(201,168,76,0.05)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {['Booking ID', 'Guest', 'Room', 'Check-in', 'Check-out', 'Amount', 'Status', 'Actions'].map(h => (
                          <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#C9A84C', fontFamily: 'DM Sans, sans-serif' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b, i) => (
                        <tr key={b._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                          <td style={{ padding: '14px 16px', fontSize: 13, color: '#C9A84C', fontFamily: 'monospace' }}>{b.bookingId}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ fontSize: 14, color: '#FFF', fontWeight: 500 }}>{b.guestName}</div>
                            <div style={{ fontSize: 12, color: '#888' }}>{b.guestPhone}</div>
                          </td>
                          <td style={{ padding: '14px 16px', fontSize: 13, color: '#CCC' }}>{b.roomName}</td>
                          <td style={{ padding: '14px 16px', fontSize: 13, color: '#CCC' }}>{b.checkIn ? new Date(b.checkIn).toLocaleDateString() : b.checkIn}</td>
                          <td style={{ padding: '14px 16px', fontSize: 13, color: '#CCC' }}>{b.checkOut ? new Date(b.checkOut).toLocaleDateString() : b.checkOut}</td>
                          <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 700, color: '#C9A84C' }}>₹{Number(b.totalAmount).toLocaleString()}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <span style={{ padding: '4px 12px', borderRadius: 50, fontSize: 11, fontWeight: 700, background: `${statusColor[b.status]}20`, color: statusColor[b.status] || '#888' }}>
                              {b.status?.toUpperCase()}
                            </span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ display: 'flex', gap: 6 }}>
                              {b.status === 'pending' && (
                                <button onClick={() => updateStatus(b._id, 'confirmed')} style={{ padding: '5px 12px', background: 'rgba(46,204,113,0.15)', border: '1px solid rgba(46,204,113,0.3)', color: '#2ECC71', borderRadius: 2, fontSize: 11, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>Confirm</button>
                              )}
                              <button onClick={() => { const msg = `Booking ${b.bookingId} - ${b.guestName} - ${b.roomName}`; window.open(`https://wa.me/${b.guestPhone?.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`, '_blank'); }} style={{ padding: '5px 12px', background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.3)', color: '#25D366', borderRadius: 2, fontSize: 11, cursor: 'pointer' }}>WA</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {bookings.length === 0 && (
                    <div style={{ padding: '60px', textAlign: 'center', color: '#888' }}>
                      <div style={{ fontSize: 40, marginBottom: 16 }}>📋</div>
                      <p>No bookings yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
