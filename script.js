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

    
