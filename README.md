# 🏨 Youth Hostel Agra — Full MERN Stack Web Application

> World-class premium website for Youth Hostel Agra — Government Approved Accommodation
> Ministry of Youth Affairs & Sports, Government of India

---

## 🚀 Features

- **Hero Slider** — 3 building exterior photos with smooth transitions
- **All Real Photos** — Every section uses your actual uploaded photos
- **Online Booking System** — Form saves to MongoDB + WhatsApp notification to owner
- **WhatsApp Integration** — Booking notification to **+91 9368054835** automatically
- **Admin Dashboard** — View all bookings, stats, revenue, manage booking status
- **User Login / Register** — JWT-based authentication
- **Photo Gallery** — All 27 photos with lightbox viewer + category filter
- **Contact Page** — Form sends WhatsApp message to owner
- **Rooms Page** — All 12 room/venue cards with real photos & prices
- **Explore Agra Section** — All 7 landmarks listed
- **Hostel Rules** — Complete rules section
- **Responsive Design** — Works on mobile, tablet, desktop
- **Premium Dark Gold UI** — World-class luxury design

---

## 📁 Project Structure

```
youth-hostel-agra/
├── client/                    # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/images/     # All 27 real hostel photos
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Sticky premium navbar
│   │   │   └── Footer.jsx     # Full footer with links
│   │   ├── pages/
│   │   │   ├── HomePage.jsx         # Full homepage (all sections)
│   │   │   ├── RoomsPage.jsx        # All rooms with filter
│   │   │   ├── BookingPage.jsx      # Booking form → MongoDB + WhatsApp
│   │   │   ├── BookingConfirmPage.jsx
│   │   │   ├── AdminDashboard.jsx   # Admin panel with stats
│   │   │   ├── AuthPages.jsx        # Login + Register
│   │   │   └── GalleryContact.jsx   # Gallery + Contact
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css          # Premium design system
│   └── package.json
│
├── server/                    # Node.js + Express Backend
│   ├── models/
│   │   ├── User.js            # User model (JWT auth)
│   │   ├── Booking.js         # Booking model
│   │   └── Review.js          # Reviews model
│   ├── routes/
│   │   ├── auth.js            # Register/Login
│   │   ├── bookings.js        # Bookings + WhatsApp URL
│   │   ├── rooms.js           # Room data API
│   │   ├── reviews.js         # Reviews API
│   │   ├── admin.js           # Admin stats/data
│   │   └── contact.js         # Contact form
│   ├── middleware/
│   │   └── auth.js            # JWT middleware
│   ├── .env                   # Environment variables
│   ├── index.js               # Main server entry
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### 1. Setup Backend

```bash
cd server
npm install
```

Edit `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/youth-hostel-agra
JWT_SECRET=your_super_secret_key_here
WHATSAPP_PHONE=919368054835
```

Start backend:

```bash
npm run dev
```

### 2. Setup Frontend

```bash
cd client
npm install
npm start
```

App will open at: **http://localhost:3000**

---

## 📱 How WhatsApp Booking Works

1. Guest fills the booking form
2. Form data is **saved to MongoDB**
3. A **WhatsApp message** is automatically generated and sent to:
   - **Owner:** +91 9368054835
4. Message contains: Guest name, phone, room type, dates, amount, requests
5. Owner confirms booking on WhatsApp

---

## 🔐 Admin Access

To access Admin Dashboard:

1. Register a user at `/register`
2. In MongoDB, manually set `role: "admin"` on your user
3. Login and visit `/admin`

---

## 💰 Room Pricing

| Room                    | Price          |
| ----------------------- | -------------- |
| Delux Room              | ₹1,100 / Night |
| AC Room                 | ₹900 / Night   |
| Non-AC Room             | ₹750 / Night   |
| Dormitory (Others)      | ₹300 / Night   |
| Dormitory (Students)    | ₹200 / Night   |
| Conference Hall (3 hrs) | ₹3,500         |
| Conference Hall (7 hrs) | ₹7,000         |
| Mini Lounge (3 hrs)     | ₹1,800         |
| Dining (Refreshment)    | ₹300 / hr      |
| Dining (Meal)           | ₹600 / hr      |

---

## 📞 Contact

- **Phone:** +91 9368054835
- **WhatsApp:** +91 9368054835
- **Email:** myh.agra@gmail.com
- **Website:** Youth Hostel Agra, Uttar Pradesh, India
