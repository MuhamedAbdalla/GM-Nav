import DataModel from "./DataModel";

class UserVote extends DataModel {
  constructor(id, firstID, rate, secondID) {
    super(id);
    this.firstID = firstID;
    this.secondID = secondID;
    this.rate = rate;
  }
}

export default UserVote;
