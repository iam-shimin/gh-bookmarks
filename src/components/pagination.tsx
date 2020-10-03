import React from 'react';
import BPagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';
import Button from 'react-bootstrap/Button';

export default function Pagination({onNext, onPrev, page}: {onNext: any, onPrev: any, page: any}) {

	const disableNext = page && (page.current === page.last);
	const disablePrev = page && (page.current === 1);
	const shouldPaginate = !disableNext || !disablePrev || null;

	return shouldPaginate && (
		<BPagination className="app-pagination">
			<PageItem as={Button} disabled={disablePrev} variant="secondary" onClick={onPrev}>Prev</PageItem>
			<PageItem active>{page.current}</PageItem>
			<PageItem as={Button} disabled={disableNext} variant="secondary" onClick={onNext}>Next</PageItem>
		</BPagination>
	)
}