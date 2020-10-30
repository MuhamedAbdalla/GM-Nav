import DataModel from "./DataModel";

class User extends DataModel {
  constructor(id, name, email, password, userRateSum, nOfVotes, imageUrl) {
    super(id);
    this.name = name;
    this.email = email;
    this.password = password;
    this.userRateSum = userRateSum;
    this.nOfVotes = nOfVotes;
    this.imageUrl = imageUrl;
  }
}

export default User;
