import DataModel from "./DataModel";

class User extends DataModel {
  constructor(ID, Name, Email, Password, Rate, Vote, Image) {
    super(ID);
    this.Name = Name;
    this.Email = Email;
    this.Password = Password;
    this.Rate = Rate;
    this.Vote = Vote;
    this.Image = Image;
  }
}

export default User;
