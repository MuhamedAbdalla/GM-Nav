import React from "react";
import "./style.css";
import Background from "../commponents/background.jpg";
import Logo from "../commponents/icon.png";
import LoginScreen from "../login/login";

class SignUpScreen extends React.Component {
  state = {
    selectedImage: null,
    loginFlag: false,
  };

  componentDidMount() {
    document.body.style.backgroundColor = "#233c5c";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  selectedImageChanged = (event) => {
    var path = event.target.files[0];
    if (toString(path).includes(".png" | ".jpg")) {
      this.setState({
        selectedImage: path,
      });
    }
  };

  LoginEvent = (event) => {
    this.setState({
      loginFlag: true,
    });
  };

  render() {
    if (this.state.loginFlag) {
      return <LoginScreen />;
    } else {
      return (
        <div className="row">
          <div className="column">
            <div className="card">
              <img alt="Banner" src={Background} className="banner-utl"></img>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="header">
                <h2 className="animation a1">Welcome Back</h2>
              </div>
              <img alt="Logo" src={Logo} className="logo-utl"></img>
              <div className="form">
                <input
                  type="email"
                  className="form-email animation a3"
                  placeholder="Email Address"
                />
                <input
                  type="name"
                  className="form-name animation a4"
                  placeholder="Name"
                />
                <input
                  type="password"
                  className="form-password animation a5"
                  placeholder="Password"
                />
                <input
                  type="file"
                  className="image animation a6"
                  placeholder="file"
                  onChange={this.selectedImageChanged}
                />
                <button className="animation a7">Register</button>
                <button className="animation a7" onClick={this.LoginEvent}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SignUpScreen;
