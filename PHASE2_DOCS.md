# RentEase Phase 2: Admin Panel Documentation

## 📋 Overview

RentEase Phase 2 implements a comprehensive admin panel for furniture and appliance rental business management. The admin panel provides complete CRUD operations for products, order management, rental tracking, user analytics, and business insights.

**Status**: ✅ Complete & Ready for Testing
**Version**: 2.0.0
**Last Updated**: June 21, 2026

---

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18.2 + Vite + React Router + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs password hashing

### Project Structure
```
RentEase/
├── Backend/
│   ├── models/
│   │   ├── Admin.js          (NEW)
│   │   ├── Order.js          (NEW)
│   │   ├── User.js
│   │   ├── Product.js        (UPDATED)
│   │   └── Rental.js         (UPDATED)
│   ├── middleware/
│   │   ├── auth.js           (EXISTING)
│   │   └── adminAuth.js      (NEW)
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js         (NEW)
│   │   └── admin.js          (NEW - comprehensive)
│   └── server.js             (UPDATED)
│
└── frontend/src/
    ├── pages/
    │   ├── AdminLogin.jsx    (NEW)
    │   └── admin/            (NEW)
    │       ├── Dashboard.jsx
    │       ├── Products.jsx
    │       ├── ProductForm.jsx
    │       ├── Orders.jsx
    │       ├── Rentals.jsx
    │       ├── Users.jsx
    │       ├── Analytics.jsx
    │       └── Settings.jsx
    ├── components/
    │   ├── ProtectedAdminRoute.jsx   (NEW)
    │   ├── AdminNavbar.jsx           (NEW)
    │   ├── AdminSidebar.jsx          (NEW)
    │   └── AdminLayout.jsx           (NEW)
    ├── context/
    │   └── AuthContext.jsx   (UPDATED - admin support)
    ├── services/
    │   └── api.js            (UPDATED - admin endpoints)
    └── App.jsx               (UPDATED - admin routes)
```

---

## 🔐 Authentication System

### Admin Authentication Flow

```
1. Admin visits /admin/login
2. Enters email + password
3. Backend validates credentials
4. JWT token generated and returned
5. Token stored in localStorage as 'adminToken'
6. Admin redirected to /admin/dashboard
7. Token auto-attached to all /api/admin requests
```

### Token Structure
```javascript
{
  id: "admin_user_id",
  iat: 1782055906,
  exp: 1784647906
}
```

### Authorization Middleware

**adminProtect**: Checks if user has admin/super-admin role
**superAdminProtect**: Checks if user has super-admin role (for registering new admins)

---

## 📊 Data Models

