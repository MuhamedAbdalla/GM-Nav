import React from "react";
import SplashScreen from './splash/splash_screen';
import LoginScreen from "./login/login";
import Home from "./home/home";

class Main extends React.Component {
  state = {
    redirect: false,
  };

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    return (
      this.state.redirect ? <Home /> : <SplashScreen />
       // this.state.redirect ? <LoginScreen /> : <SplashScreen />
    );
  }
}

export default Main;