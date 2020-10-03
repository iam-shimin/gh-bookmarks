const bookmarks = 'B';

function load(key: string, defaultValue: string = '[]') {
	return JSON.parse(localStorage.getItem(key) || defaultValue);
}

function dump(key: string, obj: any) {
	localStorage.setItem(key, JSON.stringify(obj));
}

export function addBookmark(id: string, details?: BookmarkDetails) {
	const bmks: string[] = load(bookmarks);
	bmks.push(id);
	dump(bookmarks, bmks);

	if (details) {
		dump(id, details);
	}
}

export function removeBookmark(id: string) {
	const bmks: string[] = load(bookmarks);
	const i = bmks.indexOf(id);
	if (i === -1)
		return;
	bmks.splice(i, 1);
	dump(bookmarks, bmks)
	localStorage.removeItem(id);
}

export function bookmarkExist(id: string) {
	return load(bookmarks).includes(id);
}

export function getBookmarks(): string[] {
	return load(bookmarks);
}

export function getBookmarkDetails(id: string) {
	return load(id);
}