import React from "react";
import SplashScreen from './splash/splash_screen';
import LoginScreen from "./login/login";

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
        this.state.redirect ? <LoginScreen /> : <SplashScreen />
    );
  }
}

export default Main;