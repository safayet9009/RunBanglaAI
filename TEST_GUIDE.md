# 🎯 Run Bangla AI - Complete Test Guide

## System Status: ✅ FULLY OPERATIONAL

All three services running:
- ✅ Landing Page: http://localhost:8080
- ✅ Registration App: http://localhost:3000
- ✅ Backend API: http://localhost:5000
- ✅ MongoDB: localhost:27017/runbangla

---

## 🚀 How to Test the Complete System

### Step 1: Open Landing Page
```
1. Open browser
2. Go to: http://localhost:8080
3. You should see: "Run Smart. Live Strong." landing page
4. See 3 marathon events (Dhaka, Chittagong, Sylhet)
```

### Step 2: Click "Register Now"
```
1. Look for "Register Now" button on any marathon event
2. Click it
3. You'll be redirected to: http://localhost:3000
```

### Step 3: Select Marathon Event
```
You should see:
📍 3 Marathon Events:
  1. 🏃 Dhaka Marathon 2026 - ৳2500
  2. 🏅 Half Marathon Chittagong - ৳1500
  3. 🎉 Fun Run Sylhet - ৳500

Click: "Register Now" on any event
```

### Step 4: Fill Registration Details (Step 1)
```
Form fields to fill:
✓ Full Name: John Doe
✓ Email: john@example.com
✓ Phone: 01700000000
✓ Emergency Contact: 01700000001
✓ T-Shirt Size: M
✓ Category: Adult
✓ Medical Condition: (Leave empty if none)

Click: "Next →"
```

### Step 5: Choose Payment Method (Step 2)
```
You should see:
✓ Base Amount: ৳2500 (for Dhaka)

Payment Method options:
- Credit/Debit Card
- bKash
- Nagad
- Rocket
- Bank Transfer

Select any payment method
```

### Step 6: Apply Promo Code (Optional)
```
Available Promo Codes:
- RUN10 (10% off)
- RUN20 (20% off) ← Try this one
- BANGLA5 (5% off)
- FITLIFE15 (15% off)

Test:
1. Enter: RUN20 in promo code field
2. Click: "Apply"
3. You should see: ✅ Discount applied: 20% off
4. Final Amount changes from ৳2500 to ৳2000

Alternative test:
- Try RUN10: ৳2500 → ৳2250
- Try RUN20: ৳2500 → ৳2000
```

### Step 7: Complete Payment
```
After selecting payment method and optionally a promo code:

Click: "✅ Complete Payment"

Behind the scenes:
- Frontend sends data to backend
- Backend receives: /api/registration/create
- Backend generates: Ticket ID (e.g., RB-1Z9P4X)
- Backend generates: QR Code
- Backend saves to: MongoDB
- Backend returns: Registration data
- Frontend displays: Success page
```

### Step 8: Success Page (Step 3)
```
You should see:
🎉 "You're Registered!"

Registration Details displayed:
✓ Ticket ID: RB-XXXXXX
✓ Event: Dhaka Marathon 2026
✓ Name: John Doe
✓ Email: john@example.com
✓ Phone: 01700000000
✓ T-Shirt Size: M
✓ Category: Adult
✓ Amount Paid: ৳2000 (after discount)
✓ Status: ✅ SUCCESS

QR Code section:
- QR Code displayed for event entry
- Can be scanned at entry point

Buttons:
- "🏃 Register Another Event" → Back to event selection
- "🏠 Back to Home" → Back to landing page
```

---

## ✅ Verification Checklist

### Frontend Functionality
- [ ] Landing page loads
- [ ] Marathon events display
- [ ] "Register Now" button redirects to app
- [ ] Event selection page works
- [ ] Registration form validates input
- [ ] Payment method dropdown works
- [ ] Promo code input accepts text
- [ ] Discount calculates correctly
- [ ] Success page displays ticket ID
- [ ] QR code is visible
- [ ] Navigation between steps works

### Backend Functionality
- [ ] API receives registration request
- [ ] Ticket ID is generated
- [ ] QR code is generated
- [ ] Discount is calculated
- [ ] Data is saved to MongoDB
- [ ] Response is sent back to frontend
- [ ] Success message appears

### Data Persistence
- [ ] User data saved in MongoDB `users` collection
- [ ] Registration data saved in MongoDB `registrations` collection
- [ ] Ticket ID is unique
- [ ] QR code is base64 encoded
- [ ] Timestamps are correct

---

## 🧪 Advanced Test Scenarios

