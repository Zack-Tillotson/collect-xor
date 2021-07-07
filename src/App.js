import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {Provider} from 'react-redux'

import Home from 'components/Home';
import AppHome from 'components/AppHome';
import AppAddItem from 'components/AppAddItem';
import AppEditItem from 'components/AppEditItem';
import AppItemView from 'components/AppItemView';
import FileNotFound from 'components/FileNotFound';

import useAuth from 'data/auth/useAuth'

function Hack(props) {
  if(props && props.history) window.hackHistory = props.history;
  return null
}

function App({store}) {
  const auth = useAuth()

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={Hack} />{/*A hack way to access the Browser Route in Saga files*/}
        {auth.isInitialized && auth.isLoggedIn && <Redirect from='/' to="/app/" />}
        <Switch>
          <Route path="/app/add/" exact component={AppAddItem} />
          <Route path="/app/:itemId/edit/" exact component={AppEditItem} />
          <Route path="/app/:itemId/" exact component={AppItemView} />
          <Route path="/app/" exact component={AppHome} />
          <Route path="/" exact component={Home} />
          <Route component={FileNotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