### Admin Model
```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  name: String (required),
  role: String (enum: super-admin, admin, manager),
  permissions: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model (NEW)
```javascript
{
  userId: ObjectId (ref: User),
  items: [{
    productId: ObjectId,
    quantity: Number,
    rentalMonths: Number,
    priceAtTime: Number
  }],
  totalAmount: Number,
  status: String (enum: pending, confirmed, delivered, completed, cancelled),
  deliveryAddress: {
    street: String,
    city: String,
    zipcode: String
  },
  deliveryDate: Date,
  pickupDate: Date,
  paymentStatus: String (enum: pending, completed, failed),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Rental Model (UPDATED)
```javascript
{
  // ... existing fields ...
  returnDate: Date,           (NEW)
  status: String (updated),   // enum: pending, confirmed, delivered, returned, overdue, completed, cancelled
  damageReport: {             (NEW)
    description: String,
    amount: Number,
    reportedDate: Date
  },
  notes: String               (NEW)
}
```

### Product Model (UPDATED)
```javascript
{
  // ... existing fields ...
  lastRestocked: Date,        (NEW)
  condition: String,          (NEW) enum: new, good, fair, poor
  maintenanceHistory: [{      (NEW)
    date: Date,
    description: String,
    cost: Number,
    technician: String
  }]
}
```

---

## 🔌 API Endpoints

### Admin Authentication
```
POST   /api/admin/auth/login          - Login admin
POST   /api/admin/auth/register       - Create new admin (super-admin only)
GET    /api/admin/auth/me             - Get current admin
```

### Admin Dashboard
```
GET    /api/admin/dashboard           - Dashboard metrics
GET    /api/admin/analytics           - Comprehensive analytics
```

### Product Management
```
GET    /api/admin/products            - List all products
POST   /api/admin/products            - Create product
PUT    /api/admin/products/:id        - Update product
DELETE /api/admin/products/:id        - Delete product
```

### Order Management
```
GET    /api/admin/orders              - List all orders
GET    /api/admin/orders/:id          - Order details
PUT    /api/admin/orders/:id/status   - Update order status
POST   /api/orders                    - Create order (user checkout)
GET    /api/orders/user               - User's orders
```

### Rental Management
```
GET    /api/admin/rentals             - List rentals
GET    /api/admin/rentals/:id         - Rental details
PUT    /api/admin/rentals/:id/return  - Mark as returned
POST   /api/admin/rentals/:id/damage  - Report damage
```

### User Management
```
GET    /api/admin/users               - List users with stats
```

---

## 🎨 Frontend Features

### Admin Panel Pages

| Route | Component | Features |
|-------|-----------|----------|
| `/admin/login` | AdminLogin | Professional login modal |
| `/admin/dashboard` | Dashboard | Key metrics, recent orders, top products |
| `/admin/products` | Products | List, edit, delete products |
| `/admin/products/add` | ProductForm | Create new product |
| `/admin/products/:id/edit` | ProductForm | Edit existing product |
| `/admin/orders` | Orders | List orders, update status |
| `/admin/rentals` | Rentals | View rentals, mark returned, report damage |
| `/admin/users` | Users | User list with stats |
| `/admin/analytics` | Analytics | Business analytics |
| `/admin/settings` | Settings | Placeholder for Phase 3 |

### Components

**ProtectedAdminRoute**: Wrapper component for route protection
- Checks adminToken in localStorage
- Redirects to /admin/login if not authenticated

**AdminLayout**: Main layout wrapper
- Contains AdminNavbar + AdminSidebar + main content
- Responsive design (sidebar collapses on mobile)

**AdminNavbar**: Top navigation bar
- Shows RentEase logo
- Displays admin name and role
- Logout button

**AdminSidebar**: Left navigation menu
- Collapsible menu with icons
- Active route highlighting
- Menu items: Dashboard, Products, Orders, Rentals, Users, Analytics, Settings

---

## 🔄 User Checkout Flow (NEW)

1. **User adds products to cart** - Stored in CartContext
2. **User proceeds to checkout** - Navigate to /checkout
3. **User fills delivery details** - Address, city, zip, date
4. **User clicks "Place Order"** - POST /api/orders
5. **Backend creates Order document** - Order status: pending
6. **Backend creates Rental documents** - One per cart item
7. **Cart cleared** - CartContext.clearCart()
8. **User redirected to My Rentals** - /my-rentals
9. **Admin can view in Orders panel** - Can update status

---

## 🧮 Metrics & Calculations

### Dashboard Metrics
```javascript
totalRevenue:    Sum of all Order.totalAmount
activeRentals:   Count of Rental with status='active'
totalUsers:      Count of all User documents
totalOrders:     Count of all Order documents
totalProducts:   Count of all Product documents
recentOrders:    Last 5 orders with user details
topProducts:     Top 5 products by rental count
```

### Analytics Metrics
```javascript
totalRevenue:        Sum of all orders
thisMonthRevenue:    Sum of orders created this month
totalUsers:          Count of users
newUsersThisMonth:   Count of users created this month
totalProducts:       Count of products
activeRentals:       Count of active rentals
topRentalProducts:   Top 10 by rental count
```

### User Stats
```javascript
totalRentals:        Count of rentals for user
totalSpent:          Sum of user's order totals
joinDate:            user.createdAt
```

---

## 🔑 Key Features Implemented

### ✅ Complete
- Admin authentication with JWT
- Role-based access control
- Product CRUD operations
- Order creation and management
- Rental tracking and status updates
- Damage reporting
- User management with stats
- Analytics dashboard
- Professional responsive UI
- Database indexing for performance

### 🔄 Integration Complete
- Checkout flow creates orders
- Orders create associated rentals
- Admin panel updates propagate
- Real-time data aggregation

### ⏳ Future (Phase 3)
- Toast notifications
- Chart visualizations (recharts)
- Email notifications
- Payment gateway integration
- Advanced filtering & search
- Export to CSV
- User roles & permissions management

---

## 🧪 Testing

See `TESTING_GUIDE.md` for comprehensive testing procedures.

### Quick Test
1. Start backend: `npm run dev` (Backend folder)
2. Start frontend: `npm run dev` (frontend folder)
3. Visit: http://localhost:5173/admin/login
4. Login: admin@rentease.com / admin123
5. Test dashboard, create products, place orders as user, view in admin

---

## 🚀 Deployment

### Environment Variables
```
MONGODB_URI=mongodb://localhost:27017/rentease
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
PORT=5000
```

### Build & Deploy
```bash
# Backend
cd Backend
npm install
npm run dev  # development
# For production: use pm2 or similar

# Frontend
cd frontend
npm install
npm run build  # Creates dist folder
npm run preview  # Test production build
```

---

## 📈 Performance Optimizations

### Database Indexes
```javascript
// Products
productSchema.index({ category: 1 });

// Orders
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ status: 1 });

// Rentals
rentalSchema.index({ userId: 1, status: 1 });
rentalSchema.index({ productId: 1 });
rentalSchema.index({ createdAt: -1 });
```

### Frontend Optimization
- Code splitting via React Router
- Lazy loading of admin pages
- Efficient re-renders via useContext
- Optimized images & assets

---

## 🔒 Security

### Implemented
- Password hashing with bcryptjs (10 salt rounds)
- JWT token expiration (30 days)
- Role-based access control
- Protected routes (frontend & backend)
- Input validation on backend
- CORS enabled

### Recommended (Phase 3)
- Rate limiting on auth endpoints
- CSRF protection
- SQL injection prevention
- XSS protection
- Admin activity logging
- Two-factor authentication

---

## 🛠️ Troubleshooting

### Common Issues

**Admin login fails**
- Ensure MongoDB is running
- Check admin account exists: `node create-admin.js`
- Verify JWT_SECRET in .env

**Orders not created**
- User must be logged in
- Cart must have items
- Check checkout form validation

**Analytics shows 0**
- Create test orders first
- Analytics aggregates from real data
- Allow time for order creation

**Product deletion fails**
- Product has active rentals
- Mark rentals as returned first
- Then delete product

---

## 📚 Code Quality

- **Naming**: Consistent, descriptive variable/function names
- **Structure**: Organized by feature/route
- **Comments**: Minimal but clear where needed
- **DRY**: Reusable components and functions
- **Error Handling**: Try-catch blocks, user-friendly messages
- **Validation**: Frontend & backend validation

---

## 📞 Support & Contact

For issues or questions:
1. Check TESTING_GUIDE.md for test procedures
2. Review code comments
3. Check git history for changes
4. Console logs show request/response flow

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | Jun 21, 2026 | Complete admin panel implementation |
| 1.0.0 | Jun 21, 2026 | Phase 1 MVP - User features |

---

## 🎯 Next Steps

1. **Test all features** using TESTING_GUIDE.md
2. **Deploy** to staging environment
3. **Get user feedback** on admin interface
4. **Plan Phase 3** enhancements
5. **Monitor** performance in production

---

**Built with ❤️ for RentEase | Phase 2 Complete**
