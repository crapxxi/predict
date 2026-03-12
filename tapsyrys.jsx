import { useState, useEffect, useRef } from "react";

const PRODUCTS = [
  { id: 1, name: "Coca-Cola 1.5L", category: "Beverages", price: 320, unit: "bottle", supplier: "Raimbek Bottlers", stock: 2400, img: "🥤", trend: 94, demandScore: 98 },
  { id: 2, name: "Lay's Classic 100g", category: "Snacks", price: 450, unit: "pack", supplier: "PepsiCo KZ", stock: 1800, img: "🍟", trend: 88, demandScore: 91 },
  { id: 3, name: "Bread Loaf 600g", category: "Bakery", price: 280, unit: "loaf", supplier: "Alatau Bread", stock: 600, img: "🍞", trend: 72, demandScore: 95 },
  { id: 4, name: "Whole Milk 1L", category: "Dairy", price: 390, unit: "carton", supplier: "Shymkent Dairy", stock: 900, img: "🥛", trend: 65, demandScore: 89 },
  { id: 5, name: "Instant Noodles", category: "Dry Goods", price: 180, unit: "pack", supplier: "Dodo Foods", stock: 3000, img: "🍜", trend: 91, demandScore: 87 },
  { id: 6, name: "Eggs (10pcs)", category: "Dairy", price: 520, unit: "tray", supplier: "Agrocom KZ", stock: 400, img: "🥚", trend: 60, demandScore: 93 },
  { id: 7, name: "Sunflower Oil 1L", category: "Oils", price: 680, unit: "bottle", supplier: "Efko KZ", stock: 1200, img: "🫙", trend: 55, demandScore: 82 },
  { id: 8, name: "Banana 1kg", category: "Fruits", price: 420, unit: "kg", supplier: "Fresh Market", stock: 800, img: "🍌", trend: 78, demandScore: 76 },
  { id: 9, name: "Doritos Nacho 130g", category: "Snacks", price: 580, unit: "pack", supplier: "PepsiCo KZ", stock: 1500, img: "🌮", trend: 97, demandScore: 85 },
  { id: 10, name: "Lipton Tea 100bags", category: "Beverages", price: 890, unit: "box", supplier: "Unilever KZ", stock: 700, img: "🍵", trend: 62, demandScore: 80 },
  { id: 11, name: "Watermelon (whole)", category: "Fruits", price: 2100, unit: "piece", supplier: "Qyzylorda Farm", stock: 200, img: "🍉", trend: 99, demandScore: 96 },
  { id: 12, name: "Greek Yogurt 200g", category: "Dairy", price: 340, unit: "cup", supplier: "Shymkent Dairy", stock: 500, img: "🥗", trend: 83, demandScore: 78 },
];

const TIKTOK_TRENDS = [
  { tag: "#WatermelonSugar", growth: "+340%", products: ["Watermelon (whole)"] },
  { tag: "#MidnightSnacks", growth: "+218%", products: ["Doritos Nacho 130g", "Instant Noodles"] },
  { tag: "#GroceryHaul", growth: "+189%", products: ["Lay's Classic 100g", "Coca-Cola 1.5L"] },
];

const SUPPLIERS = [
  { name: "Raimbek Bottlers", rating: 4.9, orders: 1240, city: "Almaty" },
  { name: "PepsiCo KZ", rating: 4.8, orders: 980, city: "Almaty" },
  { name: "Shymkent Dairy", rating: 4.7, orders: 760, city: "Shymkent" },
  { name: "Alatau Bread", rating: 4.6, orders: 540, city: "Almaty" },
];

const MARKET_STATS = {
  weeklyRevenue: 486000,
  topCategory: "Beverages",
  avgBasket: 12400,
  footfall: 847,
};

function TrendBadge({ score }) {
  const color = score >= 90 ? "#00ff88" : score >= 75 ? "#ffd700" : "#94a3b8";
  return (
    <span style={{ background: color + "22", color, border: `1px solid ${color}44`, borderRadius: 4, fontSize: 10, fontWeight: 700, padding: "2px 6px", letterSpacing: 1 }}>
      🔥 {score}
    </span>
  );
}

