type SearchCallback = (name: string, value: FormEntryValue) => void;

type Searchable = {
	onSearch: SearchCallback
}