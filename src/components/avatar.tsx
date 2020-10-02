import React from 'react';

import defaultUserIcon from 'assets/images/user-icon.png';

export default function Avatar({src}: any) {

	const [isLoaded, setIsLoaded] = React.useState(false);

	const hidden = {display: 'none'};

	return (
		<>
			<img alt="Avatar" style={!isLoaded? hidden: {}} src={src} onLoad={() => setIsLoaded(true)} />
			<img alt="fallback avatar" style={isLoaded? hidden: {}} src={defaultUserIcon} />
		</>
	)
}