import { EntityRepository, Repository } from 'typeorm';

import { Vote } from '../entities/vote.entity';

@EntityRepository(Vote)
export class VoteRepository extends Repository<Vote> {}
