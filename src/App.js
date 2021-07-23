import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import {Provider} from 'react-redux'

import Home from 'components/Home';
import AppHome from 'views/Home';
import AppEditItem from 'views/EditItem';
import AppAddItemBarcode from 'views/AddItemBarcode';
import AppAddItemAttributes from 'views/AddItemAttributes';
import AppAddItemReview from 'views/AddItemReview';
import AppItemView from 'views/ItemView';
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
        <Switch>
          <Route path="/app/add/barcode/" exact component={AppAddItemBarcode} />
          <Route path="/app/add/attributes/" exact component={AppAddItemAttributes} />
          <Route path="/app/add/review/" exact component={AppAddItemReview} />
          <Route path="/app/add/" component={FileNotFound} />
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
