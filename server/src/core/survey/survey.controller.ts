import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ISurveyService } from './models/survey.interface';
import { ISurvey } from './models/survey.model';
import { IVoteBody } from './models/vote.model';

@Controller('survey')
export class SurveyController {
	constructor(private readonly _surveyService: ISurveyService) {}

	@Get('/:surveyCode')
	@HttpCode(HttpStatus.OK)
	async getSurveyByCodeToRespond(@Param('surveyCode') surveyCode: string) {
		const survey = await this._surveyService.getSurveyByCodeToRespond(
			surveyCode,
		);

		return survey;
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async createSurvey(@Body() body: any) {
		const survey = await this._surveyService.createSurvey(body);

		console.info({ survey });
		return survey;
	}

	@Patch('/:surveyCode')
	@HttpCode(HttpStatus.NO_CONTENT)
	async finishSurvey(@Param('surveyCode') surveyCode: string) {
		await this._surveyService.finishSurvey(surveyCode);
	}

	@Post('/:surveyCode')
	@HttpCode(HttpStatus.OK)
	async vote(
		@Param('surveyCode') surveyCode: string,
		@Body() body: IVoteBody,
	) {
		return await this._surveyService.vote(surveyCode, body.option);
	}

	@Get('/votes/:surveyCode')
	@HttpCode(HttpStatus.OK)
	async getVotes(@Param('surveyCode') surveyCode: string) {
		return await this._surveyService.getVotes(surveyCode);
	}
}
