import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import WebFont from 'webfontloader';

import App from './App';
import store from './redux/store';

WebFont.load({
  google: {
    families: ['Roboto:300,400,500', 'sans-serif']
  }
});

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
