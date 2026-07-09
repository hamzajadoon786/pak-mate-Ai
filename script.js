/* =====================================
   PakMate AI
   script.js - Part 1
===================================== */

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");
const newChat = document.getElementById("newChat");

/* Current Time */

function getTime(){

const now = new Date();

let hour = now.getHours();
let minute = now.getMinutes();

minute = minute < 10 ? "0" + minute : minute;

return hour + ":" + minute;

}

/* Save Chat */

function saveChat(){

localStorage.setItem(
"pakmate_chat",
chatBox.innerHTML
);

}

/* Load Chat */

function loadChat(){

const saved = localStorage.getItem("pakmate_chat");

if(saved){

chatBox.innerHTML = saved;

}

}

loadChat();

/* Add User Message */

function addUserMessage(text){

chatBox.innerHTML += `

<div class="message user">

<div class="icon">

<i class="fa-solid fa-user"></i>

</div>

<div class="text">

<h3>You</h3>

<p>${text}</p>

<span>${getTime()}</span>

</div>

</div>

`;

chatBox.scrollTop = chatBox.scrollHeight;

saveChat();

}

/* Typing Animation */

function showTyping(){

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

chatBox.scrollTop = chatBox.scrollHeight;

}
/* =====================================
   PakMate AI
   script.js - Part 2
===================================== */

/* AI Reply */

function aiReply(userText){

const replies = [

"Assalam-o-Alaikum! Main PakMate AI hoon.",

"Main aap ki madad ke liye hamesha tayyar hoon.",

"Yeh feature abhi development mein hai.",

"Shukriya! Aap ka message receive ho gaya.",

"Is sawal ka behtar jawab agli update mein dunga."

];

const randomReply =
replies[Math.floor(Math.random()*replies.length)];

setTimeout(()=>{

const typing =
document.getElementById("typingBox");

if(typing){

typing.remove();

}

chatBox.innerHTML += `

<div class="message ai">

<div class="icon">

<i class="fa-solid fa-robot"></i>

</div>

<div class="text">

<h3>PakMate AI</h3>

<p>${randomReply}</p>

<span>${getTime()}</span
/* =====================================
   PakMate AI
   script.js - Part 3
===================================== */

/* =========================
   Voice Recognition
========================= */

if ('webkitSpeechRecognition' in window) {

const recognition = new webkitSpeechRecognition();

recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = false;

voiceBtn.addEventListener("click", () => {

recognition.start();

voiceBtn.innerHTML =
'<i class="fa-solid fa-microphone-lines"></i>';

});

recognition.onresult = (event) => {

const text = event.results[0][0].transcript;

userInput.value = text;

voiceBtn.innerHTML =
'<i class="fa-solid fa-microphone"></i>';

};

recognition.onend = () => {

voiceBtn.innerHTML =
'<i class="fa-solid fa-microphone"></i>';

};

}

/* =========================
   New Chat
========================= */
newChat.addEventListener("click", () => {

    if (confirm("Start a new chat?")) {

        localStorage.removeItem("pakmate_chat");

        chatBox.innerHTML = `

<div class="message ai">

<div class="icon">
<i class="fa-solid fa-robot"></i>
</div>

<div class="text">

<h3>PakMate AI</h3>

<p>
👋 Assalam-o-Alaikum!

Main PakMate AI hoon.

Aaj main aap ki kis tarah madad kar sakta hoon?
</p>

<span>${getTime()}</span>

</div>

</div>

`;

        saveChat();

    }

});
/* =====================================
   PakMate AI
   script.js - Part 4 (Final)
===================================== */

/* Copy Message */

chatBox.addEventListener("dblclick", function(e){

const msg = e.target.closest(".text");

if(!msg) return;

const text = msg.querySelector("p").innerText;

navigator.clipboard.writeText(text);

alert("Message copied!");

});

/* Auto Scroll */

function scrollBottom(){

chatBox.scrollTop = chatBox.scrollHeight;

}

const observer = new MutationObserver(scrollBottom);

observer.observe(chatBox,{
childList:true
});

/* Welcome */

console.log("PakMate AI Started Successfully");

/* Prevent Empty Spaces */

userInput.addEventListener("input",()=>{

userInput.value=userInput.value.replace(/^\s+/,"");

});

/* Small Fade Effect */

document.body.style.opacity="0";

window.addEventListener("load",()=>{

document.body.style.transition="0.4s";

document.body.style.opacity="1";

});

/* Version */

const APP_NAME="PakMate AI";
const VERSION="1.0.0";

console.log(APP_NAME+" "+VERSION);

/* End */
