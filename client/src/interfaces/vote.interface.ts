export interface IVoteByOption {
	option: string;
	quantity: number;
}

export interface ISurveyVotes {
	total: number;
	votesByOption: IVoteByOption[];
}
