# Language Translation Tool

This is a web-based Language Translation Tool developed using **Python (Flask)**, **HTML**, **CSS**, and **JavaScript**.  
It allows users to translate text between multiple languages using **Google Translate**, and listen to the translated text using text-to-speech.

---

## 🚀 Live Demo

Click here to use the application:  
👉 https://language-translation-ps8x.onrender.com/

---

## Features

1. Translate text between English, Hindi, and Marathi  
2. Accurate translations powered by **Google Translate**  
3. Animated wave background (Vanta.js) with glassmorphism UI  
4. Client-side & server-side **caching** for instant repeat translations  
5. Text-to-speech feature for translated text  
6. **Ctrl+Enter** keyboard shortcut for quick translation  
7. Loading states and error handling  

---

## Technologies Used

**Frontend**
1. HTML5  
2. CSS3  
3. JavaScript  

**Backend**
1. Python  
2. Flask  

**API / Libraries**
- Google Translate (via `deep-translator`)  
- Vanta.js (animated wave background)  
- Three.js (3D rendering for Vanta)  

---

## Project Structure
```
Language-Translation/
│
├── app.py          # Flask backend with Google Translate
├── index.html      # Frontend UI
├── script.js       # Translation logic + Vanta.js wave init
├── style.css       # Glassmorphism dark theme
└── README.md
```
---

## How It Works

1. User enters text.
2. User selects source and target language.
3. User clicks the Translate button.
4. Backend processes the translation using an API.
5. Translated text is displayed on the screen.
6. User can:
   - Click **Speak** to listen to the translated text.

---

## Screenshots
<img width="1600" height="788" alt="image" src="https://github.com/user-attachments/assets/4db4b0c1-f9a4-407b-bd0b-684e879bc0da" />

---

## Description

This application translates user input text using **Google Translate** (via deep-translator library).  
The backend is handled by Flask, and the frontend is created using HTML, CSS, and JavaScript.  
Features an animated wave background (Vanta.js), glassmorphism card design, translation caching for speed, and text-to-speech.

---

## Author

Moin Ahmed
GitHub: https://github.com/Moin-27
