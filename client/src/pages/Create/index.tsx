import React, { useState, useRef } from 'react';

import css from './create.module.css';
import { httpClient } from '../../config/http';
import { ISurvey } from '../../interfaces/survey.interface';

type errors = '' | 'duplicated' | 'empty';

export const Create: React.FC = () => {
	const [title, setTitle] = useState('');
	const [codeToVote, setCodeToVote] = useState('');
	const [option, setOption] = useState('');
	const [options, setOptions] = useState<string[]>([]);
	const [warning, setWarning] = useState<errors>('');
	const [errorAtSurveyRegister, setErrorAtSurveyRegister] = useState('');
	const [codeToFinish, setCodeToFinish] = useState('');
	const secondaryTitleRef = useRef<HTMLHeadingElement>(null);
	const errorAtSurveyRegisterRef = useRef<HTMLHeadingElement>(null);
	const emptyWarningRef = useRef<HTMLHeadingElement>(null);
	const duplicatedWarningRef = useRef<HTMLHeadingElement>(null);

	const addOption = (event: React.MouseEvent, optionToAdd: string) => {
		event.preventDefault();

		if (!optionToAdd) {
			setWarning('empty');
			return setTimeout(() => emptyWarningRef.current?.focus(), 10);
		}

		const duplicatedOption = options.some(
			(option) => option.trim() === optionToAdd.trim(),
		);

		if (duplicatedOption) {
			setWarning('duplicated');
			return setTimeout(() => duplicatedWarningRef.current?.focus(), 10);
		}

		setOptions([...options, optionToAdd.trim()]);

		setOption('');
		setWarning('');
	};

	const removeOption = (event: React.MouseEvent, optionToRemove: string) => {
		event.preventDefault();

		const filtredOptions = options.filter(
			(option) => option !== optionToRemove,
		);

		setOptions(filtredOptions);
	};

	const registerSurvey = (event: React.MouseEvent) => {
		event.preventDefault();

		httpClient
			.post<ISurvey>('/survey', {
				title,
				options,
				codeToVote,
			})
			.then(
				({ codeToFinish }) => {
					setCodeToFinish(codeToFinish);
					setTimeout(() => secondaryTitleRef.current?.focus(), 10);
					setTitle('');
					setCodeToVote('');
					setOption('');
					setOptions([]);
					setWarning('');
					setErrorAtSurveyRegister('');
				},
				(error) => {
					const message = JSON.parse(error.message);
					setErrorAtSurveyRegister(message.message);
					setTimeout(
						() => errorAtSurveyRegisterRef.current?.focus(),
						10,
					);
				},
			);
	};

	return (
		<>
			<main className="container">
				<h1>Create</h1>
				{codeToFinish && (
					<h2 className="info" tabIndex={0} ref={secondaryTitleRef}>
						The code to finish the survey is: {codeToFinish}
					</h2>
				)}
				{errorAtSurveyRegister && (
					<p
						className="error"
						tabIndex={0}
						ref={errorAtSurveyRegisterRef}
					>
						{errorAtSurveyRegister}
					</p>
				)}

				<form>
					<div className={css.group}>
						<input
							placeholder="Survey title"
							value={title}
							className={css.input}
							onChange={({ target }) => setTitle(target.value)}
						/>

						<input
							placeholder="Survey code"
							value={codeToVote}
							className={css.input}
							onChange={({ target }) =>
								setCodeToVote(target.value)
							}
						/>
					</div>

					<hr className={css.divider} />

					<div className={css.group}>
						<input
							placeholder="Option"
							value={option}
							className={css.input}
							onChange={({ target }) => setOption(target.value)}
						/>

						<button
							className={css.btn}
							onClick={(event) => addOption(event, option)}
						>
							add option
						</button>
						{warning === 'empty' && (
							<p
								className="warning"
								tabIndex={0}
								ref={emptyWarningRef}
							>
								Type the option to be added to the list
							</p>
						)}
						{warning === 'duplicated' && (
							<p
								className="warning"
								tabIndex={0}
								ref={duplicatedWarningRef}
							>
								This option has already been added
							</p>
						)}
					</div>

					<hr className={css.divider} />

					{options.length >= 1 && (
						<div className={css.group}>
							{options.map((option) => (
								<div key={option} className={css.options}>
									<p className={css.option}>{option}</p>
									<button
										className={css.btnDanger}
										onClick={(event) =>
											removeOption(event, option)
										}
									>
										remove option
									</button>
								</div>
							))}
						</div>
					)}

					<button
						className={css.btn}
						onClick={(event) => registerSurvey(event)}
					>
						Register survey
					</button>
				</form>
			</main>
		</>
	);
};
