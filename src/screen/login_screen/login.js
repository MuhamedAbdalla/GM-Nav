import React from "react";
import "./style.css";
import Background from "../commponents/background.jpg";
import Logo from "../commponents/icon.png";

class LoginScreen extends React.Component {
  componentDidMount() {
    document.body.style.backgroundColor = "#233c5c";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }
  render() {
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
                type="password"
                className="form-password animation a4"
                placeholder="Password"
              />
              <a href="#" class="fa fa-google animation a2"></a>
              <p className="animation a5">Forgot Password</p>
              <button className="animation a6">LOGIN</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
