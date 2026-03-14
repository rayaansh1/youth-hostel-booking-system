const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guestName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  guestPhone: { type: String, required: true },
  roomType: {
    type: String,
    required: true,
    enum: ['delux', 'ac', 'non-ac', 'dormitory', 'conference', 'lounge', 'dining', 'study']
  },
  roomName: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, default: 1 },
  totalAmount: { type: Number, required: true },
  specialRequests: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  },
  whatsappSent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Auto generate booking ID
bookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    this.bookingId = 'YHA' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
