import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

type envs = 'LOCAL' | 'TEST' | 'DEVELOPMENT' | 'HOMOLOGATION' | 'PRODUCTION';

const { env } = process;

export const ENV = env.ENV as envs;

export const PORT = Number(env.PORT);

export const ORIGIN = env.ORIGIN;

export const TYPEORM = {
	HOST: env.TYPEORM_HOST,
	PORT: Number(env.TYPEORM_PORT),
	USER: env.TYPEORM_USERNAME,
	PASS: env.TYPEORM_PASSWORD,
	DB: env.TYPEORM_DATABASE,
	ENTITIES: env.TYPEORM_ENTITIES as string,
	ENTITIES_DIR: env.TYPEORM_ENTITIES_DIR,
} as const;

export const SQLITECONFIG: TypeOrmModuleOptions = {
	type: 'sqlite',
	database: ':memory:',
	dropSchema: true,
	synchronize: true,
	keepConnectionAlive: true,
	autoLoadEntities: true,
} as const;

export const JWT = {
	SECRET: env.JWT_SECRET,
	ACCESS_EXPIRESIN: env.JWT_ACCESS_EXPIRESIN,
} as const;

export const RATELIMIT = {
	TTL: Number(env.RATELIMIT_TTL),
	LIMIT: Number(env.RATELIMIT_LIMIT),
} as const;
