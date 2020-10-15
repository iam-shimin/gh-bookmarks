import bookmarkTypes from './actionTypes';

export function addBookmark(details: IRepository) {
	return {
		type: bookmarkTypes.ADD,
		payload: details
	}
}

export function removeBookmark(id: string) {
	return {
		type: bookmarkTypes.REMOVE,
		payload: {id}
	}
}