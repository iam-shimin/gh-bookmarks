type SearchCallback = (name: string, value: FormEntryValue) => void;

type Searchable = {
	onSearch: SearchCallback
}

type SearchObj = {
	type: 'repo' | 'user',
	q: string
}