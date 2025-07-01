# 🧪 SEA Catering App - End-to-End Test Cases

## 📋 Test Environment Setup
- **URL**: http://localhost:3000
- **Browser**: Chrome/Firefox (latest version)
- **Screen**: Desktop (1920x1080) + Mobile (375x667)
- **Database**: PostgreSQL connected via Prisma

---

## 🎯 LEVEL 1 TEST CASES (10 pts)

### ✅ TC-L1-001: Homepage Basic Content
**Objective**: Verify static homepage content displays correctly

**Pre-conditions**: 
- Navigate to http://localhost:3000

**Test Steps**:
1. Check page loads without errors
2. Verify business name "SEA Catering" appears in header
3. Verify slogan "Healthy Meals, Anytime, Anywhere" is visible
4. Verify business introduction section exists
5. Verify key features list is displayed
6. Verify contact details section shows:
   - Manager: Brian
   - Phone: 08123456789

**Expected Results**: ✅ All content displays correctly
**Status**: [ ] Pass [ ] Fail

---

## 🎯 LEVEL 2 TEST CASES (20 pts)

### ✅ TC-L2-001: Interactive Navigation (5 pts)
**Objective**: Test responsive navigation functionality

**Test Steps**:
1. **Desktop Navigation**:
   - Hover over nav links (Home, Menu, Subscription, Contact)
   - Click each navigation link
   - Verify smooth scroll to correct sections
   - Verify active section highlighting works

2. **Mobile Navigation**:
   - Resize browser to mobile view (375px)
   - Click hamburger menu icon
   - Verify mobile menu opens/closes
   - Test navigation links in mobile view

**Expected Results**: ✅ Navigation works smoothly on all devices
**Status**: [ ] Pass [ ] Fail

### ✅ TC-L2-002: Interactive Meal Plan Display (10 pts)
**Objective**: Test meal plan cards and modal functionality

