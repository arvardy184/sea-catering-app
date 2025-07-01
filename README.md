# 🍽️ SEA Catering - Healthy Meals Delivery Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-ff69b4?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

## 🌟 Overview

**SEA Catering** adalah platform web modern untuk layanan makanan sehat kustomizable dengan pengiriman ke seluruh Indonesia. Platform ini menyediakan pengalaman pengguna yang luar biasa untuk eksplorasi menu, kustomisasi makanan, pemesanan, dan manajemen berlangganan.

### ✨ Fitur Utama

- 🏠 **Homepage Interaktif** - Landing page yang menarik dengan animasi smooth
- 🍽️ **Kustomisasi Makanan** - Sesuaikan menu berdasarkan preferensi diet dan alergi
- 🚚 **Pengiriman Nasional** - Jangkauan ke 25+ kota besar di Indonesia
- 📊 **Info Nutrisi Lengkap** - Detail kalori, protein, karbohidrat, dan vitamin
- ⏰ **Jadwal Fleksibel** - Atur pengiriman sesuai kebutuhan
- 🔒 **Keamanan Terjamin** - Standar keamanan pangan internasional
- 💬 **Customer Support 24/7** - Dukungan pelanggan yang responsif

## 🎯 Project Levels

Proyek ini dikembangkan dalam 5 level progresif:

### ✅ Level 1: Welcome to SEA Catering! (COMPLETED)
- [x] Homepage dengan branding SEA Catering
- [x] Slogan: "Healthy Meals, Anytime, Anywhere"
- [x] Section perkenalan layanan
- [x] Daftar fitur utama
- [x] Kontak: Manager Brian (08123456789)

### 🔄 Level 2: Making It Interactive (IN PROGRESS)
- [ ] Navigation bar responsif
- [ ] Menu/Meal Plans page interaktif
- [ ] Testimonials section dengan form

### 📋 Level 3: Building A Subscription System
- [ ] Form berlangganan dengan kalkulasi harga
- [ ] Integrasi database backend
- [ ] System management makanan

### 🔐 Level 4: Securing SEA
- [ ] Autentikasi & autorisasi pengguna
- [ ] Validasi & sanitasi input
- [ ] Proteksi XSS, SQL Injection, CSRF

### 👥 Level 5: User & Admin Dashboard
- [x] Dashboard pengguna untuk manage subscription
- [x] Dashboard admin dengan metrics bisnis  
- [x] Analytics dan reporting

## 🚀 Quick Start

### Prerequisites

