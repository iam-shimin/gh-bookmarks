import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';


const store = createStore(rootReducer, composeWithDevTools());

store.subscribe(() => {
	// presist all bookmarks
})

export default store;