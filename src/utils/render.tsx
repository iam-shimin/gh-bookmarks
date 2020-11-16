import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import store from 'store';

// Test render

export default function renderWithStoreAndRouter(element: React.ReactElement) {
	return render(
		<MemoryRouter>
			<Provider store={store}>{element}</Provider>
		</MemoryRouter>
	);
}