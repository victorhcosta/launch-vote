import React from 'react';
import { ISurveyVotes } from '../../interfaces/vote.interface';

// import { Container } from './styles';

interface IVotesResultProps {
	votes: ISurveyVotes;
}

export const VotesResult: React.FC<IVotesResultProps> = ({ votes }) => {
	const orderedVotes = votes.votesByOption.sort((first, second) => {
		if (first.quantity < second.quantity) return 1;

		if (first.quantity > second.quantity) return -1;

		return 0;
	});

	return (
		<>
			<h2>Amount of votes: {votes.total}</h2>

			<ol>
				{orderedVotes.map((optionWithVote) => {
					return (
						<li key={optionWithVote.option}>
							{`${optionWithVote.option} recived ${optionWithVote.quantity} votes`}
						</li>
					);
				})}
			</ol>
		</>
	);
};
