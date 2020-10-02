const bookmarks = 'B';

function load(key: string) {
	return JSON.parse(localStorage.getItem(key) || '');
}

function dump(key: string, obj: any) {
	localStorage.setItem(key, JSON.stringify(obj));
}

export function addBookmark(id: string, details?: any) {
	const bmks: string[] = load(bookmarks);
	bmks.push(id);
	dump(bookmarks, bmks);

	if (details) {
		dump(id, details);
	}
}

export function bookmarkExist(id: string) {
	return load(bookmarks).contains(id);
}

export function getBookmarkDetails(id: string) {
	return load(id);
}