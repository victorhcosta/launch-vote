import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';

import { ISurveyService } from './models/survey.interface';
import { ICreatedSurvey, ISurvey } from './models/survey.model';
import { ISurveyVotes, IVoteByOption } from './models/vote.model';
import { SurveyRepository } from './respositories/survey.repository';
import { VoteRepository } from './respositories/vote.repository';

@Injectable()
export class SurveyService implements ISurveyService {
	constructor(
		private readonly _surveyRepository: SurveyRepository,
		private readonly _voteRepository: VoteRepository,
	) {}

	async getSurveyByCodeToRespond(
		surveyCode: string,
	): Promise<ICreatedSurvey> {
		const survey = await this._surveyRepository.findOne({
			where: {
				codeToVote: surveyCode,
			},
		});

		if (!survey) throw new NotFoundException('Survey not found');

		return survey;
	}

	async createSurvey(survey: ISurvey): Promise<ICreatedSurvey> {
		const dateAsISO = new Date().toISOString();
		const codeToFinish = dateAsISO.split('.')[1].split('Z')[0];
		const surveyToSave = {
			...survey,
			codeToFinish: `${survey.codeToVote}-${codeToFinish}`,
		};

		await this._validateSurvey(surveyToSave);

		const savedSurvey = await this._surveyRepository.save(surveyToSave);

		return savedSurvey;
	}

	async finishSurvey(surveyCodeToFinish: string): Promise<void> {
		const surveyID = (
			await this._surveyRepository.findOne({
				where: { codeToFinish: surveyCodeToFinish },
				select: ['id'],
			})
		)?.id;

		if (!surveyID)
			throw new NotFoundException(
				'Survey not found, check the code to finish.',
			);

		this._surveyRepository.update(surveyID, {
			isFinished: true,
		});
	}

	async vote(surveyCode: string, option: string): Promise<ISurveyVotes> {
		const survey = await this._surveyRepository.findOne({
			codeToVote: surveyCode,
		});

		const optionIsInValid = survey?.options.every(
			(optionInDB) => optionInDB !== option,
		);

		if (survey?.isFinished)
			throw new BadRequestException('Survey has been finished');

		if (optionIsInValid) throw new BadRequestException('Invalid option');

		await this._voteRepository.save({ surveyCode, option });

		return this.getVotes(surveyCode);
	}

	async getVotes(surveyCode: string): Promise<ISurveyVotes> {
		const votesPromise = this._voteRepository.find({
			where: { surveyCode },
		});

		const surveyPromise = this._surveyRepository.findOne({
			where: { codeToVote: surveyCode },
			select: ['options'],
		});

		const [votes, survey] = await Promise.all([
			votesPromise,
			surveyPromise,
		]);

		if (!survey) throw new NotFoundException('Survey not found');

		const { options } = survey;

		const votesByOption = options.map<IVoteByOption>((option) => {
			const quantity = votes.filter(
				(vote) => vote.option === option,
			).length;

			return {
				option,
				quantity,
			};
		});

		return {
			total: votes.length,
			votesByOption,
		};
	}

	private async _validateSurvey(survey: ISurvey) {
		if (!survey.title)
			throw new BadRequestException("An empty title isn't allowed");

		if (!survey.codeToVote)
			throw new BadRequestException("An empty code isn't allowed");

		if (survey.options?.length <= 1)
			throw new BadRequestException('At least two options are required');

		const hasEmptyOption = survey.options.some(
			(option) => option.length <= 0,
		);

		if (hasEmptyOption)
			throw new BadRequestException("An empty options isn't allowed");

		const uniqueOptions = [...new Set(survey.options)];
		const hasDuplicatedOptions =
			survey.options.length !== uniqueOptions.length;

		if (hasDuplicatedOptions)
			throw new BadRequestException("Duplicate options isn't allowed");

		const savedSurvey = await this._surveyRepository.findOne({
			where: { codeToVote: survey.codeToVote },
		});

		if (savedSurvey)
			throw new BadRequestException('This code already exists');
	}
}
