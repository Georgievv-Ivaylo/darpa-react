import * as actionTypes from './actionTypes';

export default function user(user = {}, action) {
	switch (action.type) {
		case actionTypes.SET:
			return action.data;
		case actionTypes.UNSET:
			return {};
		default: return user;
	}
}
