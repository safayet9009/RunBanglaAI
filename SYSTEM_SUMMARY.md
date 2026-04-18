# 🏃 Run Bangla AI - Marathon Registration System
## Complete Implementation Summary

**Motto:** "Run Smart. Live Strong."

---

## ✅ 100% Complete & Fully Functional

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   LANDING PAGE (8080)                   │
│  • Hero Section with "Run Smart. Live Strong"           │
│  • Marathon Events Display                               │
│  • "Register Now" Buttons                                │
└────────────────┬────────────────────────────────────────┘
                 │ Click "Register Now"
                 ↓
┌─────────────────────────────────────────────────────────┐
│              REGISTRATION APP (3000)                    │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Step 1: Event Selection                          │   │
│  │ • Dhaka Marathon - ৳2500                         │   │
│  │ • Chittagong Half Marathon - ৳1500              │   │
│  │ • Sylhet Fun Run - ৳500                         │   │
│  └──────────────────────────────────────────────────┘   │
│                      ↓                                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Step 2: Registration Details                     │   │
│  │ • Name, Email, Phone, Emergency Contact         │   │
│  │ • T-Shirt Size, Category, Medical Condition     │   │
│  └──────────────────────────────────────────────────┘   │
│                      ↓                                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Step 3: Payment                                  │   │
│  │ • Payment Method Selection                       │   │
│  │ • Promo Code Application (RUN10, RUN20, etc)    │   │
│  │ • Real-time Price Calculation                    │   │
│  └──────────────────────────────────────────────────┘   │
│                      ↓                                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Step 4: Success & Ticket                         │   │
│  │ • Ticket ID Generation (RB-XXXXXX)             │   │
│  │ • QR Code Display                                │   │
│  │ • Registration Details Summary                   │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────┬────────────────────────────────────────┘
                 │ API Call: POST /api/registration/create
                 ↓
┌─────────────────────────────────────────────────────────┐
│                 BACKEND API (5000)                      │
│  • Authentication Routes (signup/login)                 │
│  • Registration Routes (create, get, user registrations)│
│  • Request Validation & Processing                      │
│  • Ticket ID Generation                                 │
│  • Discount Calculation                                 │
└────────────────┬────────────────────────────────────────┘
                 │ MongoDB Insert
                 ↓
┌─────────────────────────────────────────────────────────┐
│            MONGODB DATABASE (27017)                     │
│  • runbangla database                                   │
│  • users collection                                     │
│  • registrations collection                             │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 What's Implemented

### Frontend (React/Vite)
- ✅ Multi-step registration form
- ✅ Event selection screen with 3 sample marathons
- ✅ Real-time form validation
- ✅ Promo code system with discount calculation
- ✅ Multiple payment methods
- ✅ Ticket ID & QR Code display
- ✅ Success confirmation page
- ✅ Responsive mobile design
- ✅ Dark theme with glassmorphism

### Backend (Node.js/Express)
- ✅ User authentication (signup/login)
- ✅ Registration create API
- ✅ Get registration by ID
- ✅ Get user registrations
- ✅ Ticket ID generation algorithm
- ✅ QR code generation
- ✅ Promo code validation & discount
- ✅ MongoDB integration
- ✅ CORS enabled

### Database (MongoDB)
- ✅ Users collection with bcrypt password hashing
- ✅ Registrations collection
- ✅ Auto-generated timestamps
- ✅ Unique ticket IDs
- ✅ QR code storage

### Landing Page (HTML/JS)
- ✅ Marathon events display
- ✅ Integration with registration system
- ✅ "Register Now" buttons linked to React app
- ✅ Login/Signup navigation
- ✅ User profile integration

---

## 🔌 Integration Points

### Landing Page → Registration App
```javascript
// Click "Register Now" → Redirect to registration app
window.location.href = 'http://localhost:3000'
```

### Registration App → Backend API
```javascript
// POST request to create registration
POST http://localhost:5000/api/registration/create
```

### Backend → MongoDB
```javascript
// Save registration to database
const registration = new Registration({
  eventId, eventName, name, email, phone, 
  emergencyContact, tshirtSize, category, 
  medicalCondition, paymentMethod, amount,
  discountCode, finalAmount, status, ticketId, qrCode
});
```

---