### Scenario A: Different Event Prices
```
Test 1: Dhaka Marathon
- Event: Dhaka Marathon 2026
- Price: ৳2500
- After RUN20: ৳2000

Test 2: Half Marathon
- Event: Half Marathon Chittagong
- Price: ৳1500
- After RUN20: ৳1200

Test 3: Fun Run
- Event: Fun Run Sylhet
- Price: ৳500
- After RUN10: ৳450
```
✅ Each should calculate correctly

### Scenario B: All Promo Codes
```
Use each promo code with ৳2500 base:
- RUN10: 10% → ৳2250 ✅
- RUN20: 20% → ৳2000 ✅
- BANGLA5: 5% → ৳2375 ✅
- FITLIFE15: 15% → ৳2125 ✅
```

### Scenario C: Form Validation
```
Test 1: Submit without name
- Should show error: "Please fill all required fields"

Test 2: Submit without email
- Should show error: "Please fill all required fields"

Test 3: Submit with invalid email
- HTML5 validation should catch it

Test 4: Submit with all fields
- Should proceed to payment
```

### Scenario D: Multiple Registrations
```
1. Complete registration for Event 1
2. Click "Register Another Event"
3. Form resets
4. Select Event 2
5. Fill new details
6. Complete registration
7. Both should be saved in MongoDB
```

---

## 📊 MongoDB Verification

### Check Users Collection
```
MongoDB Command:
db.users.find()

Expected sample:
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2b$10$...", // hashed
  "xp": 0,
  "level": 1,
  "streak": 0,
  "createdAt": ISODate("2026-04-19T...")
}
```

### Check Registrations Collection
```
MongoDB Command:
db.registrations.find()

Expected sample:
{
  "_id": ObjectId("..."),
  "eventId": 1,
  "eventName": "Dhaka Marathon 2026",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "01700000000",
  "emergencyContact": "01700000001",
  "tshirtSize": "M",
  "category": "adult",
  "paymentMethod": "card",
  "amount": 2500,
  "discountPercentage": 20,
  "finalAmount": 2000,
  "status": "success",
  "ticketId": "RB-1Z9P4X",
  "qrCode": "data:image/svg+xml;base64/...",
  "createdAt": ISODate("2026-04-19T...")
}
```

---

## 🔍 Browser Console Logs

### Expected Console Output

When you submit the form, you should see in browser console:
```
📤 Submitting registration: {
  eventId: 1,
  eventName: "Dhaka Marathon 2026",
  name: "John Doe",
  email: "john@example.com",
  ...
}

✅ Registration successful: {
  success: true,
  data: {
    registrationId: "507f...",
    ticketId: "RB-1Z9P4X",
    ...
  }
}
```

---

## 🛠️ Troubleshooting

### Issue: Page shows "Connection Refused"
**Solution:**
```
Check if all services are running:
- Terminal 1: node server.js (landing)
- Terminal 2: npm start (server API)
- Terminal 3: npm run dev (registration)
```

### Issue: Form won't submit
**Solution:**
```
1. Open browser DevTools (F12)
2. Go to Console tab
3. Check for error messages
4. Verify all required fields are filled
```

### Issue: Promo code doesn't apply
**Solution:**
```
1. Check spelling: RUN10, RUN20, BANGLA5, FITLIFE15
2. Codes are case-insensitive
3. Must click "Apply" button
4. Should see success message
```

### Issue: QR code not showing
**Solution:**
```
1. Complete full registration
2. Success page must load
3. QR code is generated server-side
4. If missing, check browser console for errors
```

### Issue: MongoDB connection error
**Solution:**
```
1. Ensure MongoDB is installed
2. Start MongoDB service:
   - Windows: mongod.exe or Windows Service
   - Linux: sudo systemctl start mongod
3. Verify it's running on port 27017
```

---

## 🎯 Success Indicators

### You know it's working when:

✅ Landing page loads with marathons  
✅ Clicking "Register Now" goes to app  
✅ Event selection page shows 3 events  
✅ Form validates and doesn't allow empty fields  
✅ Promo codes apply and discount shows  
✅ Success page displays ticket ID  
✅ QR code appears on success page  
✅ Back button works to go back to landing  
✅ Browser console shows API responses  
✅ MongoDB shows saved registrations  

---

## 📝 Final Checklist

Before considering complete:
- [ ] All 3 services running without errors
- [ ] Landing page accessible
- [ ] Registration app accessible
- [ ] Registration form works
- [ ] Payment calculation works
- [ ] Promo codes work
- [ ] Success page displays
- [ ] MongoDB has data
- [ ] Back navigation works
- [ ] No console errors

---

## 🎉 You're All Set!

The Marathon Registration System is fully functional!

**System Status: ✅ READY FOR USE**

---

*Run Bangla AI - "Run Smart. Live Strong."* 🏃
