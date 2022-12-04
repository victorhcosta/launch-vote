import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IVote } from '../models/vote.model';

@Entity()
export class Vote implements IVote {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { nullable: false })
	option: string;

	@Column('varchar', { nullable: false })
	surveyCode: string;
}
