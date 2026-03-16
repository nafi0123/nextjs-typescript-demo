# 🌿 LUMINA | Luxury Skincare & Beauty

**LUMINA** (formerly Seoul Mirage) is a premium e-commerce platform dedicated to authentic skincare and beauty products. It features a seamless shopping experience, secure payments, and an AI-powered skincare assistant.

## 🚀 Live Demo
[View Live Site](https://luxury-skincare-beauty.vercel.app)

---

## ✨ Key Features

- **Responsive UI:** Modern, clean, and mobile-first design using Tailwind CSS and Shadcn UI.
- **AI Chatbot:** Integrated Gemini AI to help users find the perfect skincare routine based on product data.
- **Secure Payment:** Integrated **SSLCommerz** payment gateway for safe and local transactions in Bangladesh.
- **Product Management:** Dynamic product listing, category filtering, and detailed product views.
- **Authentication:** Secure login and registration powered by **NextAuth.js**.
- **Admin Dashboard:** Role-based access for managing orders and inventory (Work in Progress).
- **Shopping Cart:** Fully functional cart system with persistent state management.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS, Shadcn UI.
- **Backend:** Next.js API Routes (Serverless Functions).
- **Database:** MongoDB with Mongoose.
- **Authentication:** NextAuth.js.
- **Payment Gateway:** SSLCommerz.
- **AI Integration:** Google Generative AI (Gemini SDK).

---

## 🧪 Testing Credentials
For quick review and testing, you can use the following account:
- **Email:** `nafi2122940@gmail.com`
- **Password:** `123456`

---

## ⚙️ Environment Variables

To run this project locally, create a `.env` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# SSLCommerz
STORE_ID=your_store_id
STORE_PASSWORD=your_store_password
IS_LIVE=false

# AI
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000