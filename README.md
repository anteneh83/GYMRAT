# 🏋️ GYMRAT - Professional Fitness Management Platform

GYMRAT is a comprehensive, full-stack fitness management application designed for modern gyms. It bridges the gap between trainers and trainees with role-based dashboards, real-time progress tracking, and seamless session booking.

![Premium Banner](frontend/src/images/banner.png)

## 🌟 Key Features

### 👤 Role-Based Experience
- **Trainee Dashboard**: 
    - Interactive weight and BMI tracking using **Recharts**.
    - Session history and upcoming schedule management.
    - Editable profile stats for personal progress monitoring.
- **Trainer Portal**: 
    - Dedicated schedule management system.
    - Client session status control (Pending/Approved/Completed).
- **Admin Command Center**: 
    - High-level platform statistics (Total Users, revenue insights).
    - Comprehensive user and trainer management.

### 🎨 Premium UI/UX
- **Interactive Aesthetics**: Magnetic hover effects, glowing section headers, and seamless transitions.
- **Two-Column Contact Section**: Optimized layout featuring an interactive form and a detailed "Visit Us" panel with opening hours.
- **Mobile Responsive**: Fully optimized for a premium experience on any device.
- **Real-time Feedback**: Global toast notifications and button loading spinners for all major actions.

### 💳 Functional Depth
- **Custom Modal Booking**: Role-aware scheduling system replacing generic browser prompts.
- **Membership Management**: Tiered plans (Basic, Premium, Elite) with feature breakdowns.
- **Chapa Payment Simulation**: Modern, branded checkout flow for subscription processing.

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, React Router 7, React Scroll, Axios, Lucide React, Recharts, React Hot Toast |
| **Backend** | Node.js, Express.js (v5), JSON Web Tokens (JWT), BcryptJS |
| **Database** | MongoDB (Mongoose v9) |
| **Styling** | Vanilla CSS (Modern CSS3 with Variables & Keyframes) |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Running locally or MongoDB Atlas URI)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/anteneh83/GYMRAT.git
   cd GYMRAT
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```
   Seed the database (Optional):
   ```bash
   node seeder.js
   node seedRefinedTrainers.js
   ```
   Start the server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

## 📂 Project Structure

```text
GYM/
├── backend/            # Express.js Server
│   ├── config/         # DB Connection
│   ├── controllers/    # Route Logic
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Endpoints
│   └── server.js       # Entry Point
├── frontend/           # React SPA
│   ├── build/          # Production Assets
│   ├── public/         # Static HTML/Icons
│   └── src/            # Components, API & CSS
└── README.md
```

## 📬 Contact & Support

- **Location**: Bole Road, Addis Ababa, Ethiopia
- **Email**: info@gymrat.com
- **Phone**: +251 911 223344

---
*Built with ❤️ for the fitness community.*
