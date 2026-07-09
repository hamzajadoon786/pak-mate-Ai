/* ==========================================
   PakMate AI
   script.js
   Part 1
========================================== */

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");
const newChatBtn = document.getElementById("newChat");

/* Current Time */

function getTime() {

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return hours + ":" + minutes;

}

/* Save Chat */

function saveChat() {

    localStorage.setItem(
        "pakmate_chat",
        chatBox.innerHTML
    );

}

/* Load Chat */

function loadChat() {

    const data = localStorage.getItem("pakmate_chat");

    if (data) {

        chatBox.innerHTML = data;

    }

}

loadChat();

/* Scroll Bottom */

function scrollBottom() {

    chatBox.scrollTop = chatBox.scrollHeight;

}
/* ==========================================
   PakMate AI
   script.js
   Part 2
========================================== */

/* User Message */

function addUserMessage(message) {

    chatBox.innerHTML += `

    <div class="message user">

        <div class="icon">
            <i class="fa-solid fa-user"></i>
        </div>

        <div class="text">

            <h3>You</h3>

            <p>${message}</p>

            <span>${getTime()}</span>

        </div>

    </div>

    `;

    scrollBottom();

    saveChat();

}

/* Typing Animation */

function showTyping() {

    chatBox.innerHTML += `

    <div class="message ai" id="typingBox">

        <div class="icon">
            <i class="fa-solid fa-robot"></i>
        </div>

        <div class="text">

            <h3>PakMate AI</h3>

            <div class="typing">

                <span></span>
                <span></span>
                <span></span>

            </div>

        </div>

    </div>

    `;

    scrollBottom();

}
/* ==========================================
   PakMate AI
   script.js
   Part 3
========================================== */

/* AI Reply */

function addAIMessage(message) {

    const typingBox = document.getElementById("typingBox");

    if (typingBox) {
        typingBox.remove();
    }

    chatBox.innerHTML += `

    <div class="message ai">

        <div class="icon">
            <i class="fa-solid fa-robot"></i>
        </div>

        <div class="text">

            <h3>PakMate AI</h3>

            <p>${message}</p>

            <span>${getTime()}</span>

        </div>

    </div>

    `;

    scrollBottom();

    saveChat();

}

/* Send Message */

function sendMessage() {

    const text = userInput.value.trim();

    if (text === "") return;

    addUserMessage(text);

    userInput.value = "";

    showTyping();

    setTimeout(() => {

        addAIMessage("Main PakMate AI hoon. Real AI response agli update mein API connect hone ke baad aayega.");

    }, 1500);

}

/* Button */

sendBtn.addEventListener("click", sendMessage);

/* Enter Key */

userInput.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        sendMessage();

    }

});
/* ==========================================
   PakMate AI
   script.js
   Part 4
========================================== */

/* Voice Recognition */

if ("webkitSpeechRecognition" in window) {

    const recognition = new webkitSpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    voiceBtn.addEventListener("click", () => {

        recognition.start();

    });

    recognition.onresult = (event) => {

        const text = event.results[0][0].transcript;

        userInput.value = text;

    };

}

/* New Chat */

newChatBtn.addEventListener("click", () => {

    if (confirm("Start a new chat?")) {

        localStorage.removeItem("pakmate_chat");

        location.reload();

    }

});
/* ==========================================
   PakMate AI
   script.js
   Part 5
========================================== */

/* Copy Message */

chatBox.addEventListener("dblclick", function (e) {

    const textBox = e.target.closest(".text");

    if (!textBox) return;

    const message = textBox.querySelector("p").innerText;

    navigator.clipboard.writeText(message);

    alert("Message Copied!");

});

/* Auto Scroll */

const observer = new MutationObserver(() => {

    scrollBottom();

});

observer.observe(chatBox, {

    childList: true

});

/* Auto Focus */

window.addEventListener("load", () => {

    userInput.focus();

});

/* Prevent Starting Space */

userInput.addEventListener("input", () => {

    userInput.value = userInput.value.replace(/^\s+/, "");

});
/* ==========================================
   PakMate AI
   script.js
   Part 6 (Final)
========================================== */

/* App Information */

const APP_NAME = "PakMate AI";
const APP_VERSION = "1.0.0";

console.log(APP_NAME + " " + APP_VERSION);

/* Fade Effect */

document.body.style.opacity = "0";

window.addEventListener("load", () => {

    document.body.style.transition = "opacity 0.4s ease";

    document.body.style.opacity = "1";

});

/* Welcome Message */

if (!localStorage.getItem("pakmate_chat")) {

    setTimeout(() => {

        addAIMessage("👋 Welcome to PakMate AI! Main aap ki madad ke liye tayyar hoon.");

    }, 500);

}

/* Console */

console.log("PakMate AI Loaded Successfully");

/* End of Script */
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });
}
