import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Login from './Login';
import Register from './Register';
import { Switch } from 'react-router';
import { Route, Redirect } from 'react-router';
import Articles from './Articles';
import NewArticlePost from './NewArticlePost';
import Error from './Error';
import '../styles/styles.css';
import SingleArticleInfo from './SingleArticleInfo';
import Tags from './Tags';
import Home from './Home';
import Settings from './Settings';
import { rootURL } from '../utils/constants';
import Loader from './Loader';
import Profile from './Profile';
import EditArticle from './EditArticle';
import '../styles/scss/header.scss';
import '../styles/scss/login.scss';

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      auth: false,
      user: null,
      isVerifying: false,
    };
  }

  componentDidMount() {
    let token = localStorage.token;
    if (token) {
      this.setState({
        isVerifying: true,
      });
      return fetch(rootURL + 'user', {
        method: 'get',
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((err) => Promise.reject(err));
          }
        })
        .then((data) => this.makeAuthToTrue(data.user))
        .catch((err) =>
          this.setState({
            user: null,
            auth: false,
            isVerifying: false,
          })
        );
    } else {
      this.setState({
        auth: false,
        user: null,
        isVerifying: false,
      });
    }
  }

  makeAuthToTrue = (user) => {
    this.setState({
      auth: true,
      user,
      isVerifying: false,
    });
    localStorage.setItem('token', user.token);
    localStorage.setItem('username', user.username);
  };

  makeAuthToFalse = () => {
    this.setState({
      auth: false,
      user: null,
      isVerifying: false,
    });
  };

  render() {
    if (this.state.isVerifying) {
      return <Loader />;
    }
    return (
      <>
        {this.state.auth ? (
          <AunthenticatedApp
            user={this.state.user}
            makeAuthToFalse={this.makeAuthToFalse}
            makeAuthToTrue={this.makeAuthToTrue}
            auth={this.state.auth}
          />
        ) : (
          <NonAuthenticatedApp
            auth={this.state.auth}
            user={this.state.user}
            makeAuthToTrue={this.makeAuthToTrue}
          />
        )}
      </>
    );
  }
}

function NonAuthenticatedApp(props) {
  return (
    <>
      <Header auth={props.auth} user={props.user} />
      <Switch>
        <Route path="/" exact>
          <Hero auth={props.auth} />
          <Home auth={props.auth} />
        </Route>
        <Route path="/articles/:slug">
          <SingleArticleInfo user={props.user} />
        </Route>
        <Route path="/login">
          <Login makeAuthToTrue={props.makeAuthToTrue} />
        </Route>
        <Route path="/register">
          <Register makeAuthToTrue={props.makeAuthToTrue} />
        </Route>

        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </>
  );
}

function AunthenticatedApp(props) {
  return (
    <>
      <Header auth={props.auth} user={props.user} />
      <Switch>
        <Route path="/" exact>
          <Hero auth={props.auth} />
          <Home auth={props.auth} />
        </Route>
        <Route path="/profile/:username">
          <Profile user={props.user} />
        </Route>
        <Route path="/edit/:slug">
          <EditArticle />
        </Route>
        <Route path="/articles/:slug">
          <SingleArticleInfo user={props.user} />
        </Route>
        <Route path="/new_post">
          <NewArticlePost />
        </Route>
        <Route path="/settings">
          <Settings
            user={props.user}
            makeAuthToTrue={props.makeAuthToTrue}
            makeAuthToFalse={props.makeAuthToFalse}
          />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </>
  );
}
