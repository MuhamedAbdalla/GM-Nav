import React from "react";

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
        <h1>Activated Successfully...!</h1>
      </body>
    );
  }
}

export default Home;
