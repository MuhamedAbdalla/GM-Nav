import React from "react";
import "./home.css";
import Card from '../shared_items/cards/card';
import Post from '../../models/Post';

class Home extends React.Component {
  componentDidMount() {
    document.body.style.backgroundColor = "#233c5c";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  render() {
    var posts = [];
    
    for (let i = 0; i < 9; i++) {
      posts.push(<Card post={new Post("", "", "", "War", "https://www.photopea.com/promo/thumb256.png", "20")}></Card>);
    }

    return (
      <body>
        <div className="Bar">
          <div className="Logo"></div>
          <h2>Game Exchange</h2>
          <div className="Add"></div>
          <div className="image-filter"></div>
          <div className="Chat"></div>
          <div className="Profile"></div>
          <div className="Setting"></div>
          <div className="LogOut"></div>
        </div>
        <div className="Posts">
          {posts}
        </div>
      </body>
    );
  }
}

export default Home;
