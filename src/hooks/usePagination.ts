import React from 'react';

export default function usePagination() {
	const [page, setPage] = React.useState<Page>({
		current: 1,
		next: 1,
		last: 1
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