
const WebSocket = require('ws');

// CRITICAL FIX: Use the port Render assigns, or fallback to 8080 for localhost
const port = process.env.PORT || 8080; 

const wss = new WebSocket.Server({ port: port });

console.log(`WebSocket Server running on port ${port}`);

// ... rest of your code (STOCKS constant, etc.) ...
// 1. Mock Data: Initial prices for supported stocks
const STOCKS = {
    'GOOG': 140.50,
    'TSLA': 215.30,
    'AMZN': 130.00,
    'META': 300.20,
    'NVDA': 450.10
};

// 2. Helper: Random price fluctuation (-0.5% to +0.5%)
function getUpdatedPrice(currentPrice) {
    const volatility = 0.005; 
    const change = currentPrice * (Math.random() * volatility * 2 - volatility);
    return parseFloat((currentPrice + change).toFixed(2));
}

// 3. Real-time Market Simulator (Updates prices every second)
setInterval(() => {
    for (let ticker in STOCKS) {
        STOCKS[ticker] = getUpdatedPrice(STOCKS[ticker]);
    }
    
    // Broadcast updates to connected clients based on their subscriptions
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN && client.subscriptions) {
            const update = {};
            // Only send data for stocks this specific user is subscribed to
            client.subscriptions.forEach(ticker => {
                if (STOCKS[ticker]) {
                    update[ticker] = STOCKS[ticker];
                }
            });
            if (Object.keys(update).length > 0) {
                client.send(JSON.stringify({ type: 'UPDATE', data: update }));
            }
        }
    });
}, 1000);

// 4. Handle Client Connections
wss.on('connection', (ws) => {
    console.log('New Client Connected');
    ws.subscriptions = new Set(); // Track subscriptions per user

    ws.on('message', (message) => {
        const parsed = JSON.parse(message);

        // Handle Subscription Request
        if (parsed.type === 'SUBSCRIBE') {
            const ticker = parsed.ticker.toUpperCase();
            if (STOCKS[ticker]) {
                ws.subscriptions.add(ticker);
                console.log(`Client subscribed to ${ticker}`);
                // Send immediate price upon subscription
                ws.send(JSON.stringify({ 
                    type: 'UPDATE', 
                    data: { [ticker]: STOCKS[ticker] } 
                }));
            }
        }
    });

    ws.on('close', () => console.log('Client Disconnected'));
});

console.log("WebSocket Server running on ws://localhost:8080");