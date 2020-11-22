import React from "react";
import "./style.css";
import Background from "../commponents/background.jpg";
import Logo from "../commponents/icon.png";
import SignUpScreen from "../signUp/SignUp";
import ForgetPassword from "../forgetPassword/forgetPassword";
import BackendConstants from "../../constants/Backend-Constants";
import GmailAuthentication from '../../services/gmailAuth';

class LoginScreen extends React.Component {
  state = {
    signUpFlag: false,
    forgetPasswordFlag: false,
  };

  componentDidMount() {
    document.body.style.backgroundColor = "#233c5c";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }
  signUpNavigator = (event) => {
    this.setState({
      signUpFlag: true,
    });
  };
  forgetPasswordNavigator = (event) => {
    this.setState({
      forgetPasswordFlag: true,
    })
  }
  async gmailAuthentication() {
    var user = await GmailAuthentication.gmailAuth();
    /*
    TODO: MEDO
    fetch(BackendConstants.Host + '/getWithConditions',{
      method: 'get',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
          email: this.user.email,
          password: this.user.password
      })
    });
    */
  }
  render() {
    if (this.state.signUpFlag) {
      return <SignUpScreen />;
    } else if (this.state.forgetPasswordFlag) {
      return <ForgetPassword />;
    } else {
      return (
        <div className="row">
          <div className="column">
            <div className="card">
              <img alt="Banner" src={Background} className="bann-utl"></img>
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
                <br></br>
                <button className="animation a6">LOGIN</button>
                <button className="animation a6" onClick={this.signUpNavigator}>
                  Sign Up
                </button>
                <a href="#" class="fa fa-google animation a2" onClick={this.gmailAuthentication}></a>
                <p className="animation a5" onClick={this.forgetPasswordNavigator}>Forgot Password</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default LoginScreen;
