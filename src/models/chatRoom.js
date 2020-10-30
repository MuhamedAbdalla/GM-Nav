import DataModel from "./DataModel";

class ChatRoom extends DataModel {
  constructor(id, firstID, messagesID, secondID, lastMessage, messageTime) {
    super(id);
    this.firstID = firstID;
    this.messagesID = messagesID;
    this.secondID = secondID;
    this.lastMessage = lastMessage;
    this.messageTime = messageTime;
  }
}

export default ChatRoom;
