import React from 'react';
// import { Card as BCard, CardProps } from 'react-bootstrap';

function BCard({children}: {children: React.ReactNode}) {
	return <div>{children}</div>;
}

export default function Card({
	children,
	...props
}: {children: any, props?: any}) {
	return (
		<BCard {...props}>
			{children}
		</BCard>
	);
}