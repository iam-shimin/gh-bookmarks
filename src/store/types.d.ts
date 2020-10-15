interface IUser {
	login: string,
	id: string,
	avatar_url: string,
	html_url: string
}

interface IRepository {
	id: string,
	name: string,
	html_url: string,
	owner: IUser,
	full_name: string,
	description: string
}

type BookmarkAction = {
	type: string,
	payload: IRepository
}

type BookmarkState = {
	bmkById: string[],
	[key: string?]: IRepository
}


type DispatchType = (args: BookmarkAction) => BookmarkAction