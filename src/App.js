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
import AppAddItem from 'views/AddItem';
import AppItemScanBarcode from 'views/ItemScanBarcode';
import AppItemLookupBarcode from 'views/ItemLookupBarcode';
import AppItemLookupName from 'views/ItemLookupName';
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
          <Route path="/app/:itemId/edit/scan-barcode/" exact component={AppItemScanBarcode} />
          <Route path="/app/add/scan-barcode/" exact component={AppItemScanBarcode} />
          <Route path="/app/:itemId/edit/lookup-barcode/" exact component={AppItemLookupBarcode} />
          <Route path="/app/add/lookup-barcode/" exact component={AppItemLookupBarcode} />
          <Route path="/app/:itemId/edit/lookup-name/" exact component={AppItemLookupName} />
          <Route path="/app/add/lookup-name/" exact component={AppItemLookupName} />
          <Route path="/app/:itemId/edit/" exact component={AppEditItem} />
          <Route path="/app/add/" exact component={AppAddItem} />
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
