const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const waMsg = `📩 *Contact Message - Youth Hostel Agra*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📞 *Phone:* ${phone}\n💬 *Message:* ${message}`;
    const whatsappURL = `https://wa.me/${process.env.WHATSAPP_PHONE}?text=${encodeURIComponent(waMsg)}`;
    res.json({ success: true, whatsappURL });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
