const express = require('express');
const router = express.Router();

const rooms = [
  { id: 'delux', name: 'Delux Room', description: 'Comfortable Air-Conditioner with Double Bed & Designer Interior', price: 1100, unit: 'Night', image: 'delux_room.jpeg', amenities: ['AC', 'Double Bed', 'WiFi', 'Attached Bath'] },
  { id: 'ac', name: 'AC Room', description: 'Comfortable air-conditioned room with basic amenities', price: 900, unit: 'Night', image: 'ac_room.jpeg', amenities: ['AC', 'Double Bed', 'WiFi'] },
  { id: 'non-ac', name: 'Non-AC Room', description: 'Well ventilated non-ac room suitable for budget stay', price: 750, unit: 'Night', image: 'non-ac_room.jpeg', amenities: ['Fan', 'Double Bed', 'WiFi'] },
  { id: 'dormitory', name: 'Dormitory', description: 'Shared Accommodation with multiple beds', priceOthers: 300, priceStudents: 200, unit: 'Night', image: 'doormetry1.jpeg', amenities: ['Fan', 'Shared Bath', 'Locker'] },
  { id: 'conference', name: 'Conference Hall', description: 'A fully air-conditioned and well-equipped space ideal for meetings, seminars, workshops, training programs.', price3hr: 3500, price7hr: 7000, unit: 'Hours', image: 'confrence1.jpeg', amenities: ['AC', 'Projector', 'Whiteboard', 'Sound System'] },
  { id: 'lounge', name: 'Mini Lounge (Lobby)', description: 'A comfortable and well-maintained space designed for small meetings, waiting, and informal gatherings.', price: 1800, unit: '3 Hours', image: 'study1.jpeg', amenities: ['AC', 'Seating', 'TV'] },
  { id: 'dining', name: 'Hostel Dining Area', description: 'Clean and hygienic dining hall suitable for refreshments, lunch and dinner services.', priceRefresh: 300, priceMeal: 600, unit: '1 Hour', image: 'dinning1.jpeg', amenities: ['Hygienic', 'Large Seating', 'Self Service'] },
  { id: 'study', name: 'Study Area & TV Area', description: 'Dedicated study area and TV lounge for hostel students to study or relax in a calm environment.', price: 0, unit: 'Students Only', image: 'study2.jpeg', amenities: ['Books', 'TV', 'Quiet Zone'] }
];

router.get('/', (req, res) => res.json(rooms));
router.get('/:id', (req, res) => {
  const room = rooms.find(r => r.id === req.params.id);
  if (!room) return res.status(404).json({ message: 'Room not found' });
  res.json(room);
});

module.exports = router;
