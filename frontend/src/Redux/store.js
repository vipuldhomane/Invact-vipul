import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import movieReducer from './reducer';


const rootReducer = combineReducers({
    movies:movieReducer
  });

const store = legacy_createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;