import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Pagination from 'components/pagination';
import usePagination from './usePagination';

describe('pagination hook', () => {
	const nextFn = jest.fn();
	const prevFn = jest.fn();

	function Demo({ page }: any) {
		const pg = usePagination();

		function next() {
			nextFn();
			pg.getNextPage();
		}

		function prev() {
			prevFn();
			pg.getPrevPage();
		}

		return <Pagination page={{...pg.page, ...page}} onNext={next} onPrev={prev} />
	}

	test('can click next page', async () => {
		const { getByRole } = render(<Demo page={{ next: 3 }} />);
		const nextButton = getByRole('button', { name: /next/i });
		userEvent.click(nextButton);

		expect(nextFn).toBeCalled();
	});

	test('can click prev page', () => {
		const { getByRole } = render(<Demo page={{ prev: 2 }} />);
		const prevButton =  getByRole('button', { name: /prev/i });
		userEvent.click(prevButton);

		expect(prevFn).toBeCalled();
	});
})