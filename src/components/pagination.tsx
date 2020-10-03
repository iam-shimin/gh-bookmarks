import React from 'react';
import Button from 'react-bootstrap/Button';

export default function Pagination({onNext, onPrev, page}: {onNext: any, onPrev: any, page: any}) {

	const disableNext = page && (page.current === page.last);
	const disablePrev = page && (page.current === 1);
	const shouldPaginate = !disableNext || !disablePrev || null;

	return shouldPaginate && (
		<div>
			<Button disabled={disablePrev} variant="secondary" onClick={onPrev}>Prev</Button>
			<span>{page.current}</span>
			<Button disabled={disableNext} variant="secondary" onClick={onNext}>Next</Button>
		</div>
	)
}