import DataModel from "./DataModel";

class Conversation extends DataModel {
  constructor(id, messages, time, userID, seen) {
    super(id);
    this.messages = messages;
    this.time = time;
    this.userID = userID;
    this.seen = seen;
  }
}

export default Conversation;
