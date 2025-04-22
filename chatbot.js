let chatHistory = [];
let isCodeMode = false;
let codeWindow = null;

// DOM elements
const input = document.getElementById("questionInput");
const chatbox = document.getElementById("chatbox");
const aiResponse = document.getElementById("ai-response");
const voiceBtn = document.getElementById("voiceInputBtn");
const historyList = document.getElementById("historyList");

// Send message to AI
async function sendToAI() {
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: message }]
      })
    });

    if (!response.ok) throw new Error("Network Error");

    const data = await response.json();
    const reply = data.choices[0].message.content.trim();

    addMessage("ai", reply);
    saveChatToHistory(message, reply);

    if (isCodeMode && codeWindow && !codeWindow.closed) {
      codeWindow.postMessage({ type: 'updateCode', content: reply }, "*");
    }
  } catch (err) {
    console.error(err);
    const errorMsg = "⚠️ Sorry, something went wrong.";
    addMessage("ai", errorMsg);
    saveChatToHistory(message, errorMsg);
  }
}

function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.innerText = text;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function saveChatToHistory(question, answer) {
  const listItem = document.createElement("li");
  listItem.className = "history-item";
  listItem.innerHTML = `<strong>Q:</strong> ${question}<br><strong>A:</strong> ${answer}`;
  listItem.onclick = () => {
    input.value = question;
    aiResponse.innerHTML = answer;
  };
  historyList.prepend(listItem);
  const saved = JSON.parse(localStorage.getItem("chatHistory")) || [];
  saved.unshift({ question, answer });
  localStorage.setItem("chatHistory", JSON.stringify(saved));
}

function loadChatHistory() {
  const saved = JSON.parse(localStorage.getItem("chatHistory")) || [];
  saved.forEach(({ question, answer }) => saveChatToHistory(question, answer));
}

function toggleHistory() {
  const panel = document.getElementById("historyPanel");
  panel.style.display = panel.style.display === "none" ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
  loadChatHistory();

  document.getElementById("newQuestionBtn").addEventListener("click", () => {
    chatbox.classList.add("fade-out");
    aiResponse.classList.add("fade-out");

    setTimeout(() => {
      chatbox.innerHTML = "";
      aiResponse.innerHTML = "";
      chatbox.classList.remove("fade-out");
      aiResponse.classList.remove("fade-out");
      const resetMsg = document.createElement("div");
      resetMsg.className = "system-msg";
      resetMsg.textContent = "Chat cleared. Ready for a new question!";
      chatbox.appendChild(resetMsg);
      setTimeout(() => resetMsg.remove(), 2000);
    }, 500);
  });

  document.getElementById("clearHistoryBtn").addEventListener("click", () => {
    if (confirm("Clear all chat history?")) {
      localStorage.removeItem("chatHistory");
      historyList.innerHTML = "";
    }
  });

  document.getElementById("homeBtn").addEventListener("click", () => {
    window.location.href = "index.html";
  });
  document.getElementById("FeatureBtn").addEventListener("click", () => {
    window.location.href = "features.html";
  });


  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendToAI();
    }
  });

  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");

  if (name && email) {
    document.getElementById("userFullName").textContent = name;
    document.getElementById("userHandle").textContent = `@${email}`;
    const initials = name.split(" ").map(n => n[0]).join("").toUpperCase();
    document.getElementById("userInitialsBadge").textContent = initials;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  const logoutModal = document.getElementById("logoutModal");
  const confirmLogout = document.getElementById("confirmLogout");
  const cancelLogout = document.getElementById("cancelLogout");

  logoutBtn.addEventListener("click", () => {
    logoutModal.style.display = "flex";
  });

  confirmLogout.addEventListener("click", () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    window.location.href = "index.html";
  });

  cancelLogout.addEventListener("click", () => {
    logoutModal.style.display = "none";
  });
});

function toggleCodeMode() {
  const btn = document.getElementById("toggleCodeBtn");
  isCodeMode = !isCodeMode;
  btn.classList.toggle("active");
  input.placeholder = isCodeMode ? "Ask your coding question..." : "Search or type your question...";

  if (isCodeMode) {
    codeWindow = window.open("codeWindow.html", "CodeOutputWindow", "width=700,height=600,resizable=yes,scrollbars=yes");
  } else if (codeWindow && !codeWindow.closed) {
    codeWindow.close();
  }
}

let recognition;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';

  recognition.onstart = () => voiceBtn.classList.add('active');
  recognition.onend = () => voiceBtn.classList.remove('active');

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    input.value = transcript;
  };

  voiceBtn.addEventListener("click", () => recognition.start());
} else {
  alert("Speech recognition not supported in your browser.");
  voiceBtn.disabled = true;
}