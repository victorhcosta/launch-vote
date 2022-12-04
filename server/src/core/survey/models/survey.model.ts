export interface ISurvey {
	title: string;
	options: string[];
	codeToVote: string;
}

export interface ICreatedSurvey extends ISurvey {
	id: string;
	codeToFinish: string;
	isFinished: boolean;
}
