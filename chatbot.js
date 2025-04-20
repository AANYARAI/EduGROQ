let chatHistory = [];
    async function sendToAI() {
        const input = document.getElementById("questionInput");
        const message = input.value.trim();
        if (!message) return;
    
        addMessage("user", message);
        input.value = "";
    
        fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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"
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [{ role: "user", content: message }]
            })
        })
        .then(res => {
            if (!res.ok) throw new Error("Network response was not okay");
            return res.json();
        })
        .then(data => {
            const reply = data.choices[0].message.content.trim();
            addMessage("ai", reply);
    
            // ✅ Save BOTH question and answer to localStorage + sidebar history
            saveChatToHistory(message, reply);
        })
        .catch(err => {
            console.error(err);
            const errorMsg = "⚠️ Sorry, I couldn't process that.";
            addMessage("ai", errorMsg);
            saveChatToHistory(message, errorMsg); // Still save the failed result
        });
    }
    

    function updateHistory() {
        const list = document.getElementById("historyList");
        list.innerHTML = "";

        chatHistory.slice().reverse().forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = item.length > 40 ? item.slice(0, 40) + "..." : item;
            li.onclick = () => {
                document.getElementById("questionInput").value = item;
                document.getElementById("questionInput").focus();
            };
            list.appendChild(li);
        });
    }



        // Voice recognition logic
    const voiceBtn = document.getElementById("voiceInputBtn");
    const inputField = document.getElementById("questionInput");

    let recognition;
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            voiceBtn.classList.add('active');
            console.log("🎙️ Voice recognition started");
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            inputField.value = transcript;
            console.log("🗣️ You said:", transcript);
        };

        recognition.onerror = (event) => {
            console.error("❌ Voice recognition error:", event.error);
        };

        recognition.onend = () => {
            voiceBtn.classList.remove('active');
            console.log("🛑 Voice recognition ended");
        };
    } else {
        alert("⚠️ Sorry, your browser doesn't support Speech Recognition.");
        voiceBtn.disabled = true;
    }

    // Start recognition on button click
    voiceBtn.addEventListener("click", () => {
        if (recognition) recognition.start();
        
    });

    // Trigger sendToAI on Enter key
    const questionInput = document.getElementById("questionInput");

    questionInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submit or line break
            sendToAI(); // Call your send function
        }
    });

    function addMessage(sender, text) {
        const chatbox = document.getElementById("chatbox");

        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);
        messageDiv.innerText = text;

        chatbox.appendChild(messageDiv);
        chatbox.scrollTop = chatbox.scrollHeight; // Auto scroll
    }

    function toggleHistory() {
        const panel = document.getElementById("historyPanel");
        panel.style.display = panel.style.display === "none" ? "block" : "none";
    }

    function setUser(fullName) {
        const userName = document.getElementById('userName');
        const userHandle = document.getElementById('userHandle');
        const userAvatar = document.getElementById('userAvatar');

        userName.textContent = fullName;

        // Generate handle (e.g. John Doe -> @johndoe)
        const handle = "@" + fullName.toLowerCase().replace(/\s+/g, '');
        userHandle.textContent = handle;

        // Update avatar using ui-avatars.com
        const avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=0D8ABC&color=fff&size=60`;
        userAvatar.src = avatarURL;
    }

    function saveChatToHistory(question, answer) {
        const historyList = document.getElementById("historyList");

        const listItem = document.createElement("li");
        listItem.className = "history-item";

        // Display both question and answer nicely
        listItem.innerHTML = `
            <strong>Q:</strong> ${question}<br>
            <strong>A:</strong> ${answer}
        `;

        // Optionally: allow clicking to re-load this chat
        listItem.addEventListener("click", () => {
            questionInput.value = question;
            aiResponse.innerHTML = answer;
        });

        historyList.prepend(listItem); // Add to top
    }


    //NEW CHAT//
    document.addEventListener("DOMContentLoaded", () => {
        const newChatBtn = document.getElementById("newQuestionBtn");
        const questionInput = document.getElementById("questionInput");
        const chatbox = document.getElementById("chatbox");
        const aiResponse = document.getElementById("ai-response");

        newChatBtn.addEventListener("click", () => {
            // Apply fade-out effect
            chatbox.classList.add("fade-out");
            aiResponse.classList.add("fade-out");

            // After fade-out animation, clear the chat
            setTimeout(() => {
                chatbox.innerHTML = "";
                aiResponse.innerHTML = "";
                chatbox.classList.remove("fade-out");
                aiResponse.classList.remove("fade-out");

                // Optional message after reset
                const resetMsg = document.createElement("div");
                resetMsg.className = "system-msg";
                resetMsg.textContent = "Chat cleared. Ready for a new question!";
                chatbox.appendChild(resetMsg);

                setTimeout(() => resetMsg.remove(), 2000);
            }, 500); // Matches the 0.5s transition
        });
    });


    function saveChatToHistory(question, answer) {
        const historyList = document.getElementById("historyList");
    
        const listItem = document.createElement("li");
        listItem.className = "history-item";
    
        // Display both question and answer
        listItem.innerHTML = `
            <strong>Q:</strong> ${question}<br>
            <strong>A:</strong> ${answer}
        `;
    
        listItem.addEventListener("click", () => {
            questionInput.value = question;
            document.getElementById("ai-response").innerHTML = answer;
        });
    
        historyList.prepend(listItem);
    
        // Save to localStorage
        const saved = JSON.parse(localStorage.getItem("chatHistory")) || [];
        saved.unshift({ question, answer });
        localStorage.setItem("chatHistory", JSON.stringify(saved));
    }
    

    function loadChatHistory() {
        const saved = JSON.parse(localStorage.getItem("chatHistory")) || [];
        saved.forEach(({ question, answer }) => {
            saveChatToHistory(question, answer);
        });
    }
    document.addEventListener("DOMContentLoaded", () => {
        // existing code...
    
        loadChatHistory(); // ✅ load history on page load
    });

    document.getElementById("clearHistoryBtn").addEventListener("click", () => {
        if (confirm("Are you sure you want to clear all chat history?")) {
            localStorage.removeItem("chatHistory");
            document.getElementById("historyList").innerHTML = "";
        }
    });
    
//HOME BUTTON 
    document.getElementById("homeBtn").addEventListener("click", () => {
        window.location.href = "Index.html"; // Set the target HTML page
    });