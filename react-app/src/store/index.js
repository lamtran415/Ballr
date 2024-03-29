import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import photosReducer from './photoReducer';
import commentsReducer from './commentReducer';
import albumsReducer from './albumsReducer';
import tagsReducer from './tagsReducer';
import searchReducer from './searchReducer';
import favoritesReducer from './favoritesReducer';

const rootReducer = combineReducers({
  session,
  photos: photosReducer,
  comments: commentsReducer,
  albums: albumsReducer,
  tags: tagsReducer,
  search: searchReducer,
  favorites: favoritesReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
