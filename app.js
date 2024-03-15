import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js";

let ul = document.querySelector("ul");
let msgInput = document.querySelector("#messageInput");
let btnSend = document.querySelector("#send");
let navRooms = document.querySelector("nav");
let divAlert = document.querySelector(".alert-success");
let userInput = document.querySelector("#usernameInput");
let btnUpdate = document.querySelector("#update");

let chatroom = new Chatroom("js", "Stefan");
let chatui = new ChatUI(ul, chatroom);

// document.addEventListener("DOMContentLoaded", function () {
//   const storedColor = localStorage.getItem("backgroundColor");
//   if (storedColor) {
//     document.body.style.backgroundColor = storedColor;
//     document.getElementById("backgroundColor").value = storedColor;
//   }

// document.getElementById("updateColor").addEventListener("click", function () {
//   const selectedColor = document.getElementById("backgroundColor").value;

//   document.body.style.backgroundColor = selectedColor;

//   localStorage.setItem("backgroundColor", selectedColor);
// });

document
  .getElementById("messageInput")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
document.getElementById("js").click();

document
  .getElementById("usernameInput")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      updateUsername();
    }
  });

let oldUsername = chatroom.takeUsername();
if (oldUsername) {
  chatroom.updateUsername(oldUsername);
} else {
  chatroom.updateUsername("Anonymous");
}

chatroom.getChats((data) => {
  chatui.templateLI(data);
});

function sendMessage() {
  if (msgInput.value == "") {
    alert("Ne mozete poslati praznu poruku!");
  } else {
    chatroom.addMessage(msgInput.value);
    msgInput.value = "";
  }
}

function updateUsername() {
  if (userInput.value.length < 4) {
    alert("Ne mozete da imate username koji ima manje od 4 karaktera.");
  } else {
    divAlert.innerHTML = `Success! <strong>${userInput.value}</strong>, you have been signed in successfully!`;
    divAlert.classList.add("show");
    divAlert.scrollIntoView({ behavior: "smooth" });
    console.log(`uso`);
    setTimeout(() => {
      divAlert.classList.remove("show");
    }, 3000);

    chatroom.updateUsername(userInput.value);
    chatui.clearChat();
    chatroom.getChats((data) => {
      chatui.templateLI(data);
    });
  }
}

btnSend.addEventListener("click", sendMessage);
btnUpdate.addEventListener("click", updateUsername);

navRooms.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") {
    const buttons = document.querySelectorAll(".rooms");
    buttons.forEach((button) => {
      button.style.border = "none";
    });

    e.target.style.border = "2px solid black";

    let newRoom = e.target.textContent;
    chatroom.updateRoom(newRoom);
    chatui.clearChat();
    chatroom.getChats((data) => {
      chatui.templateLI(data);
    });
  }
});