**Test Steps**:
1. **Meal Cards Display**:
   - Navigate to Menu section (#menu)
   - Verify meal plan cards are displayed
   - Check each card shows: name, price, description, image

2. **Category Filtering**:
   - Test category filter buttons (Diet, Protein, Royal)
   - Verify cards filter correctly by category
   - Test "All" filter shows all cards

3. **Modal Functionality**:
   - Click "See More Details" on any meal card
   - Verify modal opens with detailed information:
     - Nutrition facts (calories, protein, carbs, fats, fiber)
     - Ingredients list
     - Allergen information
   - Test modal close (X button, outside click, ESC key)

**Expected Results**: ✅ All interactive elements work properly
**Status**: [ ] Pass [ ] Fail

### ✅ TC-L2-003: Testimonials Section (5 pts)
**Objective**: Test testimonial form submission and carousel

**Test Steps**:
1. **Testimonial Form**:
   - Navigate to testimonials section
   - Fill out testimonial form:
     - Name: "Test User"
     - Rating: Select 5 stars
     - Message: "Amazing food quality!"
   - Submit form
   - Verify success message appears
   - Verify form resets after submission

2. **Testimonial Carousel**:
   - Test carousel navigation (prev/next buttons)
   - Verify testimonials display correctly
   - Check auto-play functionality (if implemented)

**Expected Results**: ✅ Form submits successfully, carousel functions properly
**Status**: [ ] Pass [ ] Fail

---

## 🎯 LEVEL 3 TEST CASES (25 pts)

### ✅ TC-L3-001: Subscription Form - Step 1 (4 pts)
**Objective**: Test basic information collection

**Test Steps**:
1. Navigate to subscription section (#subscription)
2. **Step 1 - Personal Info**:
   - Leave name field empty, try to proceed → Should show validation error
   - Leave phone field empty, try to proceed → Should show validation error
   - Fill valid data:
     - Name: "John Doe"
     - Phone: "08123456789"
   - Click "Next" → Should proceed to Step 2

**Expected Results**: ✅ Validation works, valid data proceeds to next step
**Status**: [ ] Pass [ ] Fail

### ✅ TC-L3-002: Subscription Form - Step 2 (4 pts)
**Objective**: Test plan selection

**Test Steps**:
1. **Plan Selection**:
   - Try to proceed without selecting plan → Should show validation error
   - Select "Diet Plan" (Rp30,000 per meal)
   - Verify plan selection is highlighted
   - Verify price calculator updates
   - Click "Next" → Should proceed to Step 3

2. **Test All Plans**:
   - Go back and test "Protein Plan" (Rp40,000)
   - Go back and test "Royal Plan" (Rp60,000)
   - Verify price calculations are correct

**Expected Results**: ✅ Plan selection works, price updates correctly
**Status**: [ ] Pass [ ] Fail

### ✅ TC-L3-003: Subscription Form - Step 3 (4 pts)
**Objective**: Test meal customization and price calculation

**Test Steps**:
1. **Meal Types Selection**:
   - Try to proceed without selecting meal types → Should show validation error
   - Select multiple meal types: ✅ Breakfast ✅ Dinner
   - Verify meal type selection updates price calculator

2. **Delivery Days Selection**:
   - Try to proceed without selecting delivery days → Should show validation error
   - Select delivery days: ✅ Monday ✅ Tuesday ✅ Wednesday ✅ Thursday ✅ Friday
   - Verify delivery days selection updates price calculator

3. **Price Calculation Test**:
   - With selection: Protein Plan + 2 meal types + 5 delivery days
   - Expected calculation: Rp40,000 × 2 × 5 × 4.3 = Rp1,720,000
   - Verify price calculator shows correct amount

4. **Allergies (Optional)**:
   - Fill allergies field: "Peanuts, Shellfish"
   - Verify field accepts input

**Expected Results**: ✅ Price calculation formula works correctly
**Status**: [ ] Pass [ ] Fail

### ✅ TC-L3-004: Database Integration (13 pts)
**Objective**: Test subscription submission and database storage

**Pre-conditions**: Database must be connected and running

**Test Steps**:
1. **Form Submission**:
   - Complete all form steps with valid data
   - Click "Submit Subscription"
   - Verify success message appears
   - Verify form resets after submission

2. **Database Verification**:
   - Check if subscription appears in admin dashboard
   - Verify all form data is stored correctly:
     - Name, phone, plan, meal types, delivery days, allergies, total price
     - Status should be 'active'
     - Created timestamp

3. **API Testing**:
   - Test direct API call: `GET /api/subscriptions`
   - Verify response contains submitted subscription data
   - Test API validation with incomplete data

**Expected Results**: ✅ Data saves to database, API responds correctly
**Status**: [ ] Pass [ ] Fail

---

## 🎯 LEVEL 4 TEST CASES (25 pts)

### ✅ TC-L4-001: User Registration (7 pts)
**Objective**: Test user registration with validation

**Test Steps**:
1. Navigate to `/auth/signup`
2. **Password Validation Testing**:
   - Try weak password: "123" → Should show validation errors
   - Try password without numbers: "password" → Should show validation error
   - Try password without letters: "123456" → Should show validation error
   - Use valid password: "Password123!"

3. **Registration Flow**:
   - Fill form with valid data:
     - Name: "Test User"
     - Email: "testuser@example.com"
     - Password: "TestPass123!"
     - Confirm Password: "TestPass123!"
     - Phone: "08123456789" (optional)
   - Submit form
   - Verify success message
   - Verify auto-redirect to dashboard

**Expected Results**: ✅ Password validation works, registration successful
**Status**: [ ] Pass [ ] Fail

### ✅ TC-L4-002: User Login (4 pts)
**Objective**: Test login functionality

**Test Steps**:
1. Navigate to `/auth/signin`
2. **Invalid Login Testing**:
   - Try wrong email → Should show error message
   - Try wrong password → Should show error message
   - Try empty fields → Should show validation errors

3. **Valid Login Testing**:
   - Use registered credentials from TC-L4-001
   - Submit login form
   - Verify successful login
   - Verify redirect to appropriate dashboard (user/admin)

**Expected Results**: ✅ Login validation works, successful authentication
**Status**: [ ] Pass [ ] Fail

### ✅ TC-L4-003: Google OAuth (2 pts)
**Objective**: Test Google authentication

**Test Steps**:
1. Click "Sign in with Google" button
2. Verify Google OAuth popup opens
3. Complete Google authentication
4. Verify user is logged in and redirected to dashboard

**Expected Results**: ✅ Google OAuth integration works
**Status**: [ ] Pass [ ] Fail

### ✅ TC-L4-004: Authorization Testing (2 pts)
**Objective**: Test role-based access control

**Test Steps**:
1. **User Role Testing**:
   - Login as regular user
   - Try to access `/dashboard/admin` → Should redirect to user dashboard
   - Verify user can only access user features

2. **Admin Role Testing**:
   - Login as admin (admin@seacatering.com / admin123!)
   - Access `/dashboard/admin` → Should work
   - Verify admin can access all features

**Expected Results**: ✅ Role-based access control works correctly
**Status**: [ ] Pass [ ] Fail

### ✅ TC-L4-005: Input Sanitization (10 pts)
**Objective**: Test security against common attacks

**Test Steps**:
1. **XSS Testing**:
   - Try inputting `<script>alert("XSS")</script>` in testimonial form
   - Submit form
   - Verify script doesn't execute (no alert popup)
   - Check if input is properly escaped in display

2. **SQL Injection Testing**:
   - Try inputting `'; DROP TABLE users; --` in form fields
   - Verify database remains intact
   - Verify application handles malicious input gracefully

3. **Form Validation Testing**:
   - Test email format validation
   - Test phone number format validation
   - Test required field validation
   - Test input length limits

**Expected Results**: ✅ All malicious inputs are properly handled
**Status**: [ ] Pass [ ] Fail

---

## 🎯 LEVEL 5 TEST CASES (20 pts)

### ✅ TC-L5-001: User Dashboard (8 pts)
**Objective**: Test user subscription management

**Pre-conditions**: User logged in with active subscriptions

**Test Steps**:
1. **View Subscriptions**:
   - Navigate to `/dashboard/user`
   - Verify user's subscriptions are displayed
   - Check subscription details: plan, price, meal types, delivery days, status

2. **Pause Subscription**:
   - Click "Pause" on an active subscription
   - Enter pause dates when prompted
   - Verify subscription status changes to 'paused'
   - Verify pause dates are stored correctly

3. **Cancel Subscription**:
   - Click "Cancel" on an active subscription
   - Confirm cancellation in popup
   - Verify subscription status changes to 'cancelled'
   - Verify cancellation timestamp is recorded

4. **Reactivate Subscription**:
   - Click "Reactivate" on a paused/cancelled subscription
   - Verify subscription status changes back to 'active'
   - Verify reactivation timestamp is recorded

**Expected Results**: ✅ All subscription management features work
**Status**: [ ] Pass [ ] Fail

### ✅ TC-L5-002: Admin Dashboard (12 pts)
**Objective**: Test admin analytics and management

**Pre-conditions**: Admin logged in, sample subscription data exists

**Test Steps**:
1. **Dashboard Overview**:
   - Navigate to `/dashboard/admin`
   - Verify metrics display correctly:
     - New Subscriptions count
     - Monthly Recurring Revenue (MRR)
     - Reactivations count
     - Total Active Subscriptions

2. **Date Range Filtering**:
   - Change start/end dates in date picker
   - Verify metrics update based on selected date range
   - Test various date combinations

3. **Subscription Management**:
   - View "All Subscriptions" modal
   - Verify complete subscription list displays
   - Check filtering and search functionality
   - Test pagination (if implemented)

4. **Data Export**:
   - Click "Export CSV" button
   - Verify CSV file downloads
   - Open CSV file and verify data accuracy
   - Check all required columns are present

5. **Revenue Analytics**:
   - Verify revenue calculations are accurate
   - Test revenue breakdown by plan type
   - Check growth percentage calculations

**Expected Results**: ✅ Admin dashboard provides comprehensive business insights
**Status**: [ ] Pass [ ] Fail

---

## 🎯 BONUS FEATURES TEST CASES (25 pts)

### ✅ TC-BONUS-001: UI/UX Quality (10 pts)
**Objective**: Evaluate design and user experience

**Test Steps**:
1. **Visual Design**:
   - Check color scheme consistency
   - Verify typography is readable
   - Test button hover effects and animations
   - Check loading spinners and transitions

2. **Responsive Design**:
   - Test on various screen sizes (mobile, tablet, desktop)
   - Verify layout adapts properly
   - Check touch-friendly elements on mobile

3. **User Experience**:
   - Test form validation feedback
   - Check error message clarity
   - Verify success feedback is obvious
   - Test navigation intuitiveness

**Expected Results**: ✅ Professional, intuitive, and responsive design
**Status**: [ ] Pass [ ] Fail

### ✅ TC-BONUS-002: Deployment (15 pts)
**Objective**: Test production deployment

**Test Steps**:
1. **Deployment Process**:
   - Deploy to chosen platform (Vercel, Netlify, etc.)
   - Verify build process completes successfully
   - Check environment variables are configured

2. **Production Testing**:
   - Test all features work in production environment
   - Verify database connectivity in production
   - Test performance and loading times
   - Check SSL certificate and HTTPS

3. **Cross-browser Testing**:
   - Test on Chrome, Firefox, Safari, Edge
   - Verify compatibility across browsers
   - Check mobile browser functionality

**Expected Results**: ✅ App works flawlessly in production
**Status**: [ ] Pass [ ] Fail

---

## 📊 Test Execution Summary

### Quick Checklist:
- [ ] **Level 1** (10 pts): Static content displays
- [ ] **Level 2** (20 pts): Interactive features work
- [ ] **Level 3** (25 pts): Subscription system functional
- [ ] **Level 4** (25 pts): Authentication & security working
- [ ] **Level 5** (20 pts): Dashboards operational
- [ ] **Bonus** (25 pts): UI quality & deployment successful

### **Total Score**: ___/100 pts + ___/25 bonus pts

---

## 🐛 Bug Report Template

**Bug ID**: BUG-XXX
**Test Case**: TC-XX-XXX
**Severity**: Critical/High/Medium/Low
**Description**: 
**Steps to Reproduce**:
1. 
2. 
3. 
**Expected Result**:
**Actual Result**:
**Screenshot/Video**:
**Browser/Device**:
**Status**: Open/In Progress/Fixed/Closed

---

## 🚀 Ready to Test!

Bro, ini comprehensive test plan untuk memastikan app kamu benar-benar ready for submission! Eksekusi test cases ini step by step, dan catat hasilnya. Good luck! 🔥 