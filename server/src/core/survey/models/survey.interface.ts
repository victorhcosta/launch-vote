import { ICreatedSurvey, ISurvey } from './survey.model';
import { ISurveyVotes } from './vote.model';

export abstract class ISurveyService {
	abstract getSurveyByCodeToRespond(
		surveyCode: string,
	): Promise<ICreatedSurvey>;
	abstract createSurvey(body: ISurvey): Promise<ICreatedSurvey>;
	abstract vote(surveyCode: string, option: string): Promise<ISurveyVotes>;
	abstract finishSurvey(surveyCodeToFinish: string): Promise<void>;
	abstract getVotes(surveyCode: string): Promise<ISurveyVotes>;
}
