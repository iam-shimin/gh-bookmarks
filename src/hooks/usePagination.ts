import React from 'react';

export default function usePagination() {
	const [page, setPage] = React.useState<Page>({
		current: null,
		next: null,
		last: null,
		prev: null
	});

	const getNextPage = React.useCallback(
		() => setPage(p => ({...p, current: p.current + 1})),
		[]
	);

	const getPrevPage = React.useCallback(
		() => setPage(p => ({...p, current: p.current - 1})),
		[]
	);

	return {
		page,
		setPage,
		getNextPage,
		getPrevPage
	};
}