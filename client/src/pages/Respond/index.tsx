import React, { useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';
import { VotesResult } from '../../components/VotesResult';

import { httpClient } from '../../config/http';
import { ISurvey } from '../../interfaces/survey.interface';
import { ISurveyVotes } from '../../interfaces/vote.interface';
import css from './respond.module.css';

export const Respond: React.FC = () => {
	const [survey, setSurvey] = useState<ISurvey>();
	const [votes, setVotes] = useState<ISurveyVotes>();
	const finishedSurveyTitleRef = useRef<HTMLHeadingElement>(null);

	const { surveyCode } = useParams();

	useEffect(() => {
		httpClient
			.get<ISurvey>(`/survey/${surveyCode}`)
			.then((survey) => {
				if(survey.isFinished)
				setTimeout(() => finishedSurveyTitleRef.current?.focus(), 10);

				setSurvey(survey);
			});
	}, [surveyCode]);

	const vote = (option: string) => {
		httpClient
			.post<ISurveyVotes>(`/survey/${surveyCode}`, { option })
			.then(
				votes => setVotes(votes),
			)
	};

	return (
		<main className="container">
			{(!survey || survey?.isFinished) && (
				<h1 tabIndex={0} ref={finishedSurveyTitleRef}>
					Sorry but this survey already finished
				</h1>
			)}
			{!survey?.isFinished && (
				<>
					<h1>
						{survey?.title}
					</h1>
					{
						!votes && (
							<div className={css.options}>
								{survey?.options.map(option => {
									return (
										<button
											onClick={() => vote(option)}
											className={css.optionBTN}
											key={option}
										>
											{option}
										</button>
									)
								})}
							</div>
						)
					}
				</>
			)}
			{votes && (
				<>
					<hr className={css.divider} />
					<VotesResult votes={votes} />
				</>
			)}
		</main>
	);
};
