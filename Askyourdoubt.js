async function processImage() {
  const fileInput = document.getElementById("imageUpload");
  const responseDiv = document.getElementById("imageResponse");

  if (!fileInput.files.length) {
    responseDiv.innerText = "⚠️ Please upload an image first.";
    return;
  }

  const image = fileInput.files[0];
  responseDiv.innerText = "🧠 Reading the image...";

  const reader = new FileReader();
  reader.onload = async function () {
    const imageData = reader.result;

    // OCR using Tesseract.js
    try {
      const result = await Tesseract.recognize(imageData, 'eng');
      const extractedText = result.data.text.trim();
      responseDiv.innerHTML = `<strong>Extracted Question:</strong> ${extractedText}<br>⏳ Asking AI...`;

      if (extractedText) {
        // Send to GROQ
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
          },
          body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: [{ role: "user", content: extractedText }]
          })
        });

        const data = await groqRes.json();
        const aiAnswer = data.choices?.[0]?.message?.content || "❌ Couldn't get an answer from GROQ.";
        responseDiv.innerHTML = `<strong>Extracted Question:</strong> ${extractedText}<br><strong>AI Answer:</strong> ${aiAnswer}`;
      }
    } catch (err) {
      console.error(err);
      responseDiv.innerText = "❌ Failed to process the image.";
    }
  };

  reader.readAsDataURL(image);
}
