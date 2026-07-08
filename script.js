function sendMessage() {
    let input = document.getElementById("userInput");
    let chatBox = document.getElementById("chatBox");

    if (input.value.trim() === "") return;

    let msg = document.createElement("div");
    msg.className = "message";
    msg.innerText = "👤 " + input.value;

    chatBox.appendChild(msg);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}
