import { EntityRepository, Repository } from 'typeorm';

import { Survey } from '../entities/survey.entity';

@EntityRepository(Survey)
export class SurveyRepository extends Repository<Survey> {}
