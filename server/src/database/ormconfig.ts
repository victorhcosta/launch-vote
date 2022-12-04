import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { TYPEORM } from '../constants';

export const ormConfig: TypeOrmModuleOptions = {
	type: 'better-sqlite3',
	name: 'testing',
	database: ':memory:',
	dropSchema: true,
	synchronize: true,
	keepConnectionAlive: true,
	autoLoadEntities: true,
	entities: [TYPEORM.ENTITIES],
};