Pastikan Anda telah menginstall:
- [Node.js](https://nodejs.org/) (v18.0.0 atau lebih baru)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone repository**
```bash
git clone https://github.com/your-username/sea-catering.git
cd sea-catering
```

2. **Install dependencies**
```bash
npm install
# atau
yarn install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` dengan konfigurasi Anda:
```env
# Database
DATABASE_URL="your-database-url"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# External Services
CLOUDINARY_URL="your-cloudinary-url"
STRIPE_SECRET_KEY="your-stripe-secret"
```

4. **Run development server**
```bash
npm run dev
# atau
yarn dev
```

5. **Setup database (optional)**
```bash
npx prisma db push
npx prisma db seed
```

6. **Open browser**
Buka [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

## 👤 Admin Access

Untuk mengakses Admin Dashboard:

1. **Login sebagai Admin**
   - Email: `corps@gmail.com`  
   - Password: `Arvan123!`

2. **Akses Dashboard**
   - Setelah login, klik "Dashboard" di navigation
   - Akan otomatis redirect ke Admin Dashboard jika role = ADMIN

3. **Fitur Admin Dashboard**
   - 📊 Business metrics (New Subscriptions, MRR, Reactivations)
   - 📅 Date range filtering
   - 📈 Subscription growth analytics
   - 📋 Recent subscriptions table
   - 📤 Export data to CSV

## 🔐 User Dashboard

Untuk User Dashboard:

1. **Register/Login** sebagai user biasa
2. **Akses Dashboard** - akan redirect ke User Dashboard
3. **Fitur User Dashboard**
   - 👀 View active subscriptions
   - ⏸️ Pause subscription dengan date range
   - ❌ Cancel subscription dengan konfirmasi
   - ▶️ Reactivate paused/cancelled subscriptions

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.3.4** - React framework dengan App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animasi dan interaksi
- **Lucide React** - Icon library modern

### UI Components
- **Custom Design System** - Komponen UI konsisten
- **Responsive Design** - Mobile-first approach
- **Glassmorphism Effects** - Modern visual effects
- **Smooth Animations** - Micro-interactions

### State Management
- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend (Coming Soon)
- **Prisma ORM** - Database management
- **PostgreSQL** - Primary database
- **NextAuth.js** - Authentication
- **Stripe** - Payment processing

## 📁 Project Structure

```
src/
├── app/                 # Next.js 14 app directory
│   ├── globals.css     # Global styles & CSS variables
│   ├── layout.tsx      # Root layout dengan metadata
│   └── page.tsx        # Homepage component
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   └── sections/      # Page sections
│       ├── Hero.tsx
│       ├── Features.tsx
│       └── Contact.tsx
├── lib/               # Utilities & configurations
│   └── utils.ts       # Helper functions
├── types/             # TypeScript definitions
├── hooks/             # Custom React hooks
└── store/             # State management
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary-orange: #FF6B35;    /* Appetite-stimulating */
--primary-green: #00C896;     /* Health & freshness */
--primary-navy: #2C3E50;      /* Trust & premium */

/* Food Categories */
--breakfast: #F39C12;         /* Golden yellow */
--lunch: #00C896;            /* Fresh green */
--dinner: #6C63FF;           /* Evening purple */
--snack: #FF6B35;            /* Orange */
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, large sizes dengan proper hierarchy
- **Body Text**: Regular weight, optimal line height
- **Special Text**: Gradients untuk highlights

## 📱 Responsive Breakpoints

```css
mobile: '320px',     /* Small phones */
sm: '640px',         /* Large phones */
md: '768px',         /* Tablets */
lg: '1024px',        /* Small laptops */
xl: '1280px',        /* Desktop */
2xl: '1536px',       /* Large screens */
```

## 🤝 Contact Information

### Manager Customer Service
- **Nama**: Brian
- **Telepon**: [08123456789](tel:08123456789)
- **Email**: info@seacatering.com
- **WhatsApp**: [+62 812-3456-789](https://wa.me/628123456789)

### Jam Operasional
- **Customer Support**: 24/7
- **Pengiriman**: Senin - Minggu, 06:00 - 22:00 WIB
- **Kantor Pusat**: Jakarta, Indonesia

## 📈 Performance Goals

- ⚡ **Page Load Time**: < 3 detik
- 📱 **Mobile Responsiveness**: > 95% score
- 🔍 **SEO Score**: > 90%
- ♿ **Accessibility**: WCAG 2.1 AA compliant
- 🎯 **Conversion Rate**: > 5% target

## 🔮 Roadmap

### Phase 1 (Current)
- [x] Homepage design & development
- [x] Responsive layout
- [x] Basic animations

### Phase 2 (Next)
- [ ] Interactive navigation
- [ ] Menu/meal plans showcase
- [ ] User testimonials

### Phase 3 (Future)
- [ ] Subscription system
- [ ] Payment integration
- [ ] User authentication

### Phase 4 (Advanced)
- [ ] Admin dashboard
- [ ] Analytics integration
- [ ] Advanced features

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Icon library
- [COMPFEST](https://compfest.id/) - Competition platform

---

<div align="center">
  <p>Built with ❤️ by Arvan</p>
  <p><strong>SEA Catering - Healthy Meals, Anytime, Anywhere</strong></p>
</div>
