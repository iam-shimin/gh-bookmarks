import { render } from '@testing-library/react';
import React from 'react';
import Alert from '../alert';

test('Alert displays alert-text', () => {
	const testString = 'Test';
	const { getByText } = render(<Alert>{testString}</Alert>);
	expect(getByText(testString)).toBeInTheDocument();
})