import { createStore, combineReducers } from 'redux';
import user from '../users/reducer';
import { saveState, loadState } from '../storage/local';
import throttle from 'lodash/throttle';

const persistedState = loadState();
const store = createStore(combineReducers({
	user
}), {
	user: persistedState.user || {}
});

store.subscribe(throttle(() => {
	saveState({
		user: store.getState().user
	});
}), 1000);

export default store;