function AICartPanel({ cart, setCart, onClose }) {
  const aiRecs = PRODUCTS
    .filter(p => !cart.find(c => c.id === p.id))
    .sort((a, b) => b.demandScore - a.demandScore)
    .slice(0, 4);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: 380, background: "#0f1117", borderLeft: "1px solid #1e293b", zIndex: 100, display: "flex", flexDirection: "column", fontFamily: "'Space Mono', monospace" }}>
      <div style={{ padding: "24px 24px 16px", borderBottom: "1px solid #1e293b", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, color: "#00ff88", letterSpacing: 3, fontWeight: 700 }}>PREDICTIVE CART</div>
          <div style={{ fontSize: 20, color: "#f1f5f9", marginTop: 2 }}>{cart.length} items</div>
        </div>
        <button onClick={onClose} style={{ background: "#1e293b", border: "none", color: "#94a3b8", width: 36, height: 36, borderRadius: 8, cursor: "pointer", fontSize: 18 }}>×</button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        {cart.length === 0 && (
          <div style={{ color: "#475569", textAlign: "center", marginTop: 40, fontSize: 13 }}>Cart is empty. Browse products and add items.</div>
        )}
        {cart.map(item => (
          <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, padding: 12, background: "#1e293b", borderRadius: 10 }}>
            <span style={{ fontSize: 24 }}>{item.img}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 700 }}>{item.name}</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>₸{item.price} / {item.unit}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button onClick={() => setCart(c => c.map(x => x.id === item.id ? { ...x, qty: Math.max(1, x.qty - 1) } : x))} style={{ background: "#334155", border: "none", color: "#94a3b8", width: 24, height: 24, borderRadius: 4, cursor: "pointer" }}>-</button>
              <span style={{ color: "#f1f5f9", fontSize: 12, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
              <button onClick={() => setCart(c => c.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x))} style={{ background: "#334155", border: "none", color: "#94a3b8", width: 24, height: 24, borderRadius: 4, cursor: "pointer" }}>+</button>
            </div>
            <button onClick={() => setCart(c => c.filter(x => x.id !== item.id))} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 14 }}>🗑</button>
          </div>
        ))}

        {aiRecs.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 10, color: "#00ff88", letterSpacing: 3, fontWeight: 700, marginBottom: 12 }}>🤖 AI RECOMMENDATIONS</div>
            {aiRecs.map(p => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, padding: "10px 12px", background: "#00ff8808", border: "1px solid #00ff8822", borderRadius: 10, cursor: "pointer" }}
                onClick={() => setCart(c => [...c, { ...p, qty: 10 }])}>
                <span style={{ fontSize: 20 }}>{p.img}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "#e2e8f0" }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: "#00ff88" }}>Demand: {p.demandScore}%</div>
                </div>
                <span style={{ fontSize: 18, color: "#00ff88" }}>+</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: 20, borderTop: "1px solid #1e293b" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ color: "#64748b", fontSize: 13 }}>Total</span>
          <span style={{ color: "#00ff88", fontSize: 20, fontWeight: 700 }}>₸{total.toLocaleString()}</span>
        </div>
        <button style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #00ff88, #00d4aa)", border: "none", borderRadius: 10, fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 13, letterSpacing: 2, cursor: "pointer", color: "#0a0e1a" }}>
          SUBMIT ORDER
        </button>
      </div>
    </div>
  );
}

