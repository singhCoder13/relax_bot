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

function sendMessage(inputId, boxId, typingId) {
  const input = document.getElementById(inputId);
  const chatBox = document.getElementById(boxId);
  const typing = document.getElementById(typingId);

  const userText = input.value.trim();
  if (!userText) return;

  chatBox.innerHTML += `<div><strong>You:</strong> ${userText}</div>`;
  input.value = "";

  typing.style.display = "block";

  setTimeout(() => {
    typing.style.display = "none";
    chatBox.innerHTML += `<div><strong>Bot:</strong> I'm here for you 💖</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1000);
}
