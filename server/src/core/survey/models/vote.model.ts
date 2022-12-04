export interface IVote {
	id: string;
	option: string;
	surveyCode: string;
}

export interface IVoteByOption {
	option: string;
	quantity: number;
}

export interface ISurveyVotes {
	total: number;
	votesByOption: IVoteByOption[];
}

export interface IVoteBody {
	option: string;
}
