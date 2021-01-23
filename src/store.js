import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = window.__REDUX_DEVTOOLS_EXTENSION__ ?
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()) :
    applyMiddleware(thunk);

// Note: this API requires redux@>=3.1.0
const store = createStore(rootReducer, middleware);

export default store;
