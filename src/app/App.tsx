import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import 'style/App.css';

import BookmarksPage from 'layout/bookmarksPage';
import DiscoverPage from 'layout/discoverPage';
import { Alert } from 'react-bootstrap';

class App extends React.Component {
  state = {
    error: null
  }

  static getDerivedStateFromError(error: Error) {
    return {error}
  }

  render() {
    if (this.state.error) {
      <Alert>Something went wrong. <a href="/">reload?</a></Alert>
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={BookmarksPage} />
          <Route path="/discover" component={DiscoverPage} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
