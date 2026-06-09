# 🌍 Language Translation Tool

## 📌 Project Overview
A web-based Language Translation Tool designed to break down language barriers. This project focuses on handling **real-time text data**, integrating external APIs, and processing user input efficiently — key concepts related to **API integration**, **text processing**, and **NLP applications**.

---

## 🚀 Live Demo & Preview

👉 **[Launch Live Translation Tool](https://language-translation-ps8x.onrender.com/)**

*⚠️ Note: Hosted on Render's free tier, so the initial load may take 30–60 seconds if the server is inactive.*

### Application Preview
<img width="1600" height="788" alt="Language Translator Preview" src="https://github.com/user-attachments/assets/4db4b0c1-f9a4-407b-bd0b-684e879bc0da" />

---

## 🎯 Problem Statement
Language barriers make communication difficult across regions. This project aims to provide a simple and fast way to translate text and make it accessible using text-to-speech, solving for immediate cross-lingual communication needs.

---

## 📈 Key Features & Capabilities
* **Multi-lingual Support**: Translate text between English, Hindi, and Marathi.
* **Real-time Processing**: Fast translations powered by Google Translate (via `deep-translator` library).
* **Accessibility**: Built-in Text-to-Speech (TTS) for phonetic understanding of the translated output.
* **Latency Optimization**: Implemented both client-side and server-side caching to reduce API latency for repeated queries.
* **Modern UI**: Animated background (Vanta.js) with a sleek glassmorphism card design.
* **UX Enhancements**: Keyboard shortcut (**Ctrl + Enter**) for quick translation and clear loading states.

---

## 🛠️ Technologies Used

### Frontend
* HTML5 & CSS3 (Vanilla)
* JavaScript (ES6+)
* **Vanta.js & Three.js** (For high-performance web animations)

### Backend
* Python
* Flask (Micro-framework)

### Libraries & APIs
* **deep-translator** (Google Translate API wrapper for Python)

---

## 📂 Project Structure
```text
Language-Translation/
│
├── app.py          # Flask backend & API handling
├── index.html      # Main user interface
├── script.js       # Client-side logic & caching
├── style.css       # UI styling (Glassmorphism)
└── README.md       # Project documentation
```

---

## ⚙️ How It Works
1. **Input**: User enters text and selects source/target languages.
2. **Cache Check**: System checks local and server cache for existing results.
3. **Processing**: If not cached, the backend sends a request to the translation API.
4. **Display**: The translated text is returned and displayed instantly.
5. **Output**: Optional text-to-speech playback for phonetic understanding.

---

## ▶️ How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/Moin-27/Language-Translation.git
cd Language-Translation
```

### 2. Install Required Dependencies
```bash
pip install flask deep-translator
```

### 3. Run the Application
```bash
python app.py
```

---

# 👨‍💻 Author

**Moin Ahmed**

* 🔗 **LinkedIn**: [linkedin.com/in/moin-ahmed27](https://www.linkedin.com/in/moin-ahmed27/)
* 💻 **GitHub**: [github.com/Moin-27](https://github.com/Moin-27)
* 📊 **Tableau Public**: [public.tableau.com/app/profile/moin.ahmed27](https://public.tableau.com/app/profile/moin.ahmed27)
* 🌐 **Portfolio**: [moin-27.github.io/Portfolio](https://moin-27.github.io/Portfolio/)
