class Chatroom {
  constructor(r, un) {
    this.room = r;
    this.username = un;
    this.chats = db.collection("chats");
    this.currentRoom = this.takeCurrentRoom() || "general";
    this.otherRoom = false;
  }
  set room(r) {
    this._room = r;
    if (this.otherRoom) {
      this.otherRoom();
    }
  }
  set username(un) {
    if (this.checkUsername(un)) {
      this._username = un;
    } else {
      alert(
        "Invalid username. Your username must be between 3 and 10 characters and to not be having any spaces or tabs."
      );
    }
  }
  get room() {
    return this._room;
  }
  get username() {
    return this._username;
  }

  checkUsername(username) {
    return (
      username.trim().length >= 3 &&
      username.trim().length <= 10 &&
      !/^\s+$/.test(username)
    );
  }

  async addMessage(mess) {
    try {
      let docChat = {
        message: mess,
        username: this.username,
        room: this.room,
        created_at: new Date(),
      };
      let response = await this.chats.add(docChat);
      return response;
    } catch {
      console.error();
      "Doslo je do greske!", error;
    }
  }
  // Objasniti ovo
  getChats(callback) {
    this.otherRoom = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type == "added") {
            callback(change.doc.data());
          }
        });
      });
  }
  // Iznad

  updateUsername(newUsername) {
    if (!newUsername) {
      newUsername = "Anonymous";
    }
    this.username = newUsername;
    this.saveUsername();
  }

  updateRoom(newRoomId) {
    if (this.currentRoom !== newRoomId) {
      this.chats
        .where("room", "==", this.currentRoom)
        .get()
        .then(
          (this.room = newRoomId),
          (this.currentRoom = newRoomId),
          this.saveCurrentRoom()
        )
        .catch((error) =>
          console.log(`Error in getting room id to be updated ${error}`)
        );
    }
  }

  saveUsername() {
    localStorage.setItem("username", this.username);
  }

  takeUsername() {
    return localStorage.getItem("username");
  }

  clearChat() {
    list.innerHtml = "";
  }

  saveCurrentRoom() {
    localStorage.setItem("currentRoom", this.currentRoom);
  }

  takeCurrentRoom() {
    return localStorage.getItem("currentRoom");
  }
}

export { Chatroom };
