import actionTypes from "./actionTypes";

const initialState: BookmarkState = {
	bmkById: [],
	repos: {}
};

export default function rootReducer(state: BookmarkState = initialState, action: BookmarkAction) {
	switch (action.type) {
		case actionTypes.ADD:
			const id = action.payload.id;
			const bmkById = state.bmkById.concat(id);
			const repos = {...state.repos, [id]: action.payload}
			return { bmkById, repos };
		
		case actionTypes.RENAME:
			const { id: bmkId, newName } = action.payload;
			const bookmarksRenamed = {
				...state.repos,
				[bmkId]: {...state.repos[bmkId], displayName: newName}
			};
			return { ...state, repos: bookmarksRenamed }

		case actionTypes.REMOVE:
			const filteredBookmarks = Object
				.entries(state.repos)
				.filter(([key]) => key !== 'bmkById' && key !== action.payload.id.toString());
			const repoBookmarks = Object.fromEntries(filteredBookmarks);

			return {
				bmkById: state.bmkById.filter(id => id !== action.payload.id),
				repos: repoBookmarks
			}
		default:
			return state;
	}
}