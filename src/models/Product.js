import DataModel from "./DataModel";

class Product extends DataModel {
  constructor(id, description) {
    super(id);
    this.description = description;
  }
}

export default Product;
