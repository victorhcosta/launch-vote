import React, { useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';
import { VotesResult } from '../../components/VotesResult';

import { httpClient } from '../../config/http';
import { ISurvey } from '../../interfaces/survey.interface';
import { ISurveyVotes } from '../../interfaces/vote.interface';
import css from './finish.module.css';

export const Finish: React.FC = () => {
	const [survey, setSurvey] = useState<ISurvey>();
	const [surveyNotFoundMessage, setSurveyNotFoundMessage] = useState('');
	const [getVotesErrorMessage, setGetVotesErrorMessage] = useState('');
	const [isFinished, setIsFinished] = useState(false);
	const [votes, setVotes] = useState<ISurveyVotes>();
	const finishedSurveyTitleRef = useRef<HTMLHeadingElement>(null);
	const surveyNotFoundMessageRef = useRef<HTMLHeadingElement>(null);
	const getVotesErrorMessageRef = useRef<HTMLHeadingElement>(null);
	


	const { surveyCode } = useParams();

	useEffect(() => {
		const code = surveyCode?.slice(0, -4);

		httpClient.get<ISurvey>(`/survey/${code}`).then(
			(survey) => {
				if (survey.isFinished)
					setTimeout(
						() => finishedSurveyTitleRef.current?.focus(),
						10,
					);

				setSurvey(survey);
				setIsFinished(survey.isFinished);
			},
			error => {
				const message = JSON.parse(error.message);
				setSurveyNotFoundMessage(message.message);
				setTimeout(() => surveyNotFoundMessageRef.current?.focus(), 10);
			},
		);

		httpClient
			.get<ISurveyVotes>(`/survey/votes/${code}`)
			.then(
				(votes) => setVotes(votes),
				error => {
					const message = JSON.parse(error.message);
					setGetVotesErrorMessage(message.message);
					setTimeout(() => getVotesErrorMessageRef.current?.focus(), 10);
				},
			);
	}, [surveyCode]);

	const finish = () => {
		httpClient
			.patch<void>(`/survey/${surveyCode}`)
			.then(
				() => {
					setIsFinished(true);
					setSurveyNotFoundMessage('');
				},
				error => {
					const message = JSON.parse(error.message);
					setSurveyNotFoundMessage(message.message);
					setTimeout(() => surveyNotFoundMessageRef.current?.focus(), 10);
				},
			);
	};

	return (
		<main className="container">
			{(!survey || isFinished) && (
				<>
					<h1 tabIndex={0} ref={finishedSurveyTitleRef}>
						This survey already finished
					</h1>

					<hr className={css.divider} />
				</>
			)}

			{!isFinished && (
				<>
					<h1 tabIndex={0} ref={finishedSurveyTitleRef}>
						The survey is open
					</h1>

					<button className={css.btn} onClick={() => finish()}>
						finish
					</button>

					<hr className={css.divider} />
				</>
			)}

			{surveyNotFoundMessage && (
				<p
					className="error"
					tabIndex={0}
					ref={surveyNotFoundMessageRef}
				>
					{surveyNotFoundMessage}
				</p>
			)}

			{votes && <VotesResult votes={votes} />}

			{getVotesErrorMessage && (
				<p
					className="error"
					tabIndex={0}
					ref={getVotesErrorMessageRef}
				>
					{getVotesErrorMessage}
				</p>
			)}
		</main>
	);
};
