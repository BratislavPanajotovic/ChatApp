class ChatUI {
  constructor(ul, chatroom) {
    this.ulChat = ul;
    this.chatroom = chatroom;
  }
  set ulChat(ul) {
    this._ulChat = ul;
  }
  get ulChat() {
    return this._ulChat;
  }

  formatDate = (timestamp) => {
    const { seconds, nanoseconds } = timestamp;
    const messageDate = new Date(seconds * 1000 + nanoseconds / 1e6);

    const today = new Date();
    const isToday =
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear();

    if (isToday) {
      return messageDate.toLocaleTimeString();
    } else {
      return messageDate.toLocaleString();
    }
  };

  templateLI = (data) => {
    let li = document.createElement("li");
    const isOwnMessage = data.username === this.chatroom.username;

    if (isOwnMessage) {
      li.classList.add("own-message");
    } else {
      li.classList.add("other-message");
    }

    li.innerHTML = `${data.username}: ${data.message} <br> ${this.formatDate(
      data.created_at
    )}`;

    if (isOwnMessage) {
      li.style.textAlign = "right";
    }

    this.ulChat.appendChild(li);
    li.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  };

  clearChat = () => {
    this.ulChat.innerHTML = "";
  };
}

export { ChatUI };
