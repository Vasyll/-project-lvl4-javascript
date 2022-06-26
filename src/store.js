import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import normalize from './normalize';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

export default gon => (
  createStore(
    reducers,
    normalize(gon),
    composeEnhancers(
      applyMiddleware(thunk),
    ),
  )
);
