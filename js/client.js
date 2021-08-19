const socket = io("http://localhost:8000");
const form = document.getElementById("send-container");
const messageInput = document.getElementById("message_input");
const messageContainer = document.querySelector(".container");
var audio = new Audio('../ting.mp3');

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") {
    audio.play();
  }
};

const names = prompt("enter your name to join");
socket.emit("new-user-joined", names);

socket.on("user-joined", (names) => {
  append(`${names} joined the chat`, "left-s");
});
form.addEventListener("submit", (e) => {
  e.preventDefault(); //it will stop reloding of page again and again
  const message = messageInput.value; //messageInput.value gives the message that we have written in inbox
  append(`You :${message}`, "right-s");
  socket.emit("send", message);
  messageInput.value = "";
});
socket.on("receive", (data) => {
  append(`${data.names}:${data.message}`, "left-s");
});
socket.on("left", (names) => {
  append(`${names} left the chat`, "left-s");
});
