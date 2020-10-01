import React from 'react';

import 'style/container.css';

export default function Container({children}: {children: any}) {
	return (
		<section className="container-wrapper">
			{children}
		</section>
	)
}