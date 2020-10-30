import DataModel from "./DataModel";

class ChatMessages extends DataModel {
  constructor(id, date, message, senderID, pathID, receiverID, chatID) {
    super(id);
    this.date = date;
    this.message = message;
    this.senderID = senderID;
    this.pathID = pathID;
    this.receiverID = receiverID;
    this.chatID = chatID;
  }
}

export default ChatMessages;
