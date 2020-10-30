import React from 'react';
// import { Card as BCard, CardProps } from 'react-bootstrap';

function BCard({children, ...rest}: React.HTMLProps<HTMLDivElement>) {
	return <div {...rest}>{children}</div>;
}

export default function Card({
	children,
	className,
	...props
}: React.HTMLProps<HTMLDivElement>) {
	const classNames = `card ${className? className: ''}`;
	return (
		<BCard {...props} className={classNames}>
			{children}
		</BCard>
	);
}