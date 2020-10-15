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
			const filteredBookmarks = Object
				.entries(state)
				.filter(([key]) => key !== 'bmkById' && key !== action.payload.id.toString());
			const newData = Object.fromEntries(filteredBookmarks);

			return {
				...newData,
				bmkById: state.bmkById.filter(id => id !== action.payload.id)
			}
		default:
			return state;
	}
}