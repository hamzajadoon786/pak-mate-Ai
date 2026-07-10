/* ==========================================
   PakMate AI
   script.js
   Part 1 (Verified)
========================================== */

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");
const newChatBtn = document.getElementById("newChat");
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

/* App Info */

const APP_NAME = "PakMate AI";
const APP_VERSION = "2.0.0";

console.log(`${APP_NAME} ${APP_VERSION}`);

/* Current Time */

function getTime() {

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return `${hours}:${minutes}`;

}

/* Scroll Bottom */

function scrollBottom() {

    chatBox.scrollTop = chatBox.scrollHeight;

}

/* Save Chat */

function saveChat() {

    localStorage.setItem("pakmate_chat", chatBox.innerHTML);

}

/* Load Chat */

function loadChat() {

    const saved = localStorage.getItem("pakmate_chat");

    if (saved) {

        chatBox.innerHTML = saved;

        scrollBottom();

    }

}

loadChat();
/* ==========================================
   PakMate AI
   script.js
   Part 2 (Verified)
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

    const oldTyping = document.getElementById("typingBox");

    if (oldTyping) {
        oldTyping.remove();
    }

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

/* AI Message */

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
/* ==========================================
   PakMate AI
   script.js
   Part 3 (Verified)
========================================== */

/* Send Message */

async function sendMessage() {

    const text = userInput.value.trim();

    if (!text) return;

    addUserMessage(text);

    userInput.value = "";

    showTyping();

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: text
            })

        });

        if (!response.ok) {

            throw new Error("Server Error");

        }

        const data = await response.json();

        if (data.reply) {

            addAIMessage(data.reply);

        } else {

            addAIMessage("⚠️ No response received.");

        }

    } catch (error) {

        console.error(error);

        addAIMessage("❌ Unable to connect to PakMate AI. Please try again.");

    }

}

/* Send Button */

sendBtn.addEventListener("click", sendMessage);

/* Enter Key */

userInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        e.preventDefault();

        sendMessage();

    }

});
/* ==========================================
   PakMate AI
   script.js
   Part 4 (Final Verified)
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

        userInput.value = event.results[0][0].transcript;

        sendMessage();

    });

} else {

    console.log("Voice Recognition Not Supported");

}

/* New Chat */

newChatBtn.addEventListener("click", () => {

    if (confirm("Start a new chat?")) {

        localStorage.removeItem("pakmate_chat");

        chatBox.innerHTML = "";

        setTimeout(() => {

            addAIMessage("👋 Welcome to PakMate AI! How can I help you today?");

        }, 300);

    }

});

/* Copy Message */

chatBox.addEventListener("dblclick", (e) => {

    const textBox = e.target.closest(".text");

    if (!textBox) return;

    const p = textBox.querySelector("p");

    if (!p) return;

    navigator.clipboard.writeText(p.innerText);

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

/* Fade Effect */

document.body.style.opacity = "0";

window.addEventListener("load", () => {

    document.body.style.transition = "opacity .4s ease";

    document.body.style.opacity = "1";

});

/* Welcome Message */

if (!localStorage.getItem("pakmate_chat")) {

    setTimeout(() => {

        addAIMessage("👋 Welcome to PakMate AI! Main aap ki madad ke liye tayyar hoon.");

    }, 500);

}

/* Sidebar */

if (menuBtn && sidebar) {

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("active");

    });

}

console.log("PakMate AI Loaded Successfully");
