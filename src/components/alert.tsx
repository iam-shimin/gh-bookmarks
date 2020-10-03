import React from 'react';

import {Alert, AlertProps} from 'react-bootstrap';

export default function AlertBox({children, variant = 'primary', ...rest}: AlertProps) {
	return (
		<Alert variant={variant} {...rest} >{children}</Alert>
	)
}