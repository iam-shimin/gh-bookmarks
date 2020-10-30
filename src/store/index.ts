import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';
import storage from 'utils/storage';

const persistedState = storage.load();

const store = createStore(
	rootReducer,
	persistedState,
	composeWithDevTools()
);

store.subscribe(() => {
	storage.persist(store.getState())
})

export default store;