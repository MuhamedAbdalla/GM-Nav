import React from "react";
import "./home.css";

class Home extends React.Component {
  componentDidMount() {
    document.body.style.backgroundColor = "#233c5c";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  render() {
    return (
      <body>
        <div className="Bar">
          <h2>Game Exchange</h2>
          <button className="Add"></button>
          <button className="Chat"></button>
          <button className="Profile"></button>
          <button className="Setting"></button>
          <button className="LogOut"></button>
        </div>
      </body>
    );
  }
}

export default Home;
