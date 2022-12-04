import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SurveyRepository } from './respositories/survey.repository';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { ISurveyService } from './models/survey.interface';
import { VoteRepository } from './respositories/vote.repository';

@Module({
	imports: [TypeOrmModule.forFeature([SurveyRepository, VoteRepository])],
	controllers: [SurveyController],
	providers: [{ provide: ISurveyService, useClass: SurveyService }],
})
export class SurveyModule {}
