import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import {Provider} from 'react-redux'

import Home from 'components/Home';
import AppHome from 'components/AppHome';
import AppAddItem from 'components/AppAddItem';
import AppScanItem from 'components/AppScanItem';
import FileNotFound from 'components/FileNotFound';

function App({store}) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/app/add/" exact component={AppAddItem} />
          <Route path="/app/scan/" exact component={AppScanItem} />
          <Route path="/app/" exact component={AppHome} />
          <Route path="/" exact component={Home} />
          <Route component={FileNotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

