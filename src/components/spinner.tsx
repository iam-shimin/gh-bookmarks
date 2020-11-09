import React from 'react';
import BSpinner from 'react-bootstrap/Spinner';

export default function Spinner() {

	const wrapperStyle: React.CSSProperties = {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	};

	return (
		<div style={wrapperStyle}>
			<BSpinner animation="border" className="spinner-big" />
		</div>
	);
}