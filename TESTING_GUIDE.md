# Phase 2: Admin Panel - Complete Testing Guide

## ✅ System Status

### Running Servers
- **Backend**: http://localhost:5000 (Node.js + Express)
- **Frontend**: http://localhost:5173 (React + Vite)
- **Database**: MongoDB (local)

### Test Credentials
```
Admin Login:
- Email: admin@rentease.com
- Password: admin123
- Role: super-admin

Test User (create via registration):
- Name: Test User
- Email: testuser@example.com
- Password: password123
```

---

## 📋 End-to-End Testing Flow

### Phase 1: Admin Authentication
1. Navigate to `http://localhost:5173/admin/login`
2. Enter credentials: `admin@rentease.com` / `admin123`
3. Click "Sign In"
4. **Expected**: Redirect to `/admin/dashboard`
5. **Verify**: 
   - Admin token stored in localStorage
   - Admin name displays in navbar
   - Sidebar shows with menu items

### Phase 2: Product Management
1. Click "📦 Products" in sidebar
2. Click "➕ Add Product" button
3. Fill form with:
   - **Name**: Queen Bed
   - **Description**: Premium queen bed with storage
   - **Category**: bed
   - **Monthly Price**: 1500
   - **Security Deposit**: 5000
   - **Quantity**: 5
   - **Tenure Options**: Select 3, 6, 12
4. Click "💾 Create"
5. **Expected**: Redirect to products list, new product appears

**Test Variations**:
- Edit product: Click ✏️ Edit, modify fields, save
- Delete product: Click 🗑️ Delete, confirm in modal

### Phase 3: User Checkout & Order Creation
1. Logout from admin (click logout in navbar)
2. Register new user or login as existing
3. Go to home page
4. Add 1-2 products to cart (various tenures)
5. Click "View Cart"
6. Verify items and total cost
7. Click "Proceed to Checkout"
8. Fill delivery form:
   - Street: 123 Main St
   - City: Mumbai
   - Zip Code: 400001
   - Delivery Date: Today + 1 day
9. Click "✓ Place Order"
10. **Expected**: 
    - Redirect to My Rentals
    - Order created in database
    - Rentals created for each item
    - Cart cleared

### Phase 4: Admin - Order Management
1. Login again as admin
2. Click "📋 Orders" in sidebar
3. **Verify**: 
   - New order appears in list
   - Shows user name, amount, status, date
   - Status dropdown works
4. Click status dropdown, change to "Confirmed"
5. **Expected**: Order status updates immediately
6. Optional: Click "View" button to see order details

### Phase 5: Admin - Rental Management
1. Click "🚚 Rentals" in sidebar
2. **Verify**: 
   - Rentals from checkout appear
   - Shows user, product, dates, status
3. Click "✓ Mark Returned" button
4. **Expected**: Rental status changes to "returned"
5. Test damage reporting (optional):
   - Click rental
   - Add damage description and cost
   - Verify damage report saves

### Phase 6: Admin - User Management
1. Click "👥 Users" in sidebar
2. **Verify**: 
   - User list displays
   - Shows name, email, city
   - Displays total rentals (from checkout)
   - Shows total spent amount

### Phase 7: Admin - Analytics Dashboard
1. Click "📈 Analytics" in sidebar
2. **Verify metrics**:
   - Total Revenue: Shows sum from orders
   - This Month Revenue: Shows current month total
   - Total Users: Count matches
   - New Users (This Month): Shows recent registrations
   - Active Rentals: Shows pending/delivered rentals
   - Top Products: Lists most rented products

### Phase 8: Admin Dashboard
1. Click "📊 Dashboard" in sidebar
2. **Verify cards**: 
   - Total Revenue card
   - Active Rentals card
   - Total Users card
   - Total Orders card
3. **Verify sections**:
   - Recent Orders (last 5)
   - Top Rented Products (top 5)

---

## 🧪 Advanced Test Scenarios

### Scenario 1: Multiple Products Checkout
1. Add 3 different products with different tenures to cart
2. Checkout
3. Admin panel: Verify 3 separate rentals created
4. Each rental should have correct product, tenure, dates

### Scenario 2: Status Workflow
1. User places order (Order created as "pending")
2. Admin updates order to "confirmed" 
3. Verify order status changes
4. Update to "delivered"
5. Check if associated rentals update to "delivered"

### Scenario 3: Product Deletion Protection
1. Create product
2. User orders it
3. Go to admin products
4. Try to delete product
5. **Expected**: Error message "Cannot delete product with active rentals"
6. After rental completes, should be deletable

### Scenario 4: Analytics Growth
1. Create 2-3 new user accounts
2. Each places different orders
3. Go to Analytics
4. Verify:
   - Total revenue increases
   - User count increases
   - Product rental counts update
   - Top products changes based on rentals

---

## 🔍 Verification Checklist

### Authentication
- [ ] Admin can login with correct credentials
- [ ] Admin token persists in localStorage
- [ ] Non-authenticated users redirect to /admin/login
- [ ] Regular users cannot access admin routes
- [ ] Logout clears admin session

### Products
- [ ] Can create product with all fields
- [ ] Can edit existing product
- [ ] Can delete product (when no active rentals)
- [ ] Cannot delete product with active rentals
- [ ] Product list shows all products
- [ ] Images display (if provided)

### Orders
- [ ] Orders created when user checks out
- [ ] Order shows correct total amount
- [ ] Order status dropdown works
- [ ] Status changes persist
- [ ] Recent orders visible on dashboard

### Rentals
- [ ] Rentals created for each cart item
- [ ] Rental dates calculated correctly (startDate + tenure months)
- [ ] Can mark rental as returned
- [ ] Can report damage with cost
- [ ] Damage report persists

### Users
- [ ] All users display in user management
- [ ] Rental count calculated correctly
- [ ] Total spent calculated correctly
- [ ] New users appear when registered

### Analytics
- [ ] Total revenue = sum of all order totals
- [ ] This month revenue = orders this month
- [ ] User counts accurate
- [ ] Top products = most rented products
- [ ] New users this month counts correctly

### UI/UX
- [ ] Sidebar navigation works smoothly
- [ ] Active link highlighting works
- [ ] Loading states display
- [ ] Error messages show clearly
- [ ] Responsive on mobile (sidebar collapses)
- [ ] Forms validate before submit

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "vite: command not found" | Run `npm install` in frontend |
| Admin login fails | Verify super-admin created: `node create-admin.js` |
| Checkout doesn't create order | Check backend is running, tokens are valid |
| Order doesn't appear in admin | Refresh page, check user is logged in |
| Can't delete product | Product has active rentals - mark them returned first |
| Analytics shows 0 revenue | No completed orders yet - place test orders |

---

## 📊 Expected Database State After Testing

After completing all tests, your MongoDB should have:

```
Users: 2-3 (admin + test users)
Products: 3-5 (created via product management)
Orders: 2-3 (from checkouts)
Rentals: 4-6 (multiple items per order)
Admins: 1 (super-admin@rentease.com)
```

---

## 🚀 Next Steps (Phase 3)

1. **Toast Notifications** - Add success/error messages
2. **Charts** - Install recharts for visualizations
3. **Email Integration** - Send order confirmations
4. **Payment Gateway** - Integrate Stripe/Razorpay
5. **Mobile App** - React Native version
6. **Advanced Analytics** - Custom reports, exports

---

## 📞 Support

If you encounter issues:
1. Check backend logs: `npm run dev` in Backend folder
2. Check browser console (F12 → Console tab)
3. Verify MongoDB is running: `mongo` or check compass
4. Clear localStorage and restart

---

**Happy Testing! 🎉**
