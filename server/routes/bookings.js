const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

// WhatsApp message builder
const buildWhatsAppURL = (booking) => {
  const msg = `🏨 *NEW BOOKING - Youth Hostel Agra*\n\n` +
    `📋 *Booking ID:* ${booking.bookingId}\n` +
    `👤 *Guest:* ${booking.guestName}\n` +
    `📞 *Phone:* ${booking.guestPhone}\n` +
    `📧 *Email:* ${booking.guestEmail}\n` +
    `🛏️ *Room:* ${booking.roomName}\n` +
    `📅 *Check-in:* ${new Date(booking.checkIn).toDateString()}\n` +
    `📅 *Check-out:* ${new Date(booking.checkOut).toDateString()}\n` +
    `👥 *Guests:* ${booking.guests}\n` +
    `💰 *Total:* ₹${booking.totalAmount}\n` +
    `📝 *Special Requests:* ${booking.specialRequests || 'None'}\n\n` +
    `Please confirm this booking.`;
  return `https://wa.me/${process.env.WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
};

// Create booking
router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    const whatsappURL = buildWhatsAppURL(booking);
    booking.whatsappSent = true;
    await booking.save();
    res.status(201).json({ booking, whatsappURL });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all bookings (admin)
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.id });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update booking status
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
