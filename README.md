# 🛒 Tapsyrys — B2B Marketplace MVP

B2B маркетплейс для поставщиков и магазинов у дома в Казахстане.  
С предиктивной корзиной на основе AI, статистики и TikTok-трендов.

---

## 🚀 Запуск за 3 шага

### 1. Установи зависимости
```bash
npm install
```

### 2. Добавь API ключ
Скопируй файл `.env.example` и переименуй в `.env`:
```bash
cp .env.example .env
```
Затем открой `.env` и вставь свой ключ от Google Gemini:
```
VITE_GEMINI_KEY=AIza...
```
Ключ получить **бесплатно** на [aistudio.google.com/apikey](https://aistudio.google.com/apikey) — регистрация через Google аккаунт, без карты.

### 3. Запусти
```bash
npm run dev
```
Открой **http://localhost:5173**

---

## ✨ Что есть в MVP

| Раздел | Описание |
|--------|----------|
| **Dashboard** | Статистика рынка + TikTok тренды + AI-советник по закупкам |
| **Marketplace** | Каталог товаров с фильтрами, сортировкой по трендам и AI-picks |
| **Predictive Cart** | Умная корзина с AI-рекомендациями что добавить |
| **Suppliers** | Каталог верифицированных поставщиков |
| **Analytics** | Demand scores + TikTok impact analysis |

---

## 🏗 Структура проекта

```
tapsyrys/
├── src/
│   ├── main.jsx        # точка входа
│   └── Tapsyrys.jsx    # главный компонент
├── index.html
├── vite.config.js
├── package.json
└── .env                # твой API ключ (создать вручную)
```

---

## 🔧 Сборка для продакшена
```bash
npm run build
```
