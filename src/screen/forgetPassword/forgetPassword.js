import React from "react";
import "./style.css";
import Background from "../commponents/background.jpg";
import Logo from "../commponents/icon.png";
import SignUpScreen from "../signUp/SignUp";
import LoginScreen from "../login/login";
import GmailServices from '../../services/gmailAuth';
import BackendConstants from '../../constants/Backend-Constants';

class ForgetPassword extends React.Component {
  state = {
    signUpFlag: false,
    loginFlag: false,
    email: "",
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
  loginNavigator = (event) => {
    this.setState({
      loginFlag: true,
    });
  };
  setEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  }
  showSnackBar = (event) => {
    // Get the snackbar DIV
    var bar = document.getElementById("emailSnackbar");

    // Add the "show" class to DIV
    bar.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      bar.className = bar.className.replace("show", "");
    }, 3000);

    this.setState({
      loginFlag: true,
    });
  };
  sendResetEmail = async (email) => {
    await GmailServices.gmailAuthOnly(email, BackendConstants.STATIC_PASSWORD);
  }
  render() {
    if (this.state.signUpFlag) {
      return <SignUpScreen />;
    } else if (this.state.loginFlag) {
      return <LoginScreen />;
    } else {
      return (
        <div className="row">
          <div className="column">
            <div className="card">
              <img alt="Banner" src={Background} className="banner-dev"></img>
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
                  className="form-email animation a2"
                  placeholder="Email Address"
                  value={this.state.email}
                  onChange={this.setEmail}
                />
                <br></br>
                <button className="animation a3" onClick={
                  async () => {
                    var curEmail = this.state.email;
                    if (curEmail !== "" && curEmail.indexOf('@gmail.com') !== -1) {
                      await this.sendResetEmail(curEmail);
                      this.showSnackBar();
                    }
                  }
                }>
                  Send My Password
                </button>
                <button className="animation a4" onClick={this.signUpNavigator}>
                  Sign Up
                </button>
                <button className="animation a5" onClick={this.loginNavigator}>
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ForgetPassword;
