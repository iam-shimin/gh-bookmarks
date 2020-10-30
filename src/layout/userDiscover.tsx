import React from 'react';
import {Modal} from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';

import RepoCard from 'components/card/repoCard';
import Spinner from 'components/spinner';
import AlertBox from 'components/alert';
import Pagination from 'components/pagination';

import repositoryService from 'services/repos';

export default function UserDiscover() {
	// readonly string
	const {userName}: {userName: Readonly<string>} = useParams();
	const [show, setShow] = React.useState(!!userName);
	const [repositories, setRepositories] = React.useState<IRepository[] | null>(null);
	const [page, setPage] = React.useState<Page>({
		current: 1,
		next: 1,
		last: 1
	});
	const history = useHistory();

	const [isLoading, setIsLoading] = React.useState(repositories === null);
	const [error, setError] = React.useState<Error | null>(null);
	const isEmptyList = !isLoading && repositories?.length === 0;

	const pageToRender = page.current;

	function hanldeHide() {
		setShow(false);
		history.goBack();
	}

	React.useEffect(() => {
		setIsLoading(true);
		setError(null)
		repositoryService
			.getAllReposByUsername(userName, pageToRender)
			.then(data => {
				setRepositories(data.data);
				setPage(p => ({...p, ...data.links}))
			})
			.catch(error => setError(error))
			.finally(() => setIsLoading(false))
	}, [userName, pageToRender]);
	
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
							: (
								<>
									{repositories?.map((repo: IRepository) => <RepoCard key={repo.id} data={repo} />)}
									<Pagination
										page={page}
										onNext={() => setPage(p => ({...p, current: p.current + 1}))}
										onPrev={() => setPage(p => ({...p, current: p.current - 1}))} />
								</>
							)
					}

					{error && <AlertBox variant="danger">{error.message}</AlertBox>}
				</Modal.Body>
			</Modal>
	)
}