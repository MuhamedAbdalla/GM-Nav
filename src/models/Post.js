import DataModel from "./DataModel";

class Post extends DataModel {
  constructor(
    ID,
    date,
    userID,
    name,
    image,
    price,
    productID,
    isSold,
    catergory
  ) {
    super(ID);
    this.date = date;
    this.userID = userID;
    this.name = name;
    this.image = image;
    this.price = price;
    this.productID = productID;
    this.isSold = isSold;
    this.catergory = catergory;
  }
}

export default Post;
