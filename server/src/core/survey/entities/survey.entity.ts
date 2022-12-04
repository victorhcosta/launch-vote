import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ICreatedSurvey } from '../models/survey.model';

@Entity()
export class Survey implements ICreatedSurvey {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { nullable: false, unique: true })
	codeToVote: string;

	@Column('varchar', { nullable: false, unique: true })
	codeToFinish: string;

	@Column('simple-array', { nullable: false })
	options: string[];

	@Column('boolean', { nullable: false, default: false })
	isFinished: boolean;

	@Column('varchar', { nullable: false })
	title: string;
}
