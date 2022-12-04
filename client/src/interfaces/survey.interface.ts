export interface ISurvey {
	id: string;
	title: string;
	options: string[];
	codeToVote: string;
	codeToFinish: string;
	isFinished: boolean;
}
