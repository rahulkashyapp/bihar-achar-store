# Bihar Achar Store - Complete E-commerce Website

A modern, fully-functional Indian e-commerce website for selling traditional Bihar-style homemade pickles. Built with Next.js 15, TypeScript, Tailwind CSS, and Prisma.

## 🌟 Features

### Customer-Facing Features
- **Modern UI/UX** with Indian traditional theme (red, yellow, rustic brown colors)
- **Homepage** with hero carousel, categories, top products, testimonials
- **Product Catalog** with detailed product pages
- **Shopping Cart** with add/remove/update functionality
- **Checkout Process** with UPI payment integration
- **Order Tracking** and confirmation
- **Responsive Design** for mobile, tablet, and desktop
- **SEO Optimized** with meta tags and structured data

### Admin Panel Features
- **Secure Admin Login** (/admin route)
- **Dashboard** with sales analytics and order statistics
- **Product Management** (Add, Edit, Delete products)
- **Order Management** (View, update order status)
- **Payment Verification** (Screenshot upload for UPI payments)
- **Settings Management** (UPI ID, contact info, etc.)

### Technical Features
- **Database**: SQLite with Prisma ORM
- **Authentication**: Admin panel with JWT-like token system
- **Payment Integration**: UPI intent-based payments
- **File Upload**: Payment screenshot uploads
- **State Management**: LocalStorage for cart persistence
- **API Routes**: RESTful APIs for products and orders

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd bihar-achar-store
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your database URL
```

4. **Set up the database**
```bash
npm run db:push
npm run db:generate
```

5. **Seed the database with sample data**
```bash
npx tsx seed.ts
```

6. **Start the development server**
```bash
npm run dev
```

7. **Open your browser**
Navigate to `http://localhost:3000`

## 📁 Project Structure

```
bihar-achar-store/
├── src/
│   ├── app/
│   │   ├── admin/                 # Admin panel routes
│   │   │   ├── page.tsx          # Admin login
│   │   │   └── dashboard/
│   │   │       └── page.tsx      # Admin dashboard
│   │   ├── api/                  # API routes
│   │   │   ├── products/         # Product APIs
│   │   │   └── orders/           # Order APIs
│   │   ├── cart/                 # Shopping cart page
│   │   ├── checkout/             # Checkout page
│   │   ├── about/                # About us page
│   │   ├── contact/              # Contact page
│   │   ├── terms/                # Terms & policies page
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   └── ui/                   # shadcn/ui components
│   ├── lib/
│   │   ├── db.ts                 # Prisma client
│   │   └── utils.ts              # Utility functions
│   └── hooks/
│       └── use-toast.ts          # Toast hook
├── prisma/
│   └── schema.prisma             # Database schema
├── public/                       # Static assets
├── seed.ts                       # Database seed script
└── package.json
```

## 🗄️ Database Schema

### Tables
- **Users**: Admin user accounts
- **Categories**: Product categories
- **Products**: Product information
- **Orders**: Customer orders
- **OrderItems**: Individual order items
- **Settings**: Store configuration

### Key Relationships
- Users → Orders (One-to-Many)
- Categories → Products (One-to-Many)
- Orders → OrderItems (One-to-Many)
- Products → OrderItems (One-to-Many)

## 🔐 Admin Access

### Default Admin Credentials
- **Email**: admin@biharachar.com
- **Password**: admin123

### Admin Features
1. **Dashboard Overview**
   - Total products, orders, pending orders
   - Revenue statistics
   - Recent orders list

2. **Product Management**
   - Add new products with images
   - Edit existing products
   - Delete products
   - Manage stock levels

3. **Order Management**
   - View all orders
   - Update order status (Pending → Packed → Shipped → Delivered)
   - Verify payment screenshots
   - View customer details

4. **Settings**
   - Update UPI ID
   - Change contact information
   - Modify payment instructions

## 💳 Payment Integration

### UPI Payment Flow
1. Customer selects UPI payment at checkout
2. QR code and UPI ID are displayed
3. Customer makes payment via any UPI app
4. Customer uploads payment screenshot
5. Admin verifies payment and processes order

### UPI Intent Integration
```javascript
const upiUrl = `upi://pay?pa=upi_id&pn=Merchant Name&am=amount&cu=INR`;
window.location.href = upiUrl;
```

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema to database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
```

### Environment Variables
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
```

## 📱 Mobile Responsiveness

The website is fully responsive with:
- **Mobile-first design approach**
- **Touch-friendly interface**
- **Optimized for all screen sizes**
- **Fast loading on mobile networks**

## 🎨 Design System

### Color Palette
- **Primary**: Red (#DC2626) - Traditional Indian color
- **Secondary**: Orange (#EA580C) - Rustic feel
- **Accent**: Yellow (#CA8A04) - Turmeric/spice color
- **Neutral**: Grays and whites for balance

### Typography
- **Font**: Geist Sans (clean, modern)
- **Headings**: Bold and prominent
- **Body Text**: Clear and readable

### Components
- Built with **shadcn/ui** component library
- Consistent design language
- Smooth animations and transitions
- Hover effects and micro-interactions

## 🚀 Deployment

### Production Deployment

1. **Build the application**
```bash
npm run build
```

2. **Set production environment variables**
```bash
export DATABASE_URL="your-production-database-url"
export NODE_ENV="production"
```

3. **Start the production server**
```bash
npm run start
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Vercel Deployment (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Railway/Heroku Deployment
1. Create a new project
2. Set DATABASE_URL environment variable
3. Deploy using GitHub integration

## 🔧 Customization

### Adding New Products
1. Go to admin panel (`/admin`)
2. Login with admin credentials
3. Navigate to Products tab
4. Click "Add Product"
5. Fill product details and save

### Modifying Colors
Edit `tailwind.config.ts` to customize the color scheme:
```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#DC2626',
        secondary: '#EA580C',
        accent: '#CA8A04',
      }
    }
  }
}
```

### Adding New Pages
1. Create new folder in `src/app/`
2. Add `page.tsx` file
3. Export default React component
4. Add navigation links as needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For any issues or questions:
- **Email**: info@biharachar.com
- **Phone**: +91 98765 43210
- **WhatsApp**: +91 98765 43210

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with **Next.js 15** and **TypeScript**
- UI components from **shadcn/ui**
- Styling with **Tailwind CSS**
- Database management with **Prisma**
- Icons from **Lucide React**

---

### 🎯 Ready to Launch!

Your Bihar Achar Store is now ready for production! The website includes all the features needed for a modern e-commerce platform with traditional Indian aesthetics. Customers can browse products, place orders, make payments via UPI, and track their orders, while admins have full control over products, orders, and store settings.