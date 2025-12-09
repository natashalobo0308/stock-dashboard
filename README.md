# 📈 TradeFlow - Real-Time Stock Broker Dashboard

**TradeFlow** is a high-performance, institutional-grade stock trading dashboard that simulates real-time market data using WebSockets. It allows users to subscribe to live stock tickers, view dynamic price updates without refreshing, and visualize market trends with interactive charts.

Designed with a modern **Glassmorphism UI**, it is fully responsive across mobile, tablet, and desktop devices.

---

## 🚀 Features

* **Real-Time Data Feed:** Live stock price updates via native WebSockets (no polling).
* **Multi-User Sync:** Supports multiple concurrent users with independent subscriptions.
* **Dynamic Charting:** Interactive area charts visualizing price history (last 20 data points).
* **Instant Subscriptions:** Subscribe to supported tickers (`GOOG`, `TSLA`, `AMZN`, `META`, `NVDA`) instantly.
* **Responsive Glassmorphism UI:** A sleek, dark-mode aesthetic that adapts seamlessly to phones, tablets, and laptops.

---

## 🛠️ Tech Stack

### **Frontend**
* **React + Vite:** For ultra-fast development and optimized builds.
* **Recharts:** For high-performance data visualization.
* **Lucide React:** For modern, lightweight iconography.
* **CSS3 Variables:** For consistent theming and the "Frosted Glass" effect.

### **Backend**
* **Node.js:** Runtime environment.
* **ws (WebSocket):** Lightweight library for real-time bi-directional communication.

---

## 📂 Project Structure

```bash
stock-dashboard/
├── client/              # React Frontend
│   ├── src/
│   │   ├── App.jsx      # Main Application Logic (Dashboard & Login)
│   │   ├── App.css      # Responsive Glassmorphism Styles
│   │   └── main.jsx     # React Entry Point
│   └── package.json     # Frontend Dependencies
├── server/              # Node.js Backend
│   ├── index.js         # WebSocket Server & Market Simulator
│   └── package.json     # Backend Dependencies
└── README.md
```


⚡ Getting Started (How to Run Locally)
This project consists of two parts: the Backend Server (which provides the data) and the Frontend Client (which displays the data). You need to run both simultaneously.

Prerequisites
Node.js installed on your machine (v18 or higher recommended).
Git installed.

Step 1: Clone the Repository
Open your terminal and run:
```bash
git clone [https://github.com/natashalobo0308/stock-dashboard.git](https://github.com/natashalobo0308/stock-dashboard.git)
cd stock-dashboard
```


Step 2: Start the Backend Server
The backend handles the WebSocket connection and stock price simulation.
Open a terminal inside the project folder.
Navigate to the server folder and install dependencies:
```bash
cd server
npm install
```
Start the server:
```bash
node index.js
```
You should see the message: WebSocket Server running on port 8080 (or another port).


Step 3: Start the Frontend Client
The frontend is the React application that users interact with.
Open a new terminal window (keep the backend terminal running).
Navigate to the client folder and install dependencies:
```bash
cd client
npm install
```
Start the development server:
```bash
npm run dev
```


Open the link provided in the terminal (usually http://localhost:5173) in your web browser.

🌍 Deployment Guide
This project is configured for a split-deployment strategy:

Backend: Deployed on Render (for persistent WebSocket connections).
Render URL (https://stock-dashboard-9kvi.onrender.com)

Frontend: Deployed on Vercel (for fast UI delivery).
Vercel URL (https://stock-dashboard-woad.vercel.app/)
