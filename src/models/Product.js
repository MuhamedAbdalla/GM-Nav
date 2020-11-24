import DataModel from "./DataModel";

class Product extends DataModel {
  constructor(ID, description) {
    super(ID);
    this.description = description;
  }
}

export default Product;
