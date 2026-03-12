import { useState } from "react";

const G = "#3aab4e";
const GL = "#e8f5ea";

const CATEGORIES = [
  { label: "Молочные продукты", icon: "🥛", key: "Dairy" },
  { label: "Бакалея", icon: "🛒", key: "Dry Goods" },
  { label: "Напитки", icon: "🥤", key: "Beverages" },
  { label: "Кондитерские изделия", icon: "🍰", key: "Snacks" },
  { label: "Овощи и фрукты", icon: "🥕", key: "Fruits" },
  { label: "Мясо и птица", icon: "🍖", key: "Meat" },
];

const PRODUCTS = [
  { id: 1, name: "Coca-Cola 1.5L", category: "Beverages", price: 320, unit: "бутылка", supplier: 'ТОО "Raimbek"', stock: 2400, img: "🥤", trend: 94, demandScore: 98 },
  { id: 2, name: "Lay's Classic 100г", category: "Snacks", price: 450, unit: "пачка", supplier: 'ТОО "PepsiCo KZ"', stock: 1800, img: "🍟", trend: 88, demandScore: 91 },
  { id: 3, name: "Хлеб белый 600г", category: "Dry Goods", price: 280, unit: "буханка", supplier: 'ТОО "Алатау Нан"', stock: 600, img: "🍞", trend: 72, demandScore: 95 },
  { id: 4, name: "Молоко цельное 1Л", category: "Dairy", price: 390, unit: "пакет", supplier: 'ТОО "Шымкент Сүт"', stock: 900, img: "🥛", trend: 65, demandScore: 89 },
  { id: 5, name: "Лапша быстрого приг.", category: "Dry Goods", price: 180, unit: "пачка", supplier: 'ТОО "Dodo Foods"', stock: 3000, img: "🍜", trend: 91, demandScore: 87 },
  { id: 6, name: "Яйцо куриное 10шт", category: "Dairy", price: 520, unit: "лоток", supplier: 'ТОО "Агроком KZ"', stock: 400, img: "🥚", trend: 60, demandScore: 93 },
  { id: 7, name: "Масло подсолн. 1Л", category: "Dry Goods", price: 680, unit: "бутылка", supplier: 'ТОО "Efko KZ"', stock: 1200, img: "🫙", trend: 55, demandScore: 82 },
  { id: 8, name: "Бананы 1кг", category: "Fruits", price: 420, unit: "кг", supplier: 'ТОО "Fresh Market"', stock: 800, img: "🍌", trend: 78, demandScore: 76 },
  { id: 9, name: "Doritos Nacho 130г", category: "Snacks", price: 580, unit: "пачка", supplier: 'ТОО "PepsiCo KZ"', stock: 1500, img: "🌮", trend: 97, demandScore: 85 },
  { id: 10, name: "Чай Lipton 100пак.", category: "Beverages", price: 890, unit: "коробка", supplier: 'ТОО "Unilever KZ"', stock: 700, img: "🍵", trend: 62, demandScore: 80 },
  { id: 11, name: "Арбуз (целый)", category: "Fruits", price: 2100, unit: "штука", supplier: 'ТОО "Qyzylorda Farm"', stock: 200, img: "🍉", trend: 99, demandScore: 96 },
  { id: 12, name: "Йогурт греческий 200г", category: "Dairy", price: 340, unit: "стакан", supplier: 'ТОО "Шымкент Сүт"', stock: 500, img: "🥗", trend: 83, demandScore: 78 },
];

const TIKTOK_TRENDS = [
  { tag: "#WatermelonSugar", growth: "+340%", products: ["Арбуз (целый)"] },
  { tag: "#MidnightSnacks", growth: "+218%", products: ["Doritos Nacho 130г", "Лапша"] },
  { tag: "#GroceryHaul", growth: "+189%", products: ["Lay's Classic 100г", "Coca-Cola"] },
];

const SUPPLIERS = [
  { name: 'ТОО "Агро-Фуд"', rating: 4.8, orders: 1240, city: "Алматы", desc: "Широкий ассортимент молочной продукции" },
  { name: 'ТОО "Raimbek Bottlers"', rating: 4.9, orders: 980, city: "Алматы", desc: "Напитки и безалкогольная продукция" },
  { name: 'ТОО "Шымкент Сүт"', rating: 4.7, orders: 760, city: "Шымкент", desc: "Молоко, сыры, кисломолочные продукты" },
  { name: 'ТОО "Алатау Нан"', rating: 4.6, orders: 540, city: "Алматы", desc: "Хлебобулочные изделия, выпечка" },
];

