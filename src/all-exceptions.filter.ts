import { Catch, ArgumentsHost, HttpStatus, HttpException, ConsoleLogger } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

type MyError = {
	statusCode: number;
	timeStamp: string;
	path: string;
	response: string | object;
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		const responseError: MyError = {
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			timeStamp: new Date().toISOString(),
			path: request.url,
			response: '',
		}

		// Prisma errors
		if (exception instanceof PrismaClientValidationError) {
			responseError.statusCode = HttpStatus.BAD_REQUEST;
			responseError.response = `Prisma client validation error: ` + exception.message.replaceAll('\n', ' ');
		} else if (exception instanceof PrismaClientKnownRequestError) {
			responseError.statusCode = HttpStatus.BAD_REQUEST;
			responseError.response = `Prisma known request error: ${exception.message.replaceAll('\n', ' ')}`;
		} else if (exception instanceof PrismaClientUnknownRequestError) {
			responseError.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
			responseError.response = `Prisma unknown request error: ${exception.message.replaceAll('\n', ' ')}`;
		} else if (exception instanceof PrismaClientRustPanicError) {
			responseError.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
			responseError.response = `Prisma rust panic error: ${exception.message.replaceAll('\n', ' ')}`;
		}

		// Http errors
		else if (exception instanceof HttpException) {
			responseError.statusCode = exception.getStatus();
			responseError.response = exception.message;
		}

		// Other errors
		else {
			responseError.response = 'Internal Server Error';
		}

		response
			.status(responseError.statusCode)
			.json(responseError);
		super.catch(exception, host);
	}
}
