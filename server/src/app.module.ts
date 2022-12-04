import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TYPEORM } from './constants';
import { SurveyModule } from './core/survey/survey.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			autoLoadEntities: true,
			username: TYPEORM.USER,
			password: TYPEORM.PASS,
			host: TYPEORM.HOST,
			port: TYPEORM.PORT,
			database: TYPEORM.DB,
			entities: [TYPEORM.ENTITIES],
		}),
		SurveyModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
