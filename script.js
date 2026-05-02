// ---------- Vanta.js Wave Background (same as SkillBridge) ----------
document.addEventListener("DOMContentLoaded", () => {
  if (typeof VANTA !== "undefined") {
    VANTA.WAVES({
      el: "body",
      mouseControls: true,
      touchControls: true,
      gyroControls: true,       // ✅ Phone hilao → waves hilti hain
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x112233,
      shininess: 30.00,
      waveHeight: 15.00,
      waveSpeed: 0.60,
      zoom: 0.90
    });
  }

  // ---------- iOS 13+ Gyroscope Permission ----------
  // Safari requires explicit user permission before accessing DeviceOrientationEvent
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const needsPermission =
    isMobile &&
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function";

  if (needsPermission) {
    // Create a floating permission button (shown only on iOS Safari)
    const permBtn = document.createElement("button");
    permBtn.id = "gyro-permission-btn";
    permBtn.textContent = "🌊 Enable Motion";
    permBtn.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      padding: 12px 28px;
      background: rgba(0, 120, 255, 0.85);
      color: #fff;
      border: none;
      border-radius: 30px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 120, 255, 0.5);
      animation: pulse 1.8s ease infinite;
    `;
    document.body.appendChild(permBtn);

    // Pulse animation for the button
    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse {
        0%, 100% { box-shadow: 0 4px 20px rgba(0,120,255,0.5); }
        50% { box-shadow: 0 4px 36px rgba(0,180,255,0.9); }
      }
    `;
    document.head.appendChild(style);

    permBtn.addEventListener("click", async () => {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === "granted") {
          permBtn.remove(); // Permission granted — button hatao
        } else {
          permBtn.textContent = "❌ Permission Denied";
          setTimeout(() => permBtn.remove(), 2000);
        }
      } catch (err) {
        console.warn("Gyro permission error:", err);
        permBtn.remove();
      }
    });
  }
});

// ---------- Translation Cache (client-side) ----------
const localCache = {};

async function translateText() {
  const text = document.getElementById("inputText").value.trim();
  const source = document.getElementById("source").value;
  const target = document.getElementById("target").value;
  const outputEl = document.getElementById("outputText");
  const btn = document.querySelector(".primary");

  if (!text) {
    alert("Please enter some text to translate!");
    return;
  }

  // Check local cache first — instant result, no network call
  const cacheKey = `${text}|${source}|${target}`;
  if (localCache[cacheKey]) {
    outputEl.value = localCache[cacheKey];
    return;
  }

  // Show loading state
  btn.disabled = true;
  btn.textContent = "Translating...";
  outputEl.value = "";

  try {
    const res = await fetch("/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, source, target })
    });

    const data = await res.json();

    if (data.error) {
      outputEl.value = "Error: " + data.error;
    } else {
      outputEl.value = data.translatedText;
      // Save to local cache
      localCache[cacheKey] = data.translatedText;
    }
  } catch (err) {
    outputEl.value = "Network error. Please try again.";
  } finally {
    btn.disabled = false;
    btn.textContent = "Translate";
  }
}

function speakText() {
  const text = document.getElementById("outputText").value;
  const lang = document.getElementById("target").value;

  if (!text) {
    alert("No text to speak!");
    return;
  }

  // Map simple language codes to proper BCP 47 locale codes for TTS
  const langMap = {
    "en": "en-US",
    "hi": "hi-IN",
    "mr": "mr-IN"
  };

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = langMap[lang] || lang;
  speech.rate = 0.9;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}

// Allow Ctrl+Enter to translate quickly
document.getElementById("inputText").addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "Enter") {
    translateText();
  }
});
