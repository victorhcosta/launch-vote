import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import css from './home.module.css';

export const Home: React.FC = () => {
	const [surveyCode, setSurveyCode] = useState('');
	const [showWarning, setShowWarning] = useState(false);
	const warningRef = useRef<HTMLHeadingElement>(null);

	const navigate = useNavigate();

	const goTo = (path: string) => {
		if (!surveyCode) {
			setShowWarning(true);
			setTimeout(() => warningRef.current?.focus(), 10);
			return;
		}

		navigate(path);
	};

	return (
		<main className='container'>
			<h1> Welcom to Launch Survey </h1>

			<section className={css.inputBox}>
				<input
					value={surveyCode}
					placeholder='Type the survey code here!'
					onChange={({ target }) => setSurveyCode(target.value)}
					className={css.input}
				/>
				{showWarning && (
					<p className='warning' tabIndex={0} ref={warningRef}>
						You should type the code to respond or finish the survey
					</p>
				)}
			</section>

			<section className={css.btns}>
				<button
					className={css.btn}
					onClick={() => navigate('create')}
					aria-label='Go create survey'
				>
					Create
				</button>
				<button
					className={css.btn}
					onClick={() => goTo(`respond/${surveyCode}`)}
					aria-label='Go respond survey'
				>
					Respond
				</button>
				<button
					className={css.btn}
					onClick={() => goTo(`finish/${surveyCode}`)}
					aria-label='Go finish survey'
				>
					Finish
				</button>
			</section>
		</main>
	);
};
