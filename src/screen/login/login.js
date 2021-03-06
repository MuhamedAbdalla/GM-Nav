import React from "react";
import "./style.css";
import Background from "../commponents/background.jpg";
import Logo from "../commponents/icon.png";
import SignUpScreen from "../signUp/SignUp";
import ForgetPassword from "../forgetPassword/forgetPassword";
import BackendConstants from "../../constants/Backend-Constants";
import GmailAuthentication from '../../services/gmailAuth';
import Conditions from '../../../src/models/Conditions';
import User from '../../../src/models/User';
import IDgenerator from '../../services/randomIdgenerator';
import ReactSnackBar from "react-js-snackbar";
import Home from '../home/home';

class LoginScreen extends React.Component {
  state = {
    signUpFlag: false,
    forgetPasswordFlag: false,
    showBar: false,
    showingBar: false,
    snackbarMSG: 'Check your email for password...',
    currentUser: new User(""),
    loggedUser: new User(""),
    password: "",
    email: "",
  };

  componentDidMount() {
    document.body.style.backgroundColor = "#233c5c";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }
  signUpNavigator = (_) => {
    this.setState({
      signUpFlag: true,
    });
  };
  setUser = (user) => {
    this.setState({
      currentUser: user,
    });
  }
  ShowUp = () => {
    if (this.state.showingBar) return;

    this.setState({ showBar: true, showingBar: true });
    setTimeout(() => {
      this.setState({ showBar: false, showingBar: false });
    }, 5000);
  }
  forgetPasswordNavigator = (_) => {
    this.setState({
      forgetPasswordFlag: true,
    });
  }
  setPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  }
  setEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  }
  setLoggedUser = (user) => {
    this.setState({
      loggedUser: user,
    });
  }
  loginSubmit = async () => {
    if (this.state.email == "" || this.state.password == ""
        || this.state.email.indexOf('@gmail.com') === -1) return;

    var curEmail = this.state.email;
    var curPassword = this.state.password;
    var curPath = [BackendConstants.USER_COLLECTION_ENTRY];
    var cond = [
      new Conditions(
        null,
        curEmail,
        BackendConstants.USER_MAIL_ENTRY,
        BackendConstants.DatabaseConstants[8],
      ),
      new Conditions(
        null,
        curPassword,
        BackendConstants.USER_PASSWORD_ENTRY,
        BackendConstants.DatabaseConstants[8],
      ),
    ];
    
    await fetch(BackendConstants.Cloud + '/getWithConditions', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        path: curPath,
        conditions: cond,
      }),
    })
    .then((res) => {
      res
      .json()
      .then(async (data) => {
        if (data.response.length > 0) {
          var user = new User(
            data.response[0].ID,
            data.response[0].Name,
            data.response[0].Email,
            data.response[0].Password,
            data.response[0].Rate,
            data.response[0].Vote,
            data.response[0].Image,
          );

          this.setLoggedUser(user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    })
    .catch((error) => {
      console.log('Error Login: ' + error);
    });

    setTimeout(async () => { }, 5000);
  }
  async gmailAuthentication() {
    var user = await GmailAuthentication.gmailAuth();
    var curPath = [BackendConstants.USER_COLLECTION_ENTRY];
    var cond = [];

    cond.push(new Conditions(
      null,
      user.email,
      BackendConstants.USER_MAIL_ENTRY,
      BackendConstants.DatabaseConstants[8],
    ));

    await fetch(BackendConstants.Cloud + '/getWithConditions',{
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
          path: curPath,
          conditions: cond,
      }),
    })
    .then((res) => {
      res.json().then(async (data) => {
        if (data.response.length === 0) {
          var uid = IDgenerator.getID();
          curPath = [BackendConstants.USER_COLLECTION_ENTRY, uid];
          var newUser = new User(
            uid,
            user.displayName,
            user.email,
            BackendConstants.STATIC_PASSWORD,
            0.0,
            0,
            user.photoURL,
          );

          user = new User("");
          await fetch(BackendConstants.Cloud + '/insert',{
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                path: curPath,
                model: newUser,
            }),
          })
          .then((_) => {
            this.setUser(newUser);
          })
          .catch((error) => {
            console.log('error inserting user' + error);
          });
        }
        else {
          this.setUser(user);
        }
      });
    })
    .catch((error) => {
      console.log('error fetching user' + error);
    });
    setTimeout(async () => { }, 5000);
  }
  render() {
    if (this.state.loggedUser.ID != "") {
      return <Home />;
    } else if (this.state.signUpFlag) {
      return <SignUpScreen />;
    } else if (this.state.forgetPasswordFlag) {
      return <ForgetPassword />;
    } else {
      return (
        <div>
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
                    value={this.state.email}
                    onChange={this.setEmail}
                  />
                  <input
                    type="password"
                    className="form-password animation a4"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.setPassword}
                  />
                  <br></br>
                  <button className="animation a6" onClick={this.loginSubmit}>LOGIN</button>
                  <button className="animation a6" onClick={this.signUpNavigator}>
                    Sign Up
                  </button>
                  <a href="#" class="fa fa-google animation a2" onClick={
                      async () => {
                        await this.gmailAuthentication();
                        
                        if (this.state.currentUser.ID !== "") {
                          this.ShowUp();
                        }
                      }
                    }></a>
                  <p className="animation a5" onClick={this.forgetPasswordNavigator}>Forgot Password</p>
                </div>
              </div>
            </div>
          </div>
          <ReactSnackBar Icon={<span>🦄</span>} Show={this.state.showBar}>
            {this.state.snackbarMSG}
          </ReactSnackBar>
        </div>
      );
    }
  }
}

export default LoginScreen;
