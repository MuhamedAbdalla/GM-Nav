import DataModel from "./DataModel";

class ChatMessages extends DataModel {
  constructor(ID, date, message, senderID, pathID, receiverID, chatID) {
    super(ID);
    this.date = date;
    this.message = message;
    this.senderID = senderID;
    this.pathID = pathID;
    this.receiverID = receiverID;
    this.chatID = chatID;
  }
}

export default ChatMessages;
