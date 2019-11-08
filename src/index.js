import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './components/Login';
import { BrowserRouter, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './redux/store/store.js'

ReactDOM.render(<Provider store={store}><div><BrowserRouter><Route exact path='/' component={Login}/>
  <Route exact path='/data' component={App}/></BrowserRouter></div></Provider>, document.getElementById('root'));
    
    serviceWorker.unregister();
    