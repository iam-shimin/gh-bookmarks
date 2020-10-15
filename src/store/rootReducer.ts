import actionTypes from "./actionTypes";

const initialState: BookmarkState = {
	bmkById: []
};

export default function rootReducer(state: BookmarkState = initialState, action: BookmarkAction) {
	switch (action.type) {
		case actionTypes.ADD:
			const id = action.payload.id;
			const bmkById = state.bmkById.concat(id);
			return {...state, bmkById, [id]: action.payload};

		case actionTypes.REMOVE:
			const newData = Object.fromEntries(Object.entries(state).filter(([key]) => {
				if (key === 'bmkById' && key === action.payload.id) {
					return false;
				}
				return true;
			}));

			return {
				bmkById: state.bmkById.filter(id => id !== action.payload.id),
				...newData
			}
		default:
			return state;
	}
}