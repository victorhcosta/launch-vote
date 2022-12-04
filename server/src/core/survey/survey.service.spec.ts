import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ormConfig } from '../../database/ormconfig';
import { Survey } from './entities/survey.entity';
import { SurveyRepository } from './respositories/survey.repository';
import { SurveyService } from './survey.service';

describe('SurveyService', () => {
	let service: SurveyService;

	// beforeAll(async () => await import('../../database/create_database'));

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				TypeOrmModule.forRoot(ormConfig),
				TypeOrmModule.forFeature([SurveyRepository]),
			],
			providers: [SurveyService, SurveyRepository],
		}).compile();

		service = module.get<SurveyService>(SurveyService);
	});

	// afterAll(async () => await import('../../database/drop_database'));

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should throw a not found exception when not found the survey', () => {
		const getSurveyByIDSPY = jest.spyOn(service, 'getSurveyByID');
		service
			.getSurveyByCodeToRespond('')
			.catch((error: Error) =>
				expect(error.message).toBe('Survey not found'),
			);
		expect(getSurveyByIDSPY).toThrowError('');
	});

	// it.skip('should return the survey');

	// it.skip('should create a new survey');

	// it.skip('should throw an error when the code to respond already exists');
});
