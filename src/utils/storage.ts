const bookmarks = 'B';

function load(key: string) {
	const valueAsString = localStorage.getItem(key);
	if (valueAsString) {
		return JSON.parse(valueAsString);
	}
}

function dump(key: string, obj: any) {
	localStorage.setItem(key, JSON.stringify(obj));
}

export default {
	persist(state: BookmarkState) {
		dump(bookmarks, state)
	},

	load() {
		return load(bookmarks);
	}
}