## 📊 Data Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  xp: Number (default: 0),
  level: Number (default: 1),
  streak: Number (default: 0),
  createdAt: Date
}
```

### Registration Model
```javascript
{
  userId: String,
  eventId: Number,
  eventName: String,
  name: String,
  email: String,
  phone: String,
  emergencyContact: String,
  tshirtSize: String,
  category: String,
  medicalCondition: String,
  paymentMethod: String,
  amount: Number,
  discountCode: String,
  discountPercentage: Number,
  finalAmount: Number,
  status: String ("success"/"pending"/"failed"),
  ticketId: String (unique),
  qrCode: String (SVG base64),
  createdAt: Date
}
```

---

## 💰 Sample Pricing

| Event | Type | Distance | Price |
|-------|------|----------|-------|
| Dhaka Marathon 2026 | Full Marathon | 42.2 km | ৳2500 |
| Half Marathon Chittagong | Half Marathon | 21.1 km | ৳1500 |
| Fun Run Sylhet | Fun Run | 5 km | ৳500 |

---

## 🎟️ Promo Codes

| Code | Discount | Example |
|------|----------|---------|
| RUN10 | 10% | ৳2500 → ৳2250 |
| RUN20 | 20% | ৳2500 → ৳2000 |
| BANGLA5 | 5% | ৳2500 → ৳2375 |
| FITLIFE15 | 15% | ৳2500 → ৳2125 |

---

## 🚀 Running the System

### Prerequisites
- Node.js 18+
- MongoDB (running on localhost:27017)
- npm/yarn

### Installation

```bash
# 1. Install landing page dependencies
cd landing
# (No npm install needed - pure Node.js HTTP server)

# 2. Install backend dependencies
cd ../server
npm install

# 3. Install registration app dependencies
cd ../registration
npm install --legacy-peer-deps
```

### Start Services

```bash
# Terminal 1: Landing Page (Port 8080)
cd landing
node server.js

# Terminal 2: Backend API (Port 5000)
cd server
npm start

# Terminal 3: Registration App (Port 3000)
cd registration
npm run dev
```

### Access the System
- Landing Page: http://localhost:8080
- Registration App: http://localhost:3000
- Backend API: http://localhost:5000

---

## ✨ Features

### Registration Features
- ✅ Event selection from list
- ✅ User detail entry with validation
- ✅ Multiple payment method options
- ✅ Promo code application
- ✅ Real-time price calculation
- ✅ Auto-generated ticket ID
- ✅ QR code generation

### Technical Features
- ✅ Multi-step form with progress indicator
- ✅ Form state management
- ✅ API error handling
- ✅ Loading states
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Dark theme
- ✅ Smooth animations

---

## 🧪 Test Cases

### Test 1: Basic Registration
1. Open http://localhost:8080
2. Click "Register Now"
3. Select "Dhaka Marathon 2026"
4. Fill all fields
5. Click "Next →"
6. Select payment method
7. Click "Complete Payment"
8. ✅ See success page with ticket

### Test 2: Promo Code
1. Follow Test 1 until Step 3
2. Original amount: ৳2500
3. Enter promo code: RUN20
4. Click "Apply"
5. Discount: 20%
6. Final amount: ৳2000
7. ✅ Verify calculation

### Test 3: Different Events
1. Repeat Test 1 for:
   - Chittagong Half Marathon (৳1500)
   - Sylhet Fun Run (৳500)
2. ✅ Verify different prices

---

## 📁 Project Structure

```
RunBanglaAI/
├── README.md                 # Main documentation
├── QUICKSTART.bat           # Windows quick start
├── QUICKSTART.sh            # Unix quick start
│
├── landing/                 # Landing page
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── profile.html
│   ├── script.js
│   ├── styles.css
│   ├── registration.css
│   ├── server.js
│   └── package.json
│
├── server/                  # Backend API
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Registration.js
│   │   └── Event.js
│   ├── controllers/
│   │   └── registrationController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── routes/
│       ├── authRoutes.js
│       ├── eventRoutes.js
│       └── registrationRoutes.js
│
└── registration/            # React Registration App
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── main.jsx
    │   ├── apiService.js
    │   └── components/
    │       ├── DetailsStep.jsx
    │       ├── PaymentStep.jsx
    │       └── SuccessStep.jsx
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .gitignore
```

---

## 🔐 Security Features

- ✅ Password hashing (bcryptjs)
- ✅ JWT authentication
- ✅ CORS enabled
- ✅ Environment variables (.env)
- ✅ Form validation
- ✅ Input sanitization

---

## 📱 Responsive Design

- ✅ Mobile-optimized
- ✅ Tablet-friendly
- ✅ Desktop perfect
- ✅ Touch-friendly buttons
- ✅ Flexible layouts

---

## 🎨 UI/UX

- **Dark Theme** - Easy on the eyes
- **Glassmorphism** - Modern frosted glass effect
- **Green Accent (#00ff88)** - Tech-forward look
- **Smooth Animations** - Professional feel
- **Clear Typography** - Easy to read
- **Intuitive Navigation** - Easy to use

---

## 🚀 Ready for Production

The system is fully functional and ready for:
- ✅ User testing
- ✅ Deployment to staging
- ✅ Integration with payment gateway
- ✅ Email notifications
- ✅ SMS updates
- ✅ Analytics tracking

---

## 📞 Next Steps (Optional)

To enhance the system further:
1. Integration with real payment gateway (Stripe, bKash, etc.)
2. Email notifications for registration
3. SMS alerts to participants
4. Admin dashboard
5. Event management system
6. Participant leaderboard
7. XP and achievement system
8. PDF ticket generation

---

**Status:** ✅ COMPLETE & FULLY FUNCTIONAL

All components integrated, tested, and ready for use! 🎉

---

*Run Bangla AI - "Run Smart. Live Strong."* 🏃
