
# 💸 Personal Finance Tip Generator

A web application that helps users generate smart, tailored budgeting tips using Gemini AI based on their monthly income, expenses, and savings goals.

## ✨ Features

- Accepts user's monthly income, expenses, and savings goals
- Generates personalized budgeting advice using Gemini AI
- Clean and intuitive UI
- Supports advanced options for customization (optional)
- API key management and prompt visualization included

---

## 🚀 Live Demo

👉 https://arrkkkk.github.io/Personal-Finance-Tip-Generator-by-Axtech/

---

## 🧠 Powered By

- **Gemini AI** – for generating smart financial advice
- **Google Gemini API**
- **React.js / Tailwind CSS** – frontend stack

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/finance-tip-generator.git](https://github.com/Arrkkkk/IBM-GenAI-Final-Project.git
cd finance-tip-generator
```

### 2. Install Dependencies

```bash
npm install react
npm install react-dom
npm install tailwindcss
npm install axios
npm install dotenv
```

### 3. Set up Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key and paste it into the app input field
5. Click **"Save API Key"**

⚠️ Your key is stored locally and is **not** sent anywhere else.

---

## 🧪 How It Works

1. User enters income, expenses, and savings goals.
2. The app formats a prompt like:
   ```
   You are a personal finance coach. 
   User profile:
   - Income: ₹100000
   - Expenses: ₹86000
   - Goal: ₹20000
   - Mindset: balanced

   Based on this, give budgeting tips. 
   Keep tone friendly, motivating, and practical.
   ```
3. The prompt is sent to Gemini AI via the API.
4. AI-generated financial tips are returned and shown to the user.

---

## 🛠 Technologies Used

- React.js
- Tailwind CSS
- Gemini AI (Google)
- JavaScript (ES6+)

---

## 📄 License

© 2025 [Axtech]. All rights reserved.
