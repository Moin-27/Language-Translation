// ---------- Vanta.js Wave Background (same as SkillBridge) ----------
document.addEventListener("DOMContentLoaded", () => {
  if (typeof VANTA !== "undefined") {
    VANTA.WAVES({
      el: "body",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
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

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = lang;
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
