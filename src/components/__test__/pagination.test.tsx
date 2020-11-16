import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from 'components/pagination';

const page: Page = {current: 3, next: 4, last: 7, prev: 2};

describe('<Pagination />', () => {
	test('display current page correctly', () => {
		const fn = () => null;
		const { getByText } = render(<Pagination onNext={fn} onPrev={fn} page={page} />);
		expect(getByText(`${page.current}`)).toBeInTheDocument();
	});

	test('disables next when no prev', () => {
		const Fn = jest.fn();
		const { queryByRole } = render(<Pagination onNext={Fn} onPrev={Fn} page={{ ...page, prev: null}} />);
		const prevButton = queryByRole('button', { name: /prev/i });
		expect(prevButton).not.toBeInTheDocument();
	});

	test('can click next page', () => {
		const prevFn = jest.fn();
		const nextFn = jest.fn();
		const { getByRole } = render(<Pagination onNext={nextFn} onPrev={prevFn} page={page} />);
		const nextButton = getByRole('button', { name: /next/i });
		userEvent.click(nextButton);

		expect(nextFn).toBeCalled();
	});

	test('can click prev page', () => {
		const prevFn = jest.fn();
		const nextFn = jest.fn();
		const { getByRole } = render(<Pagination onNext={nextFn} onPrev={prevFn} page={page} />);
		const prevButton =  getByRole('button', { name: /prev/i });
		userEvent.click(prevButton);

		expect(prevFn).toBeCalled();
	});
})