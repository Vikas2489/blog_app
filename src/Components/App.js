import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Login from './Login';
import Register from './Register';
import { Switch } from 'react-router';
import { Route, Redirect } from 'react-router';
import Articles from './Articles';
import Error from './Error';
import '../styles/styles.css';
import SingleArticleInfo from './SingleArticleInfo';
import Tags from './Tags';
import Home from './Home';

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      auth: false,
    };
  }

  componentDidMount() {
    if (localStorage.user) {
      this.setState({
        auth: true,
      });
    }
  }

  makeAuthToTrue = () => {
    this.setState({
      auth: true,
    });
  };

  render() {
    return (
      <>
        <Header auth={this.state.auth} />
        <Switch>
          <Route path="/" exact>
            <Hero auth={this.state.auth} />
            <Home auth={this.state.auth} />
          </Route>
          <Route path="/articles/:slug" component={SingleArticleInfo} />
          <Route path="/login">
            <Login makeAuthToTrue={this.makeAuthToTrue} />
          </Route>
          <Route path="/register">
            <Register makeAuthToTrue={this.makeAuthToTrue} />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </>
    );
  }
}
