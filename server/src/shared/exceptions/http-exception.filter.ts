import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const { message } = exception;
		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		try {
			response.status(status).json({
				statusCode: status,
				errors: JSON.parse(message),
				timestamp: new Date().toISOString(),
			});
		} catch (error) {
			response.status(status).json({
				statusCode: status,
				message,
				timestamp: new Date().toISOString(),
			});
		}
	}
}
