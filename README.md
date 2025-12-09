# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


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
│   │   ├── App.jsx      # Main Application Logic
│   │   └── App.css      # Responsive Glassmorphism Styles
│   │         
│   └── package.json
├── server/              # Node.js Backend
│   ├── index.js         # WebSocket Server & Market Simulator
│   └── package.json
└── README.md
