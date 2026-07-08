function sendMessage(){

let input=document.getElementById("message");

let text=input.value.trim();

if(text==="") return;

let chat=document.getElementById("chat");

chat.innerHTML+=`
<div class="user">${text}</div>
`;

setTimeout(function(){

chat.innerHTML+=`
<div class="bot">
Abhi AI connect nahi hai.

Jald hi ChatGPT API add hogi 😊
</div>
`;

chat.scrollTop=chat.scrollHeight;

},700);

input.value="";

chat.scrollTop=chat.scrollHeight;



function startVoice(){

if (!('webkitSpeechRecognition' in window)){

alert("Voice input is not supported on this browser.");

return;

}

const recognition = new webkitSpeechRecognition();

recognition.lang = "ur-PK";

recognition.start();

recognition.onresult = function(event){

document.getElementById("message").value =
event.results[0][0].transcript;

};

    }
