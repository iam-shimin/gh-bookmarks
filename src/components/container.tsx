import React from 'react';

import 'style/container.css';

export default function Container({children}: React.HTMLProps<HTMLDivElement>) {
	return (
		<section className="container-wrapper">
			{children}
		</section>
	)
}