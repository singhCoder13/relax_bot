function showSection(id) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

// Simulated message sending logic (can be replaced with backend connection)
function sendMood() {
  sendMessage("moodInput", "chatBox", "typingIndicator");
}
function sendRelaxation() {
  sendMessage("relaxationInput", "chatBox-relaxation", "typingIndicator-relaxation");
}
function sendSpiritual() {
  sendMessage("spiritualInput", "chatBox-spiritual", "typingIndicator-spiritual");
}
function sendMotivation() {
  sendMessage("motivationInput", "chatBox-motivation", "typingIndicator-motivation");
}

async function sendMessage(inputId, boxId, typingId) {
  const input = document.getElementById(inputId);
  const chatBox = document.getElementById(boxId);
  const typing = document.getElementById(typingId);

  const userText = input.value.trim();
  if (!userText) return;

  // Display user's message
  chatBox.innerHTML += `<div class="user-message"><strong>You:</strong> ${userText}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = "";

  // Show typing indicator
  typing.style.display = "block";

  try {
    // Get Gemini AI reply
    const replyFromGemini = await getGeminiReply(userText);

    // Hide typing and show bot reply
    typing.style.display = "none";
    chatBox.innerHTML += `<div class="bot-message"><strong>Bot:</strong> ${replyFromGemini}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    typing.style.display = "none";
    console.log(err);
    chatBox.innerHTML += `<div class="bot-message error"><strong>Bot:</strong> Sorry, something went wrong 😓 ${err}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}


async function getGeminiReply(userText) {
  try {
      const response = await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ message: userText })
      });

      const data = await response.json();
      return data.reply;
  } catch (error) {
      console.error("Error getting reply:", error);
      return "Something went wrong. Please try again.";
  }
}