function ProductCard({ p, addToCart, cart }) {
  const inCart = cart.find(c => c.id === p.id);
  return (
    <div
      style={{ background: "#fff", borderRadius: 14, padding: 16, border: inCart ? `2px solid ${G}` : "1px solid #e5e7eb", cursor: "pointer" }}
      onMouseEnter={e => { if (!inCart) e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; }}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ width: 64, height: 64, background: "#f9fafb", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{p.img}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
          {p.trend >= 85 && <span style={{ fontSize: 11, background: "#fef3c7", color: "#d97706", padding: "2px 8px", borderRadius: 6, fontWeight: 600 }}>🔥 Тренд</span>}
          {p.demandScore >= 90 && <span style={{ fontSize: 11, background: GL, color: G, padding: "2px 8px", borderRadius: 6, fontWeight: 600 }}>🤖 ИИ</span>}
        </div>
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#111", marginBottom: 2 }}>{p.name}</div>
      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>{p.supplier}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>₸{p.price}</span>
        <span style={{ fontSize: 12, color: "#9ca3af" }}>/{p.unit}</span>
      </div>
      <button
        onClick={() => addToCart(p)}
        style={{ width: "100%", padding: "10px", background: inCart ? G : "#fff", border: `1.5px solid ${G}`, borderRadius: 10, color: inCart ? "#fff" : G, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
      >
        {inCart ? `✓ В корзине (${inCart.qty})` : "В корзину"}
      </button>
    </div>
  );
}

function CartDrawer({ cart, setCart, onClose }) {
  const aiRecs = PRODUCTS.filter(p => !cart.find(c => c.id === p.id)).sort((a, b) => b.demandScore - a.demandScore).slice(0, 3);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 420, background: "#fff", boxShadow: "-4px 0 24px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Моя корзина</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>{cart.length} позиций</div>
          </div>
          <button onClick={onClose} style={{ background: "#f3f4f6", border: "none", borderRadius: 8, width: 36, height: 36, fontSize: 18, cursor: "pointer", color: "#6b7280" }}>×</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {cart.length === 0 && <div style={{ color: "#9ca3af", textAlign: "center", marginTop: 60, fontSize: 14 }}>Корзина пуста</div>}
          {cart.map(item => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ width: 44, height: 44, background: GL, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.img}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>₸{item.price} / {item.unit}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f3f4f6", borderRadius: 8, padding: "4px 10px" }}>
                <button onClick={() => setCart(c => c.map(x => x.id === item.id ? { ...x, qty: Math.max(1, x.qty - 1) } : x))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#374151", fontFamily: "inherit" }}>−</button>
                <span style={{ fontSize: 14, fontWeight: 600, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                <button onClick={() => setCart(c => c.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: G, fontFamily: "inherit" }}>+</button>
              </div>
              <button onClick={() => setCart(c => c.filter(x => x.id !== item.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#d1d5db", fontSize: 16 }}>✕</button>
            </div>
          ))}
          {aiRecs.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: G, marginBottom: 10 }}>🤖 ИИ рекомендует добавить</div>
              {aiRecs.map(p => (
                <div key={p.id} onClick={() => setCart(c => [...c, { ...p, qty: 10 }])} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: GL, borderRadius: 10, marginBottom: 8, cursor: "pointer", border: `1px solid ${G}33` }}>
                  <span style={{ fontSize: 20 }}>{p.img}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: G }}>Спрос: {p.demandScore}%</div>
                  </div>
                  <span style={{ color: G, fontSize: 20, fontWeight: 700 }}>+</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ color: "#6b7280", fontSize: 14 }}>Итого:</span>
            <span style={{ fontSize: 20, fontWeight: 700 }}>₸{total.toLocaleString()}</span>
          </div>
          <button style={{ width: "100%", padding: 14, background: G, border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>Оформить заказ</button>
        </div>
      </div>
    </div>
  );
}

export default function Tapsyrys() {
  const [view, setView] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

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
      const apiKey = import.meta.env.VITE_GEMINI_KEY;
      const prompt = `Ты — ИИ-помощник для Tapsyrys, B2B маркетплейса для небольших магазинов у дома в Казахстане (Алматы).

Данные по магазину:
- Выручка за неделю: ₸486 000
- Топ-категория: Напитки
- Средний чек: ₸12 400, Посетителей в день: 847
- TikTok-тренды: #WatermelonSugar (+340%), #MidnightSnacks (+218%), #GroceryHaul (+189%)
- Сезон: Лето, Город: Алматы

Топ товары по спросу: Coca-Cola (98%), Хлеб (95%), Арбуз (96%), Яйца (93%), Молоко (89%)

Дай КРАТКИЕ рекомендации по закупке — 3-4 пункта. На русском языке. Конкретные товары и количества. Используй ₸ для цен.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) }
      );
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("No response");
      setAiAnalysis(text);
    } catch {
      setAiAnalysis("• Закупите Coca-Cola на 2 недели вперёд — летний пик спроса.\n• Арбузы вирусят в TikTok — заказывайте от 50 штук в неделю.\n• Doritos и лапша (#MidnightSnacks) — добавьте по 200 пачек.\n• Хлеб и яйца держите всегда в наличии — ежедневный трафик.");
    }
    setAiLoading(false);
  };

  const categories = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const filtered = PRODUCTS
    .filter(p => (filterCat === "All" || p.category === filterCat) && p.name.toLowerCase().includes(searchQ.toLowerCase()))
    .filter(p => activeTab === "trending" ? p.trend >= 80 : activeTab === "ai-pick" ? p.demandScore >= 88 : true);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#f3f4f6", minHeight: "100vh", color: "#111" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; } button, input { font-family: inherit; }`}</style>

      {cartOpen && <CartDrawer cart={cart} setCart={setCart} onClose={() => setCartOpen(false)} />}

      {/* HEADER */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", gap: 32 }}>
          <div onClick={() => setView("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }}>
            <div style={{ width: 42, height: 42, background: G, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🤝</div>
            <span style={{ fontWeight: 700, fontSize: 19, color: "#111" }}>Tapsyrys</span>
          </div>
          <nav style={{ display: "flex" }}>
            {[["home", "Каталог"], ["orders", "Мои заказы"], ["favorites", "Избранное"], ["help", "Помощь"]].map(([key, label]) => (
              <button key={key} onClick={() => setView(key)} style={{ padding: "0 18px", height: 64, background: "none", border: "none", borderBottom: view === key ? `3px solid ${G}` : "3px solid transparent", fontWeight: view === key ? 700 : 400, color: view === key ? G : "#374151", cursor: "pointer", fontSize: 15, textDecoration: view === key ? "underline" : "none", textUnderlineOffset: 4 }}>
                {label}
              </button>
            ))}
          </nav>
          <div style={{ marginLeft: "auto", display: "flex", gap: 16, alignItems: "center" }}>
            <button onClick={() => setView("suppliers")} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 14, fontWeight: 500 }}>Поставщики</button>
            <button onClick={() => setView("analytics")} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 14, fontWeight: 500 }}>Аналитика</button>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 26 }}>👤</button>
            <button onClick={() => setCartOpen(true)} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", fontSize: 26 }}>
              🛒
              {cartCount > 0 && <span style={{ position: "absolute", top: -2, right: -6, background: G, color: "#fff", borderRadius: "50%", width: 20, height: 20, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 48px" }}>

        {/* HOME */}
        {(view === "home" || view === "favorites" || view === "help") && (
          <div>
            {/* Search bar */}
            <div style={{ padding: "28px 0 24px" }}>
              <div style={{ display: "flex", gap: 0, borderRadius: 14, overflow: "hidden", border: `2px solid ${G}`, background: "#fff" }}>
                <input
                  value={searchQ}
                  onChange={e => { setSearchQ(e.target.value); }}
                  onKeyDown={e => e.key === "Enter" && setView("catalog")}
                  placeholder="Найти товар, бренд или поставщика..."
                  style={{ flex: 1, padding: "15px 20px", border: "none", fontSize: 15, outline: "none", background: "transparent" }}
                />
                <button onClick={() => setView("catalog")} style={{ padding: "15px 36px", background: G, border: "none", color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer", flexShrink: 0 }}>
                  Найти
                </button>
              </div>
            </div>

            {/* AI Banner */}
            <div style={{ background: `linear-gradient(135deg, ${G} 0%, #2d8f40 100%)`, borderRadius: 16, padding: "22px 32px", marginBottom: 28, display: "flex", alignItems: "center", gap: 20 }}>
              <span style={{ fontSize: 44 }}>🤖</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 18, color: "#fff", marginBottom: 4 }}>Предиктивная корзина на базе ИИ</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.88)" }}>Gemini анализирует TikTok-тренды, вашу статистику и сезонность — и предлагает оптимальный список закупки</div>
              </div>
              <button onClick={runAIAnalysis} disabled={aiLoading} style={{ padding: "13px 28px", background: "#fff", border: "none", borderRadius: 10, color: G, fontWeight: 700, fontSize: 14, cursor: "pointer", flexShrink: 0, opacity: aiLoading ? 0.7 : 1 }}>
                {aiLoading ? "⏳ Анализирую..." : "Получить рекомендации"}
              </button>
            </div>

            {/* AI Result */}
            {aiAnalysis && (
              <div style={{ background: "#fff", border: `1.5px solid ${G}55`, borderRadius: 12, padding: "18px 24px", marginBottom: 24 }}>
                <div style={{ fontWeight: 700, color: G, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>🤖 Рекомендации Gemini по закупке на эту неделю</span>
                  <button onClick={() => setAiAnalysis(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 20 }}>×</button>
                </div>
                <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.9, whiteSpace: "pre-line" }}>{aiAnalysis}</div>
              </div>
            )}

            {/* Popular Categories */}
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 14px" }}>Популярные категории</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 32 }}>
              {CATEGORIES.map(cat => (
                <div key={cat.key} onClick={() => { setFilterCat(cat.key); setView("catalog"); }}
                  style={{ background: "#fff", borderRadius: 14, padding: "20px 10px", textAlign: "center", cursor: "pointer", border: "1px solid #e5e7eb" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.boxShadow = `0 4px 16px ${G}22`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: 38, marginBottom: 10 }}>{cat.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "#374151", lineHeight: 1.3 }}>{cat.label}</div>
                </div>
              ))}
            </div>

            {/* Recommended Suppliers */}
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 14px" }}>Рекомендуемые поставщики</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
              {SUPPLIERS.map((s, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 40, height: 40, background: GL, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌿</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: "#f59e0b" }}>⭐ {s.rating}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{s.desc}</div>
                </div>
              ))}
              {/* Promo card */}
              <div style={{ background: GL, borderRadius: 12, padding: 16, border: `1px solid ${G}33`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🏷️</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: G, marginBottom: 12, lineHeight: 1.4 }}>Скидка 15% на первый заказ у новых поставщиков!</div>
                <button style={{ padding: "8px 16px", background: G, border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer", alignSelf: "flex-start" }}>Предложить</button>
              </div>
            </div>

            {/* TikTok Trends */}
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 14px" }}>📱 TikTok-тренды — что сейчас покупают</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 32 }}>
              {TIKTOK_TRENDS.map((t, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", border: "1px solid #e5e7eb" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#ec4899", marginBottom: 4 }}>{t.tag}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: G, marginBottom: 8 }}>{t.growth}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{t.products.join(", ")}</div>
                </div>
              ))}
            </div>

            {/* Top Products */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>🔥 Топ товары по спросу</h2>
              <button onClick={() => setView("catalog")} style={{ padding: "8px 18px", border: `1.5px solid ${G}`, borderRadius: 8, background: "#fff", color: G, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Смотреть все</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
              {[...PRODUCTS].sort((a, b) => b.demandScore - a.demandScore).slice(0, 4).map(p => (
                <ProductCard key={p.id} p={p} addToCart={addToCart} cart={cart} />
              ))}
            </div>
          </div>
        )}

        {/* CATALOG */}
        {view === "catalog" && (
          <div style={{ paddingTop: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Каталог товаров</h2>
            <div style={{ background: "#fff", borderRadius: 12, padding: 16, marginBottom: 20, border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Поиск товаров..." style={{ flex: 1, padding: "10px 16px", border: "1.5px solid #d1d5db", borderRadius: 10, fontSize: 14, outline: "none" }}
                  onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = "#d1d5db"} />
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setFilterCat(cat)} style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${filterCat === cat ? G : "#d1d5db"}`, background: filterCat === cat ? GL : "#fff", color: filterCat === cat ? G : "#374151", fontWeight: filterCat === cat ? 600 : 400, cursor: "pointer", fontSize: 13 }}>
                    {cat === "All" ? "Все категории" : cat}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {[["all", "Все товары"], ["trending", "🔥 В тренде"], ["ai-pick", "🤖 ИИ-выбор"]].map(([key, label]) => (
                <button key={key} onClick={() => setActiveTab(key)} style={{ padding: "8px 18px", borderRadius: 8, border: `1.5px solid ${activeTab === key ? G : "#d1d5db"}`, background: activeTab === key ? GL : "#fff", color: activeTab === key ? G : "#374151", fontWeight: activeTab === key ? 600 : 400, cursor: "pointer", fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
              {filtered.map(p => <ProductCard key={p.id} p={p} addToCart={addToCart} cart={cart} />)}
              {filtered.length === 0 && <div style={{ color: "#9ca3af", gridColumn: "1/-1", textAlign: "center", padding: 40 }}>Товары не найдены</div>}
            </div>
          </div>
        )}

        {/* SUPPLIERS */}
        {view === "suppliers" && (
          <div style={{ paddingTop: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Поставщики</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
              {SUPPLIERS.map((s, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 56, height: 56, background: GL, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>🌿</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{s.name}</div>
                    <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>{s.city} · {s.desc}</div>
                    <div style={{ display: "flex", gap: 20 }}>
                      <div><div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2 }}>Рейтинг</div><div style={{ fontSize: 16, color: "#f59e0b", fontWeight: 700 }}>⭐ {s.rating}</div></div>
                      <div><div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2 }}>Заказов</div><div style={{ fontSize: 16, fontWeight: 700 }}>{s.orders}</div></div>
                      <div><div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2 }}>Статус</div><div style={{ fontSize: 13, color: G, fontWeight: 700 }}>✓ Верифицирован</div></div>
                    </div>
                  </div>
                  <button style={{ padding: "10px 20px", background: G, border: "none", borderRadius: 10, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Связаться</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS */}
        {view === "orders" && (
          <div style={{ paddingTop: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Мои заказы</h2>
            {[
              { id: "ORD-2841", date: "11 марта 2026", supplier: 'ТОО "Raimbek Bottlers"', total: 48600, status: "Доставлен", items: 12 },
              { id: "ORD-2840", date: "9 марта 2026", supplier: 'ТОО "Шымкент Сүт"', total: 32100, status: "В пути", items: 8 },
              { id: "ORD-2839", date: "7 марта 2026", supplier: 'ТОО "Алатау Нан"', total: 15400, status: "Доставлен", items: 5 },
            ].map((o, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "18px 24px", border: "1px solid #e5e7eb", marginBottom: 12, display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{o.id} — {o.supplier}</div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>{o.date} · {o.items} позиций</div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>₸{o.total.toLocaleString()}</div>
                <span style={{ padding: "6px 14px", borderRadius: 20, background: o.status === "Доставлен" ? GL : "#fef3c7", color: o.status === "Доставлен" ? G : "#d97706", fontSize: 13, fontWeight: 600 }}>{o.status}</span>
                <button style={{ padding: "8px 16px", border: `1.5px solid ${G}`, borderRadius: 8, background: "#fff", color: G, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Повторить</button>
              </div>
            ))}
          </div>
        )}

        {/* ANALYTICS */}
        {view === "analytics" && (
          <div style={{ paddingTop: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Аналитика</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
              {[
                { label: "Выручка за неделю", value: "₸486 000", change: "+12%", icon: "💰" },
                { label: "Активных заказов", value: "7", change: "+3 сегодня", icon: "📦" },
                { label: "Средний чек", value: "₸12 400", change: "+8%", icon: "🛍" },
                { label: "Посетителей/день", value: "847", change: "Пик: 18-20ч", icon: "👥" },
              ].map((st, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #e5e7eb" }}>
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{st.icon}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>{st.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>{st.value}</div>
                  <div style={{ fontSize: 12, color: G, marginTop: 2 }}>{st.change}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 18 }}>Рейтинг спроса на товары</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[...PRODUCTS].sort((a, b) => b.demandScore - a.demandScore).slice(0, 8).map(p => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 18, width: 28 }}>{p.img}</span>
                    <div style={{ width: 180, fontSize: 13, color: "#374151", flexShrink: 0 }}>{p.name}</div>
                    <div style={{ flex: 1, background: "#f3f4f6", borderRadius: 6, height: 10, overflow: "hidden" }}>
                      <div style={{ width: `${p.demandScore}%`, height: "100%", background: p.demandScore >= 90 ? G : p.demandScore >= 75 ? "#f59e0b" : "#d1d5db", borderRadius: 6 }} />
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", width: 36, textAlign: "right" }}>{p.demandScore}%</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb" }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>📱 Влияние TikTok-трендов</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                {TIKTOK_TRENDS.map((t, i) => (
                  <div key={i} style={{ background: "#fdf2f8", border: "1px solid #fbcfe8", borderRadius: 12, padding: 18 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#ec4899", marginBottom: 6 }}>{t.tag}</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: G, marginBottom: 8 }}>{t.growth}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>Влияет на спрос:</div>
                    {t.products.map(p => <div key={p} style={{ fontSize: 12, color: "#374151", marginTop: 2 }}>→ {p}</div>)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
