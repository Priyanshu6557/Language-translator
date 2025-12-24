const btn = document.getElementById("translate-btn");
const inputEl = document.getElementById("input-text");
const sourceEl = document.getElementById("source-lang");
const targetEl = document.getElementById("target-lang");
const outputDiv = document.getElementById("output");

btn.addEventListener("click", async() => {
    const text = inputEl.value.trim();
    const sourceLang = sourceEl.value;
    const targetLang = targetEl.value;

    if (!text || sourceLang === targetLang) {
        outputDiv.textContent = text || "";
        return;
    }

    // Button animation
    btn.style.animation = "bounce 0.5s";
    setTimeout(() => (btn.style.animation = ""), 500);

    try {
        // Google Translate (unofficial) endpoint
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      text
    )}`;

        const res = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
            }
        });

        if (!res.ok) {
            throw new Error("HTTP " + res.status);
        }

        const data = await res.json();
        console.log("GT data:", data);

        // data[0] => sentences list, each: [translated, original, ...]
        let translated = "";
        if (Array.isArray(data) && Array.isArray(data[0])) {
            translated = data[0].map((part) => part[0]).join(" ");
        }

        outputDiv.textContent = translated || "No translation found.";
        outputDiv.classList.add("show");
    } catch (err) {
        console.error(err);
        outputDiv.textContent = "Translation error. Try again.";
        outputDiv.classList.add("show");
    }
});