export default function Tapsyrys() {
  const [view, setView] = useState("dashboard");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const categories = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const filtered = PRODUCTS.filter(p =>
    (filterCat === "All" || p.category === filterCat) &&
    p.name.toLowerCase().includes(searchQ.toLowerCase())
  );

  const addToCart = (product) => {
    setCart(c => {
      const ex = c.find(x => x.id === product.id);
      if (ex) return c.map(x => x.id === product.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { ...product, qty: 1 }];
    });
  };

  const runAIAnalysis = async () => {
    setAiLoading(true);
    setAiAnalysis(null);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are an AI assistant for Tapsyrys, a B2B marketplace for small neighborhood markets in Kazakhstan (Almaty). 

Based on this market data:
- Weekly revenue: ₸486,000
- Top category: Beverages
- Avg basket size: 12,400 tenge
- Daily footfall: 847 customers
- TikTok trends: #WatermelonSugar (+340%), #MidnightSnacks (+218%), #GroceryHaul (+189%)
- Current season: Summer
- Location: Almaty, Kazakhstan

Top products by demand score: Coca-Cola (98), Bread (95), Watermelon (96), Eggs (93), Milk (89)

Give a SHORT actionable restock recommendation in 3-4 bullet points. Focus on:
1. Which products to prioritize ordering this week
2. How TikTok trends affect what to stock
3. One seasonal tip for Almaty summer

Be specific with quantities and products. Use ₸ for prices. Keep it concise and practical for a small market owner.`
          }]
        })
      });
      const data = await response.json();
      setAiAnalysis(data.content[0].text);
    } catch (e) {
      setAiAnalysis("• Stock up on Coca-Cola and cold beverages — summer demand peaks now.\n• Watermelon trend is viral — order 50+ units weekly.\n• Doritos and instant noodles for late-night shoppers (#MidnightSnacks trend).\n• Keep bread and eggs always fully stocked — daily essentials drive repeat visits.");
    }
    setAiLoading(false);
  };

  const styles = {
    app: { background: "#080c14", minHeight: "100vh", fontFamily: "'Space Mono', monospace", color: "#e2e8f0" },
    nav: { background: "#0a0e1a", borderBottom: "1px solid #1e293b", padding: "0 32px", display: "flex", alignItems: "center", gap: 0, height: 64 },
    logo: { fontSize: 22, fontWeight: 700, color: "#00ff88", letterSpacing: 2, marginRight: 40, fontFamily: "'Space Mono', monospace" },
    navBtn: (active) => ({ padding: "0 20px", height: 64, border: "none", background: "none", color: active ? "#00ff88" : "#64748b", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: 1, borderBottom: active ? "2px solid #00ff88" : "2px solid transparent", fontWeight: active ? 700 : 400 }),
    content: { padding: "32px", maxWidth: 1400, margin: "0 auto" },
    card: { background: "#0f1117", border: "1px solid #1e293b", borderRadius: 16, padding: 24 },
    statCard: { background: "#0f1117", border: "1px solid #1e293b", borderRadius: 12, padding: 20, flex: 1 },
    productCard: { background: "#0f1117", border: "1px solid #1e293b", borderRadius: 14, padding: 18, cursor: "pointer", transition: "border-color 0.2s" },
    btn: { background: "linear-gradient(135deg, #00ff88, #00d4aa)", border: "none", borderRadius: 8, padding: "10px 20px", fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 11, letterSpacing: 2, cursor: "pointer", color: "#0a0e1a" },
    btnGhost: { background: "none", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 20px", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 1, cursor: "pointer", color: "#94a3b8" },
    input: { background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "10px 16px", fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#e2e8f0", outline: "none" },
    sectionTitle: { fontSize: 11, color: "#00ff88", letterSpacing: 4, fontWeight: 700, marginBottom: 20 },
    tag: (active) => ({ padding: "6px 16px", borderRadius: 20, border: `1px solid ${active ? "#00ff88" : "#1e293b"}`, background: active ? "#00ff8815" : "none", color: active ? "#00ff88" : "#64748b", fontSize: 11, cursor: "pointer", fontFamily: "'Space Mono', monospace", letterSpacing: 1 }),
  };

  return (
    <div style={styles.app}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.logo}>TAP<span style={{ color: "#fff" }}>SY</span>RYS</div>
        {[["dashboard", "DASHBOARD"], ["marketplace", "MARKETPLACE"], ["suppliers", "SUPPLIERS"], ["analytics", "ANALYTICS"]].map(([key, label]) => (
          <button key={key} style={styles.navBtn(view === key)} onClick={() => setView(key)}>{label}</button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ fontSize: 11, color: "#475569" }}>Karateev Market • Almaty</div>
          <button style={{ ...styles.btn, position: "relative" }} onClick={() => setCartOpen(true)}>
            🛒 CART {cart.length > 0 && <span style={{ background: "#ff4466", borderRadius: "50%", padding: "1px 5px", fontSize: 10, marginLeft: 4 }}>{cart.reduce((s, i) => s + i.qty, 0)}</span>}
          </button>
        </div>
      </nav>

      {/* CART PANEL */}
      {cartOpen && <AICartPanel cart={cart} setCart={setCart} onClose={() => setCartOpen(false)} />}

      <div style={styles.content}>

        {/* DASHBOARD */}
        {view === "dashboard" && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, color: "#475569", letterSpacing: 3, marginBottom: 8 }}>THURSDAY, MARCH 12 • ALMATY</div>
              <h1 style={{ fontSize: 36, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#f1f5f9", margin: 0 }}>Good morning, Aibek 👋</h1>
              <p style={{ color: "#475569", marginTop: 8, fontSize: 13 }}>Your predictive cart has 4 new AI recommendations based on TikTok trends</p>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
              {[
                { label: "WEEKLY REVENUE", value: "₸486,000", change: "+12%", icon: "💰" },
                { label: "ACTIVE ORDERS", value: "7", change: "+3 today", icon: "📦" },
                { label: "AVG BASKET", value: "₸12,400", change: "+8%", icon: "🛍" },
                { label: "DAILY FOOTFALL", value: "847", change: "Peak hrs: 18-20", icon: "👥" },
              ].map((s, i) => (
                <div key={i} style={styles.statCard}>
                  <div style={{ fontSize: 20, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 10, color: "#475569", letterSpacing: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", margin: "4px 0" }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#00ff88" }}>{s.change}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
              {/* TikTok Trends */}
              <div style={styles.card}>
                <div style={styles.sectionTitle}>⚡ TIKTOK TREND SIGNALS</div>
                {TIKTOK_TRENDS.map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: i < TIKTOK_TRENDS.length - 1 ? "1px solid #1e293b" : "none" }}>
                    <div style={{ background: "#ff006622", border: "1px solid #ff006644", borderRadius: 8, padding: "6px 10px", fontSize: 11, color: "#ff4488", fontWeight: 700 }}>{t.tag}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>{t.products.join(", ")}</div>
                    </div>
                    <div style={{ fontSize: 12, color: "#00ff88", fontWeight: 700 }}>{t.growth}</div>
                  </div>
                ))}
              </div>

              {/* AI Insight */}
              <div style={{ ...styles.card, background: "linear-gradient(135deg, #0a0e1a, #0f1e17)" }}>
                <div style={styles.sectionTitle}>🤖 AI MARKET ADVISOR</div>
                {!aiAnalysis && !aiLoading && (
                  <div>
                    <p style={{ color: "#64748b", fontSize: 12, lineHeight: 1.7, marginBottom: 20 }}>
                      Get AI-powered restock recommendations based on your sales data, location, season, and current TikTok trends in Kazakhstan.
                    </p>
                    <button style={styles.btn} onClick={runAIAnalysis}>RUN ANALYSIS →</button>
                  </div>
                )}
                {aiLoading && (
                  <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#00ff88" }}>
                    <div style={{ width: 20, height: 20, border: "2px solid #00ff8844", borderTop: "2px solid #00ff88", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                    <span style={{ fontSize: 12 }}>Analyzing trends & sales data...</span>
                  </div>
                )}
                {aiAnalysis && (
                  <div>
                    <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.9, whiteSpace: "pre-line" }}>{aiAnalysis}</div>
                    <button style={{ ...styles.btnGhost, marginTop: 16, fontSize: 10 }} onClick={() => setAiAnalysis(null)}>↻ REFRESH</button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick order top products */}
            <div style={styles.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={styles.sectionTitle}>🔮 PREDICTIVE RESTOCK — TOP PICKS</div>
                <button style={styles.btnGhost} onClick={() => setView("marketplace")}>VIEW ALL</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {PRODUCTS.sort((a, b) => b.demandScore - a.demandScore).slice(0, 4).map(p => (
                  <div key={p.id} style={{ background: "#1e293b", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ fontSize: 28 }}>{p.img}</div>
                    <div style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 700 }}>{p.name}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#00ff88" }}>₸{p.price}</span>
                      <TrendBadge score={p.demandScore} />
                    </div>
                    <button style={{ ...styles.btn, fontSize: 10, padding: "8px", marginTop: 4 }} onClick={() => addToCart(p)}>+ ADD</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MARKETPLACE */}
        {view === "marketplace" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={styles.sectionTitle}>B2B MARKETPLACE</div>
              <h2 style={{ fontSize: 28, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#f1f5f9", margin: 0 }}>Browse & Order Products</h2>
            </div>

            <div style={{ display: "flex", gap: 14, marginBottom: 24, alignItems: "center" }}>
              <input style={{ ...styles.input, flex: 1 }} placeholder="Search products..." value={searchQ} onChange={e => setSearchQ(e.target.value)} />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {categories.map(cat => (
                  <button key={cat} style={styles.tag(filterCat === cat)} onClick={() => setFilterCat(cat)}>{cat}</button>
                ))}
              </div>
            </div>

            {/* Sort tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {[["all", "ALL PRODUCTS"], ["trending", "🔥 TRENDING"], ["ai-pick", "🤖 AI PICKS"]].map(([key, label]) => (
                <button key={key} style={{ ...styles.tag(activeTab === key), borderRadius: 8 }} onClick={() => setActiveTab(key)}>{label}</button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              {filtered
                .filter(p => activeTab === "trending" ? p.trend >= 80 : activeTab === "ai-pick" ? p.demandScore >= 88 : true)
                .map(p => {
                  const inCart = cart.find(c => c.id === p.id);
                  return (
                    <div key={p.id} style={{ ...styles.productCard, border: inCart ? "1px solid #00ff8844" : "1px solid #1e293b" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <span style={{ fontSize: 36 }}>{p.img}</span>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                          <TrendBadge score={p.trend} />
                          {p.demandScore >= 90 && <span style={{ fontSize: 9, color: "#7c3aed", background: "#7c3aed22", padding: "2px 6px", borderRadius: 4, letterSpacing: 1 }}>AI PICK</span>}
                        </div>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>{p.name}</div>
                      <div style={{ fontSize: 10, color: "#475569", marginBottom: 12 }}>{p.supplier} • {p.category}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <span style={{ fontSize: 16, color: "#00ff88", fontWeight: 700 }}>₸{p.price}</span>
                        <span style={{ fontSize: 10, color: "#475569" }}>per {p.unit}</span>
                      </div>
                      <div style={{ fontSize: 10, color: "#334155", marginBottom: 12 }}>Stock: {p.stock.toLocaleString()} units</div>
                      <button
                        style={{ ...styles.btn, width: "100%", padding: "10px", fontSize: 10 }}
                        onClick={() => addToCart(p)}
                      >
                        {inCart ? `✓ IN CART (${inCart.qty})` : "ADD TO CART"}
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* SUPPLIERS */}
        {view === "suppliers" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={styles.sectionTitle}>VERIFIED SUPPLIERS</div>
              <h2 style={{ fontSize: 28, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#f1f5f9", margin: 0 }}>Supplier Directory</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
              {SUPPLIERS.map((s, i) => (
                <div key={i} style={{ ...styles.card, display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: "linear-gradient(135deg, #00ff88, #00d4aa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                    🏭
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: "#475569", marginBottom: 12 }}>{s.city}, Kazakhstan</div>
                    <div style={{ display: "flex", gap: 16 }}>
                      <div>
                        <div style={{ fontSize: 10, color: "#475569" }}>RATING</div>
                        <div style={{ fontSize: 16, color: "#ffd700", fontWeight: 700 }}>⭐ {s.rating}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: "#475569" }}>ORDERS</div>
                        <div style={{ fontSize: 16, color: "#e2e8f0", fontWeight: 700 }}>{s.orders}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: "#475569" }}>STATUS</div>
                        <div style={{ fontSize: 11, color: "#00ff88", fontWeight: 700 }}>● VERIFIED</div>
                      </div>
                    </div>
                  </div>
                  <button style={styles.btn}>CONTACT</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANALYTICS */}
        {view === "analytics" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={styles.sectionTitle}>MARKET ANALYTICS</div>
              <h2 style={{ fontSize: 28, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#f1f5f9", margin: 0 }}>Sales Intelligence</h2>
            </div>

            {/* Demand bar chart */}
            <div style={{ ...styles.card, marginBottom: 20 }}>
              <div style={styles.sectionTitle}>PRODUCT DEMAND SCORES</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {PRODUCTS.sort((a, b) => b.demandScore - a.demandScore).slice(0, 8).map(p => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: 18, width: 28 }}>{p.img}</span>
                    <div style={{ width: 140, fontSize: 11, color: "#94a3b8", flexShrink: 0 }}>{p.name}</div>
                    <div style={{ flex: 1, background: "#1e293b", borderRadius: 4, height: 8, overflow: "hidden" }}>
                      <div style={{ width: `${p.demandScore}%`, height: "100%", background: p.demandScore >= 90 ? "linear-gradient(90deg, #00ff88, #00d4aa)" : p.demandScore >= 75 ? "linear-gradient(90deg, #ffd700, #ffaa00)" : "#334155", borderRadius: 4, transition: "width 1s ease" }} />
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b", width: 30, textAlign: "right" }}>{p.demandScore}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* TikTok impact */}
            <div style={{ ...styles.card, background: "linear-gradient(135deg, #0a0e1a, #160a1e)" }}>
              <div style={styles.sectionTitle}>📱 TIKTOK TREND IMPACT</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {TIKTOK_TRENDS.map((t, i) => (
                  <div key={i} style={{ background: "#1e293b", borderRadius: 12, padding: 18 }}>
                    <div style={{ fontSize: 15, color: "#ff4488", fontWeight: 700, marginBottom: 8 }}>{t.tag}</div>
                    <div style={{ fontSize: 28, color: "#00ff88", fontWeight: 700, marginBottom: 8 }}>{t.growth}</div>
                    <div style={{ fontSize: 10, color: "#475569" }}>Drives demand for:</div>
                    {t.products.map(p => (
                      <div key={p} style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>→ {p}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0e1a; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
      `}</style>
    </div>
  );
}
