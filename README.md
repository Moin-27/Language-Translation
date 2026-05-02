# 🌍 Language Translation Tool

A web-based Language Translation Tool built using **Python (Flask)**, **HTML**, **CSS**, and **JavaScript**.

This project focuses on handling **real-time text data**, integrating APIs, and processing user input efficiently — key concepts relevant to **Data Analytics and NLP applications**.

---

## 🚀 Live Demo

👉 https://language-translation-ps8x.onrender.com/

⚠️ **Note:** Hosted on a free server (Render), so initial load may take 30-60 seconds if the server is inactive.

---

## 🎯 Problem Statement

Language barriers make communication difficult across regions. This project aims to provide a simple and fast way to translate text and make it accessible using text-to-speech, solving for immediate cross-lingual communication needs.

---

## ✨ Features

- **Multi-lingual Support:** Translate text between English, Hindi, and Marathi.
- **Real-time Processing:** Fast translations powered by Google Translate (via deep-translator library).
- **Accessibility:** Built-in Text-to-Speech (TTS) for translated output.
- **Optimization:** Implemented both client-side and server-side caching to reduce API latency for repeated queries.
- **Modern UI:** Animated background (Vanta.js) with a sleek glassmorphism card design.
- **UX Enhancements:** Keyboard shortcut (**Ctrl + Enter**) for quick translation and clear loading states.

---

## 🧠 Data Perspective

As a **Data Analyst**, this project helped me understand:
- **Unstructured Text Data:** Handling varied user inputs and preparing them for API consumption.
- **Data Flow & Transformation:** Managing the pipeline from user input → Backend processing → External API → Frontend display.
- **Latency Optimization:** Understanding latency and response optimization in real-time systems through effective caching.
- **Caching Strategies:** Understanding how to optimize data retrieval to improve user experience.

---

## 🛠️ Technologies Used

### Frontend
- HTML5, CSS3 (Vanilla)
- JavaScript (ES6+)

### Backend
- Python
- Flask (Micro-framework)

### Libraries / APIs
- **deep-translator:** Google Translate API wrapper for Python.
- **Vanta.js & Three.js:** For high-performance web animations.

---

## 📂 Project Structure

```
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

1. **Input:** User enters text and selects source/target languages.
2. **Cache Check:** System checks local and server cache for existing results.
3. **Processing:** If not cached, the backend sends a request to the translation API.
4. **Display:** The translated text is returned and displayed instantly.
5. **Output:** Optional text-to-speech playback for phonetic understanding.

---

## ▶️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Moin-27/Language-Translation.git
   cd Language-Translation
   ```
2. Install required dependencies:
   ```bash
   pip install flask deep-translator
   ```
3. Run the application:
   ```bash
   python app.py
   ```

---

## 📸 Screenshot

<img width="1600" height="788" alt="Language Translator Preview" src="https://github.com/user-attachments/assets/4db4b0c1-f9a4-407b-bd0b-684e879bc0da" />

---

## 👤 Author

**Moin Ahmed**  
🔗 [GitHub Profile](https://github.com/Moin-27)
