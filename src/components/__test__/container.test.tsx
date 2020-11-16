import React from 'react';
import { render } from '@testing-library/react';
import Container from 'components/container';

test('Renders container', () => {
	const text = 'Test';
	const { getByText } = render(<Container>{text}</Container>);
	expect(getByText(text)).toBeInTheDocument();
})