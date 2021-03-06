import DataModel from "./DataModel";

class ChatRoom extends DataModel {
  constructor(ID, firstID, messagesID, secondID, lastMessage, messageTime) {
    super(ID);
    this.firstID = firstID;
    this.messagesID = messagesID;
    this.secondID = secondID;
    this.lastMessage = lastMessage;
    this.messageTime = messageTime;
  }
}

export default ChatRoom;
