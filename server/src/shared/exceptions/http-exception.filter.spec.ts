import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpException } from '@nestjs/common';

import { HttpExceptionFilter } from './http-exception.filter';

const mockJson = jest.fn();

const mockStatus = jest.fn().mockImplementation(() => ({
	json: mockJson,
}));

const mockGetResponse = jest.fn().mockImplementation(() => ({
	status: mockStatus,
}));

const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
	getResponse: mockGetResponse,
	getRequest: jest.fn(),
}));

const mockArgumentsHost = {
	switchToHttp: mockHttpArgumentsHost,
	getArgByIndex: jest.fn(),
	getArgs: jest.fn(),
	getType: jest.fn(),
	switchToRpc: jest.fn(),
	switchToWs: jest.fn(),
};

describe('HttpExceptionFilter', () => {
	let filter: HttpExceptionFilter;

	beforeEach(async () => {
		jest.clearAllMocks();
		const module: TestingModule = await Test.createTestingModule({
			providers: [HttpExceptionFilter],
		}).compile();

		filter = module.get(HttpExceptionFilter);
	});

	it('should throwed an internal server error', () => {
		filter.catch(new Error('Some exception') as any, mockArgumentsHost);

		expect(mockJson).toBeCalledWith({
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: 'Some exception',
			timestamp: expect.anything(),
		});
	});

	it('should throwed an http error with message', () => {
		filter.catch(
			new HttpException('Some Http exception', HttpStatus.BAD_REQUEST),
			mockArgumentsHost,
		);

		expect(mockJson).toBeCalledWith({
			statusCode: HttpStatus.BAD_REQUEST,
			message: 'Some Http exception',
			timestamp: expect.anything(),
		});
	});

	it('should throwed an http error with errors', () => {
		const errors: never[] = [];

		filter.catch(
			new HttpException(JSON.stringify(errors), HttpStatus.BAD_REQUEST),
			mockArgumentsHost,
		);

		expect(mockJson).toBeCalledWith({
			statusCode: HttpStatus.BAD_REQUEST,
			errors,
			timestamp: expect.anything(),
		});
	});
});
