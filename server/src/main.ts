import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import { AppModule } from './app.module';
import { ORIGIN, PORT } from './constants';
// import { dataSource } from './database/ormconfig';
import { HttpExceptionFilter } from './shared/exceptions/http-exception.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: ORIGIN,
		},
		bodyParser: true,
	});

	app.useGlobalFilters(new HttpExceptionFilter());
	app.use(helmet());

	// await dataSource.initialize();
	await app.listen(PORT);
}

bootstrap()
	.then(() => console.info(`the application is running on port: ${PORT}`))
	.then(() =>
		console.info(
			`the application accept request from: ${
				ORIGIN === '*' ? 'any origin' : ORIGIN
			}`,
		),
	)
	.catch((error) => {
		console.group('error');
		console.info(error);
		console.groupEnd();
		// dataSource.destroy();
		process.exit(1);
	});
