import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import contactReducer from './reducers/contactReducer';

const reducer = combineReducers({
  contactReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store;
