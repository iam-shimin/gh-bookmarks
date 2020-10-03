import React from 'react';
import {Modal} from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';

import RepoCard from 'components/card/repoCard';
import Spinner from 'components/spinner';
import AlertBox from 'components/alert';

import repositoryService from 'services/repos';

export default function UserDiscover() {
	const {userName} = useParams();
	const [show, setShow] = React.useState(!!userName);
	const [repositories, setRepositories] = React.useState<any[] | null>(null);
	const history = useHistory();

	const isLoading = repositories === null;
	const isEmptyList = !isLoading && repositories?.length === 0;

	function hanldeHide() {
		setShow(false);
		history.goBack();
	}

	React.useEffect(() => {
		repositoryService
			.getAllReposByUsername(userName)
			.then(data => setRepositories(data))
			.catch(error => console.log(error))
	}, [userName]);
	
	return (
		
			<Modal
				size="lg"
				show={show}
				onHide={hanldeHide}
				aria-labelledby="example-modal-sizes-title-lg"
			>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						GitHub Repositories of {userName}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{minHeight: '80vh'}}>
					{isLoading
						? <Spinner />
						: isEmptyList
							? <AlertBox>This user has no public Repositories</AlertBox>
							: repositories?.map(repo => <RepoCard data={repo} />)
					}
				</Modal.Body>
			</Modal>
	)
}