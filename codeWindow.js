// DOM Elements
const codeSendBtn      = document.getElementById("codeSendBtn");
const codeInput        = document.getElementById("codeInput");
const codeOutput       = document.getElementById("codeOutput");
const toggleHistoryBtn = document.getElementById("toggleHistoryBtn");
const historyPanel     = document.getElementById("historyPanel");
const closeHistoryBtn  = document.getElementById("closeHistoryBtn");
const historyList      = document.getElementById("historyList");
const clearHistoryBtn  = document.getElementById("clearHistoryBtn");

// Load history from localStorage
const savedHistory = JSON.parse(localStorage.getItem("codeHistory")) || [];
savedHistory.forEach(entry => addToHistory(entry.question, entry.answer));

// ---------------------------------------------
// Very basic coding‑question detector
function isCodingQuestion(text) {
  const keywords = [
    "code","function","var","let","const","class","method",
    "javascript","python","java","c++","c#","html","css","sql",
    "array","object","loop","error","debug","compile","run",
    "script","algorithm","react","node","vue","angular","django"
  ];
  const t = text.toLowerCase();
  return keywords.some(kw => t.includes(kw));
}

// ---------------------------------------------
// Extract code from Markdown fences
function parseCodeFromReply(reply) {
  const fenceRegex = /```(\w+)?\n([\s\S]*?)```/;
  const match = reply.match(fenceRegex);
  if (match) {
    return {
      language: match[1] || "javascript",
      code: match[2].trim()
    };
  }
  // fallback
  return {
    language: "javascript",
    code: reply
  };
}

// ---------------------------------------------
// History panel toggles
toggleHistoryBtn.addEventListener("click", () => {
  historyPanel.classList.add("open");
  toggleHistoryBtn.style.display = "none";
});
closeHistoryBtn.addEventListener("click", () => {
  historyPanel.classList.remove("open");
  toggleHistoryBtn.style.display = "block";
});

// ---------------------------------------------
// Main send handler
codeSendBtn.addEventListener("click", async () => {
  const question = codeInput.value.trim();
  if (!question) return;

  // Only coding questions
  if (!isCodingQuestion(question)) {
    const warning = document.createElement("div");
    warning.className = "warning";
    warning.textContent = "⚠️ Please ask a coding‑related question.";
    codeOutput.appendChild(warning);
    warning.scrollIntoView({ behavior: "smooth", block: "end" });
    setTimeout(() => warning.remove(), 3000);
    return;
  }

  // Build Q&A block
  const qaBlock = document.createElement("div");
  qaBlock.className = "qa-block";
  qaBlock.innerHTML = `
    <div class="question">👤 ${question}</div>
    <div class="answer-block">
      <button class="copy-btn">📋 Copy</button>
      <pre><code class="language-javascript">⏳ Asking AI...</code></pre>
    </div>
  `;
  codeOutput.appendChild(qaBlock);
  qaBlock.scrollIntoView({ behavior: "smooth", block: "end" });

  const codeEl = qaBlock.querySelector("code");
  const copyBtn = qaBlock.querySelector(".copy-btn");

  try {
    // Add a system prompt to force code‑only answers
    const messages = [
      {
        role: "system",
        content: "You are a helpful coding assistant. Always respond with code snippets only, formatted inside Markdown code fences with the appropriate language. Do not include any additional explanation."
      },
      { role: "user", content: question }
    ];

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages
      })
    });
    if (!res.ok) throw new Error("API error");

    const data  = await res.json();
    const reply = data.choices[0].message.content;

    // Parse and inject code
    const { language, code } = parseCodeFromReply(reply);
    codeEl.className = `language-${language}`;
    codeEl.textContent = code;
    Prism.highlightElement(codeEl);

    codeInput.value = "";
    codeOutput.scrollTop = codeOutput.scrollHeight;

    // Save to history
    addToHistory(question, code);
    savedHistory.push({ question, answer: code });
    localStorage.setItem("codeHistory", JSON.stringify(savedHistory));

    // Copy logic
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.textContent = "✅ Copied!";
        setTimeout(() => (copyBtn.textContent = "📋 Copy"), 2000);
      });
    });

  } catch (err) {
    codeEl.textContent = "❌ Failed to get response.";
    console.error(err);
  }
});

// ---------------------------------------------
// Add item to history panel
function addToHistory(question, answer) {
  const item = document.createElement("li");
  item.innerHTML = `
    <strong>Q:</strong> ${question}<br>
    <strong>A:</strong><pre><code class="language-javascript">${answer.slice(0, 200)}${answer.length>200?'...':''}</code></pre>
  `;
  // highlight inner code
  const innerCode = item.querySelector("code");
  Prism.highlightElement(innerCode);

  item.title = "Click to copy full code snippet";
  item.addEventListener("click", () => {
    navigator.clipboard.writeText(answer).then(() => {
      alert("✅ Code copied to clipboard!");
    });
  });
  historyList.prepend(item);
}

// ---------------------------------------------
// Clear all history
clearHistoryBtn.addEventListener("click", () => {
  if (!confirm("Clear all history?")) return;
  localStorage.removeItem("codeHistory");
  historyList.innerHTML = "";
  savedHistory.length = 0;
});

// ---------------------------------------------
// Press Enter to send (no Shift+Enter)
codeInput.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    codeSendBtn.click();
  }
});
