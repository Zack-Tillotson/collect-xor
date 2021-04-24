import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import store from './store';
import App from './App';
import sw from './swController'
import firebase from './firebase'

ReactDOM.render(<App store={store} />, document.getElementById('root'));
sw.register();