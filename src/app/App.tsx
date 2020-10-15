import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import { Provider } from 'react-redux';

import 'style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from 'store';
import BookmarksPage from 'layout/bookmarksPage';
import DiscoverPage from 'layout/discoverPage';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path="/" exact component={BookmarksPage} />
          <Route path="/discover" component={DiscoverPage} />
          <Redirect to="/" />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
