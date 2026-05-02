// ---------- Vanta.js Wave Background ----------
document.addEventListener("DOMContentLoaded", () => {
  if (typeof VANTA !== "undefined") {
    VANTA.WAVES({
      el: "body",
      mouseControls: true,   // Desktop: mouse se waves hilti hain
      touchControls: true,
      gyroControls: false,   // Manual gyro handle karenge neeche (more reliable)
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

  // ---------- Manual Gyroscope → Fake MouseMove (Android + iOS) ----------
  // Vanta's built-in gyroControls is buggy. Better approach:
  // listen to deviceorientation and convert tilt into synthetic mousemove events
  // that Vanta's mouseControls handles perfectly.

  function attachGyroListener() {
    window.addEventListener("deviceorientation", (event) => {
      const beta  = event.beta;   // Tilt front/back: -180 to 180
      const gamma = event.gamma;  // Tilt left/right: -90 to 90

      if (beta === null || gamma === null) return;

      // Map tilt angles to screen coordinates
      // gamma: -90..90  → 0..screenWidth
      // beta:  -90..90  → 0..screenHeight  (clamp to ±90 for natural feel)
      const clampedBeta  = Math.max(-90, Math.min(90, beta));
      const x = ((gamma + 90) / 180) * window.innerWidth;
      const y = ((clampedBeta + 90) / 180) * window.innerHeight;

      // Dispatch synthetic mousemove — Vanta picks this up automatically
      document.dispatchEvent(new MouseEvent("mousemove", {
        clientX: x,
        clientY: y,
        bubbles: true
      }));
    });
  }

  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  if (!isMobile) return; // Desktop pe gyro ki zaroorat nahi

  // ---- iOS 13+ needs explicit permission (Safari) ----
  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    // Show a tappable button — iOS requires a user gesture to grant permission
    const permBtn = document.createElement("button");
    permBtn.id = "gyro-permission-btn";
    permBtn.textContent = "🌊 Enable Motion Effects";

    const pulseStyle = document.createElement("style");
    pulseStyle.textContent = `
      @keyframes gyro-pulse {
        0%, 100% { box-shadow: 0 4px 24px rgba(0,120,255,0.55); }
        50%       { box-shadow: 0 4px 40px rgba(0,180,255,0.95); }
      }
      #gyro-permission-btn {
        position: fixed;
        bottom: 28px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        padding: 13px 30px;
        background: rgba(0, 120, 255, 0.88);
        color: #fff;
        border: none;
        border-radius: 32px;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        animation: gyro-pulse 1.8s ease infinite;
        white-space: nowrap;
      }
    `;
    document.head.appendChild(pulseStyle);
    document.body.appendChild(permBtn);

    permBtn.addEventListener("click", async () => {
      try {
        const result = await DeviceOrientationEvent.requestPermission();
        if (result === "granted") {
          attachGyroListener();         // ✅ Listener lagao
          permBtn.textContent = "✅ Motion Enabled!";
          setTimeout(() => permBtn.remove(), 1500);
        } else {
          permBtn.textContent = "❌ Permission Denied";
          setTimeout(() => permBtn.remove(), 2000);
        }
      } catch (err) {
        console.warn("Gyro permission error:", err);
        permBtn.remove();
      }
    });

  } else {
    // ---- Android Chrome — permission needed nahi, seedha attach karo ----
    attachGyroListener();
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
