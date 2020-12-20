import React from "react";
import "./card.css";

class Card extends React.Component {
  render() {
    return (
      <div className="card-style">
        <div className="list-image">
          <img
            src={ this.props.post.image }
            alt="Product"
            style={
              ({ innerWidth: "100px" }, { height: "100px" }, { width: "100px" })
            }
          />
        </div>
        <div>
            <h1>{ this.props.post.name }</h1>
        </div>
        <div>
            <p>{ this.props.post.price }$</p>
        </div>
        <div>
          <div className="button db b pv2 ma2 color grow pointer shadow-2">
            See More
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
