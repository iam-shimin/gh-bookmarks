import React from 'react';

import {Alert} from 'react-bootstrap';

export default function AlertBox({children}: any) {
	return (
		<Alert variant="primary">{children}</Alert>
	)
}