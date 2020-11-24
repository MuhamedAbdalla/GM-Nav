import DataModel from "./DataModel";

class Conversation extends DataModel {
  constructor(ID, messages, time, userID, seen) {
    super(ID);
    this.messages = messages;
    this.time = time;
    this.userID = userID;
    this.seen = seen;
  }
}

export default Conversation;
