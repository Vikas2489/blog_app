import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Login from './Login';
import Register from './Register';
import { Switch } from 'react-router';
import { Route } from 'react-router';
import Articles from './Articles';
import '../styles/styles.css';
import SingleArticleInfo from './SingleArticleInfo';
import Tags from './Tags';

export default class App extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Hero />
            <Articles />
          </Route>
          <Route path="/articles/:slug" component={SingleArticleInfo} />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </>
    );
  }
}
