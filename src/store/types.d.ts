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
	displayName?: string,
	description: string
}

type BookmarkAction = {
	type: string,
	payload: any
}

type BookmarkState = {
	bmkById: string[],
	repos: {
		[key: string]: IRepository
	}
}


type DispatchType = (args: BookmarkAction) => BookmarkAction