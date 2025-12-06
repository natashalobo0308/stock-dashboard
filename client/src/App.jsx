
import { useState, useEffect, useRef } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { LayoutDashboard, Activity, LogOut } from 'lucide-react';
import './App.css';

const SUPPORTED_STOCKS = ['GOOG', 'TSLA', 'AMZN', 'META', 'NVDA'];

export default function App() {
  const [user, setUser] = useState(null);
  return user ? <Dashboard user={user} onLogout={() => setUser(null)} /> : <Login onLogin={setUser} />;
}

// --- Component: Login ---
function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  return (
    <div className="login-wrapper">
      <div className="glass-panel" style={{padding: '2rem', width: '100%', maxWidth: '350px', textAlign: 'center'}}>
        <div style={{marginBottom: '2rem'}}>
          <Activity size={48} color="#60a5fa" />
        </div>
        <h1 className="brand" style={{fontSize: '2rem', margin: '0 0 10px'}}>TradeFlow</h1>
        <p style={{color: '#94a3b8', marginBottom: '2rem'}}>Next-Gen Market Intelligence</p>
        <form onSubmit={(e) => { e.preventDefault(); if(email) onLogin(email); }}>
          <input 
            className="modern-input" 
            placeholder="access@id.com" 
            value={email}
            onChange={e => setEmail(e.target.value)} 
            style={{marginBottom: '1rem', width: '90%'}}
          />
          <button className="btn-glow" style={{width: '100%'}}>Enter Terminal</button>
        </form>
      </div>
    </div>
  );
}

// --- Component: Dashboard ---
function Dashboard({ user, onLogout }) {
  const [prices, setPrices] = useState({});
  const [history, setHistory] = useState({});
  const [subscribed, setSubscribed] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [tickerInput, setTickerInput] = useState('');
  
  const ws = useRef(null);

  const updateHistory = (ticker, price) => {
    setHistory(prev => {
      const oldHistory = prev[ticker] || [];
      const newPoint = { time: new Date().toLocaleTimeString(), price: price };
      return { ...prev, [ticker]: [...oldHistory, newPoint].slice(-20) };
    });
  };

  useEffect(() => {
    ws.current = new WebSocket('wss://stock-dashboard-9kvi.onrender.com');
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'UPDATE') {
        const updates = message.data;
        setPrices(prev => ({ ...prev, ...updates }));
        Object.keys(updates).forEach(ticker => updateHistory(ticker, updates[ticker]));
      }
    };
    return () => ws.current.close();
  }, []);

  const handleSubscribe = () => {
    const ticker = tickerInput.toUpperCase();
    if (ws.current.readyState !== WebSocket.OPEN) return;
    
    if (SUPPORTED_STOCKS.includes(ticker) && !subscribed.includes(ticker)) {
      ws.current.send(JSON.stringify({ type: 'SUBSCRIBE', ticker }));
      setSubscribed(prev => [...prev, ticker]);
      setTickerInput('');
      if (!selectedStock) setSelectedStock(ticker);
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar glass-panel" style={{borderRadius: 0, borderTop: 0, borderLeft: 0}}>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
          <Activity size={24} color="#60a5fa" />
          <div className="brand" style={{fontSize: '1.2rem'}}>TradeFlow</div>
        </div>
        
        <nav className="nav-group" style={{marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <div className="nav-item active">
            <LayoutDashboard size={20} /> <span className="nav-text">Dashboard</span>
          </div>
        </nav>

        <div className="nav-group" style={{marginTop: 'auto'}}>
          <div className="nav-item" onClick={onLogout} style={{color: '#ef4444'}}>
            <LogOut size={20} /> <span className="nav-text">Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Centering Wrapper: This forces everything to the middle */}
        <div className="content-wrapper">
          
          <div className="top-bar">
            <div>
              <h2 style={{margin:0}}>Market Overview</h2>
              <small style={{color:'#94a3b8'}}>Live connection active • {user.split('@')[0]}</small>
            </div>
          </div>

          {/* Ticker Input Section */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input 
                className="modern-input" 
                placeholder="Ticker..." 
                value={tickerInput}
                onChange={e => setTickerInput(e.target.value)}
                style={{ maxWidth: '300px' }} 
              />
              <button className="btn-glow" onClick={handleSubscribe}>+ Add</button>
            </div>
            
            <small style={{ color: '#64748b', fontSize: '0.85rem' }}>
              Supported: <span style={{ color: '#94a3b8' }}>GOOG, TSLA, AMZN, META, NVDA and others.</span>
            </small>
          </div>

          {/* Stock Grid */}
          <div className="stats-grid">
            {subscribed.map(ticker => (
              <StockCard 
                key={ticker} 
                ticker={ticker} 
                price={prices[ticker]} 
                isSelected={selectedStock === ticker}
                onClick={() => setSelectedStock(ticker)}
              />
            ))}
            {subscribed.length === 0 && <div style={{color:'#64748b'}}>Start by adding a ticker...</div>}
          </div>

          {/* Chart Section */}
          {selectedStock && history[selectedStock] && (
            <div className="glass-panel chart-container">
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1rem'}}>
                <h3>{selectedStock} Performance</h3>
                <span className="brand">${prices[selectedStock]?.toFixed(2)}</span>
              </div>
              
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history[selectedStock]}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['auto', 'auto']} hide />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px'}} 
                    itemStyle={{color: '#fff'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StockCard({ ticker, price, onClick, isSelected }) {
  const prevPrice = useRef(price);
  const direction = price >= prevPrice.current ? 'up' : 'down';
  
  useEffect(() => { prevPrice.current = price; }, [price]);

  return (
    <div 
      onClick={onClick}
      className={`glass-panel stock-card ${direction}`}
      style={{
        border: isSelected ? '2px solid #3b82f6' : undefined,
      }}
    >
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div className="ticker">{ticker}</div>
        <div style={{
          padding: '4px 8px', 
          borderRadius: '4px', 
          background: direction === 'up' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
          color: direction === 'up' ? '#10b981' : '#ef4444',
          fontSize: '0.8rem'
        }}>
          {direction === 'up' ? '▲' : '▼'}
        </div>
      </div>
      <div className="price">{price ? price.toFixed(2) : '---'}</div>
      <div className="change" style={{color: '#94a3b8'}}>USD Market</div>
    </div>
  );
}