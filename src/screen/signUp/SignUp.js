import React from "react";
import "./style.css";
import Background from "../commponents/background.jpg";
import Logo from "../commponents/icon.png";
import LoginScreen from "../login/login";
import User from '../../../src/models/User';
import IDgenerator from '../../services/randomIdgenerator';
import Uploader from '../../services/storage';
import Conditions from '../../../src/models/Conditions';
import BackendConstants from '../../constants/Backend-Constants';
import GmailAuthentication from '../../services/gmailAuth';

class SignUpScreen extends React.Component {
  state = {
    selectedImage: null,
    loginFlag: false,
    name: "",
    password: "",
    email: "",
  };

  componentDidMount() {
    document.body.style.backgroundColor = "#233c5c";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  emailMount = async (e) => {
    this.setState({
      email: e.target.value,
    });
  }

  nameMount = async (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  passwordMount = async (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  selectedImageChanged = (event) => {
    var path = event.target.files[0];

    if (path.name.indexOf(".png") !== -1 || path.name.indexOf(".jpg") !== -1) {
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

  registerSubmit = async () => {
    if (this.state.name === "" || this.state.email === "" ||
          this.state.password === "" || this.state.selectedImage === null ||
          this.state.email.indexOf('@gmail.com') === -1) return;

    var newImage = await Uploader.storage(this.state.selectedImage);
    var curPath = [BackendConstants.USER_COLLECTION_ENTRY];
    var cond = [
      new Conditions(
        null,
        this.state.email,
        BackendConstants.USER_MAIL_ENTRY,
        BackendConstants.DatabaseConstants[8],
      ),
    ]

    var user = new User(
      IDgenerator.getID(),
      this.state.name,
      this.state.email,
      this.state.password,
      0.0,
      0,
      newImage,
    );
    
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
          curPath = [BackendConstants.USER_COLLECTION_ENTRY, user.ID];

          await fetch(BackendConstants.Cloud + '/insert',{
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                path: curPath,
                model: user,
            }),
          })
          .then((_) => {
            GmailAuthentication.gmailAuthOnly(user.Email, user.Password);
            this.state.email = "";
            this.state.name = "";
            this.state.password = "";
            this.state.selectedImage = null;
            this.LoginEvent();
          })
          .catch((error) => {
            console.log('error inserting user' + error);
          });
        }
      });
    })
    .catch((error) => {
      console.log('error fetching user' + error);
    });

    setTimeout(async () => { }, 5000);
  }

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
                  value={this.state.email}
                  onChange={this.emailMount}
                />
                <input
                  type="name"
                  className="form-name animation a4"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.nameMount}
                />
                <input
                  type="password"
                  className="form-password animation a5"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.passwordMount}
                />
                <input
                  type="file"
                  className="image animation a6"
                  placeholder="file"
                  onChange={this.selectedImageChanged}
                />
                <button className="animation a7" onClick={this.registerSubmit}>Register</button>
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
