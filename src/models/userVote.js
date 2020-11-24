import DataModel from "./DataModel";

class UserVote extends DataModel {
  constructor(ID, firstID, rate, secondID) {
    super(ID);
    this.firstID = firstID;
    this.secondID = secondID;
    this.rate = rate;
  }
}

export default UserVote;
