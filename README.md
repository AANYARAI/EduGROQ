🚀# EduGROQ
# 🌟 EduGROQ —Powered By GROQ. Driven by curiosity 

**EduGROQ** is a futuristic, AI-enhanced educational tutor website designed to simplify learning for students with intelligent features powered by the **GROQ API**. It supports dynamic chat, coding help, voice interaction, image-to-text doubt solving, smart summarization, and personalized learning suggestions — all wrapped in a sleek neon-themed UI.

📌 Problem Statement
Problem Statement 1 –Weave AI magic with Groq

🎯 Objective
To build a highly responsive, visually appealing, and fully functional AI tutoring platform for real-time doubt solving, concept understanding, and practice — completely frontend-powered and user-personalized using localStorage.

🧠 Team & Approach
Team Name:
Coding Monger's

Team Members:
[Aadarsh0912](https://github.com/Aadarsh0912) | Homepage  , Ask Groq , CodeBuddy , responsiive , SignUp 

[AANYARAI](https://github.com/AANYARAI)  | Feature Page ,Ask Your Doubt (Image/Video Upload),Smart Summary Generator, Personalized Suggestions

[PriyalPatel30](https://github.com/PriyalPatel30) | Layout(OF Features) , linking,collaboration ,Multilingual page

Your Approach:
🔍 Why You Chose This Problem
We identified a growing need for personalized, accessible, and interactive learning platforms, especially those that can support students beyond basic question-answer formats. Many existing solutions are either too rigid, lack real-time feedback, or are limited in interactivity. By integrating GROQ’s powerful LLM capabilities, we saw an opportunity to build a truly intelligent educational assistant that can not only answer questions but also explain concepts, review code, solve math problems,  Solve complex coding problem using Codebuddy  and give suggetions according to your progress—all in one place.

🛠️ Key Challenges You Addressed
Real-time Interactive Tutoring:
We implemented GROQ’s API for instant responses, integrated voice input, and added animated text for a more human-like experience.

Multi-modal Input Handling (Text, Image, Audio):
Supporting handwritten math problems and OCR-based image input required using tools like Tesseract.js for preprocessing and GROQ for generating natural answers.

Personalization and Suggestions based on your progress:
We used localStorage to remember users, track session history, and dynamically adjust suggestions based on users learning activity.

Frontend-Backend Integration:
Designing a smooth and responsive frontend that seamlessly communicates using GROQ API And GROQ URLs.

Design Consistency with a Neon/Dark Theme:
The UI/UX needed to be engaging for students, so we leaned into a glowing neon/glassmorphism look for both aesthetics and clarity.

🔄 Pivots, Brainstorms & Breakthroughs
Pivot from Plain QA Bot to Full Tutor:
Initially, the idea was just to build a Q&A assistant. But during development, we brainstormed adding features like a math editor, homework upload, peer-to-peer tutoring, and code review to make it a true “tutor.”

Breakthrough with OCR + GROQ:
Combining OCR for handwritten input and piping it into GROQ gave us a powerful “Ask Your Doubt” feature where users can just snap a photo and get an answer.
🛠️ Tech Stack
Core Technologies Used:
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI Backend**: [GROQ API](https://console.groq.com)
- **OCR**: Tesseract.js for image-to-text conversion
- **Speech**: Web Speech API (SpeechRecognition + SpeechSynthesis)
- **Storage**: `localStorage` for saving chat history, code, and progress
Sponsor Technologies Used (if any):
 Groq:We used GROQ Apis and GROQ urls to link out website with AI Assistant 

✨ Key Features
Highlight the most important features of your project:


### 🤖 Ask GROQ
Chat with your personal AI tutor via text or voice and get instant answers powered by GROQ's high-performance models.

### 💻 Coding Bot
Write and test code snippets in an interactive coding environment. Receive explanations, suggestions, and live debugging assistance.

### 🖼️ Ask Your Doubt (Image/Video Upload)
Upload images or screenshots of handwritten or printed questions. The site extracts the content using OCR and sends it to the AI for accurate answers.

### 🗣️ Voice Interaction
Full speech-to-text and voice output integration lets users speak questions and hear responses for hands-free learning.

### ✨ Smart Summary Generator
Paste or upload educational content and get a concise, meaningful summary of the text, helping with revisions and note-making.

### 🎯 Personalized Suggestions
AI dynamically suggests practice questions, topic recommendations, and summaries based on the user’s query history.

### 💡 Dynamic UI Tools
- Neon/glassmorphism theme
- Toggleable dark/light mode
- Animated avatars & typing effects
- Loading spinner and animated response area

🧪 Use Cases
📚 Homework Help

🧠 Concept Understanding

💻 Code Debugging

📝 Note Summarization

📷 Solving Handwritten Questions

🎙️ Voice-based Learning
---



📽️ Demo & Deliverables
Demo Video Link: [https://vimeo.com/1077537812?share=copy]
🔗 [Visit the Website](https://edu-groq.vercel.app) 

✅ Tasks & Bonus Checklist
 All members of the team completed the mandatory task - Followed at least 2 of our social channels and filled the form (Details in Participant Manual)
 All members of the team completed Bonus Task 1 - Sharing of Badges and filled the form (2 points) (Details in Participant Manual)
 All members of the team completed Bonus Task 2 - Signing up for Sprint.dev and filled the form (3 points) (Details in Participant Manual)
(Mark with ✅ if completed)

🧪 How to Run the Project
Requirements:
## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/AANYARAI/MyTUTOR.git
cd MyTUTOR
headers: {
  Authorization: "Bearer YOUR_GROQ_API_KEY",
}
npm install -g live-server
live-server

---
🧬 Future Scope
List improvements, extensions, or follow-up features:

📈 More integrations
🌐 Localization / broader accessibility

📎 Resources / Credits
APIs used
Open source libraries or tools referenced
Acknowledgements

📄 License
This project is licensed under the MIT License.
Feel free to use and modify it for personal, educational, or experimental projects.

---

💬 Final Note
“Education is not the filling of a pail, but the lighting of a fire.” — William Butler Yeats

Thank you for checking out EduGROQ. We hope it makes learning simpler, faster, and more fun for everyone! 🚀
