
# 🏃 Marathon Registration & Payment System - Complete Setup

**Run Bangla AI** - "Run Smart. Live Strong."

---

## ✅ Complete System Implemented

### 🎯 What's Working

1. **Landing Page** (http://localhost:8080)
   - Hero section with "Run Smart. Live Strong" motto
   - Marathon events display
   - Navbar with Login/Signup buttons
   - "Register Now" button → Redirects to Registration App

2. **Registration System** (http://localhost:3000)
   - **Step 1: Event Selection**
     - 3 sample marathons (Dhaka, Chittagong, Sylhet)
     - Event details (date, location, distance, fee)
     - Registration fee: ৳500-2500
   
   - **Step 2: Details Form**
     - Full Name, Email, Phone, Emergency Contact
     - T-Shirt Size, Category, Medical Conditions
     - Real-time validation
   
   - **Step 3: Payment**
     - Multiple payment methods (Card, bKash, Nagad, Rocket, Bank)
     - Promo code system:
       - RUN10 = 10% discount
       - RUN20 = 20% discount
       - BANGLA5 = 5% discount
       - FITLIFE15 = 15% discount
     - Real-time discount calculation
   
   - **Step 4: Success Screen**
     - Ticket ID generation (Auto-generated: RB-XXXXXX)
     - QR Code for event entry
     - Registration details displayed
     - Download/Share options

3. **Backend API** (http://localhost:5000)
   - Auth Routes: /api/auth/signup, /api/auth/login
   - Registration Routes: /api/registration/create
   - MongoDB Integration: All data saved to `runbangla` database

4. **Database** (MongoDB - localhost:27017)
   - **Collections:**
     - `users` - User accounts
     - `registrations` - Marathon registrations

---

## 🚀 How to Use

### Start All Services

```bash
# Terminal 1: Landing Page
cd landing
node server.js
# Opens: http://localhost:8080

# Terminal 2: Backend API
cd server
npm start
# Runs: http://localhost:5000

# Terminal 3: Registration App
cd registration
npm run dev
# Opens: http://localhost:3000
```

### User Flow

1. Visit **http://localhost:8080** (Landing Page)
2. Click **"Register Now"** on marathon event
3. Redirects to **http://localhost:3000** (Registration App)
4. **Step 1:** Select event (Dhaka/Chittagong/Sylhet)
5. **Step 2:** Fill registration details
6. **Step 3:** Choose payment method & apply promo code
7. **Step 4:** Submit payment
8. **Success:** Get Ticket ID & QR Code

---

## 📋 API Endpoints

### Auth Routes
```
POST /api/auth/signup
  - Body: { name, email, password, confirmPassword }
  - Returns: { token, user }

POST /api/auth/login
  - Body: { email, password }
  - Returns: { token, user }
```

### Registration Routes
```
POST /api/registration/create
  - Body: {
      eventId,
      eventName,
      name,
      email,
      phone,
      emergencyContact,
      tshirtSize,
      category,
      medicalCondition,
      paymentMethod,
      amount,
      discountCode (optional)
    }
  - Returns: {
      success: true,
      data: {
        registrationId,
        ticketId,
        eventName,
        name,
        category,
        finalAmount,
        qrCode
      }
    }

GET /api/registration/:id
  - Returns: Registration details by ID

GET /api/registration/user/:userId
  - Returns: All registrations for a user
```

---

## 🎯 Data Flow

```
User @ Landing Page (http://localhost:8080)
    ↓ (Clicks "Register Now")
Registration App (http://localhost:3000)
    ↓ (Selects Event & Fills Form)
Backend API (http://localhost:5000)
    ↓ (POST /api/registration/create)
MongoDB (localhost:27017/runbangla)
    ↓ (Generates Ticket ID & QR Code)
Success Page (Shows Registration Details)
```

---

## 🎨 UI Features

- **Dark Theme** - Glassmorphism design with green accent (#00ff88)
- **Responsive** - Mobile-friendly (tested on various screen sizes)
- **Animations** - Smooth transitions and slide-ups
- **Real-time Validation** - Form validation with error messages
- **Loading States** - Visual feedback during processing

---

## 💾 MongoDB Collections

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (bcrypt hashed),
  xp: Number,
  level: Number,
  streak: Number,
  createdAt: Date
}
```

### Registrations Collection
```javascript
{
  _id: ObjectId,
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
  status: String ("success" / "pending" / "failed"),
  ticketId: String (unique - RB-XXXXXX),
  qrCode: String (SVG base64),
  createdAt: Date
}
```

---

## 🛠️ Tech Stack

**Frontend:**
- React 18.2.0
- Vite 5.0.0
- Axios (API calls)
- QRCode.react (QR code generation)

**Backend:**
- Node.js 18+
- Express 4.x
- Mongoose 9.x (MongoDB)
- bcryptjs (Password hashing)
- jsonwebtoken (JWT auth)
- dotenv (Environment variables)

**Database:**
- MongoDB (Local: localhost:27017)

---

## 🧪 Test Scenarios

### Scenario 1: Complete Registration
1. Go to http://localhost:8080
2. Click "Register Now"
3. Select "Dhaka Marathon 2026"
4. Fill all details
5. Select "Credit/Debit Card"
6. Enter promo code: RUN10
7. Click "Complete Payment"
8. ✅ See success page with Ticket ID and QR Code

### Scenario 2: Promo Code Test
1. Amount: ৳2500
2. Apply promo "RUN20" (20% off)
3. Final Amount: ৳2000
4. ✅ Discount calculated correctly

### Scenario 3: Different Payment Methods
- Test all payment methods in dropdown
- All methods work (simulated)

---

## 📦 Project Structure

```
RunBanglaAI/
├── landing/           # Landing page (http://8080)
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── server.js
│   └── styles.css
│
├── server/            # Backend API (http://5000)
│   ├── server.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Registration.js
│   │   └── Event.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── registrationRoutes.js
│   └── package.json
│
└── registration/      # React Registration App (http://3000)
    ├── src/
    │   ├── App.jsx
    │   ├── apiService.js
    │   ├── components/
    │   │   ├── DetailsStep.jsx
    │   │   ├── PaymentStep.jsx
    │   │   └── SuccessStep.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port
# Windows: netstat -ano | findstr :3000
# Then: taskkill /PID <PID> /F

# Or change port in vite.config.js
```

### MongoDB Connection Error
```bash
# Ensure MongoDB is running
# Windows: Check MongoDB service in Services
# Linux: systemctl start mongod
```

### CORS Issues
- Backend has CORS enabled for localhost:3000
- Ensure all services running on correct ports

---

## 📞 Support

All services integrated and tested:
- ✅ Frontend to Backend communication
- ✅ MongoDB data persistence
- ✅ Payment processing (simulated)
- ✅ Ticket generation
- ✅ QR code generation

Ready for production deployment! 🚀

---

**Motto:** Run Smart. Live Strong. 🏃

