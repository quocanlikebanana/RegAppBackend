import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// All exception handler
	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

	// Set global prefix for all routes
	app.setGlobalPrefix('api');

	// Turn on CORS for frontend to use the API,
	// Can be configured to only allow certain domains, if left empty, all domains are allowed
	app.enableCors({
		origin: [/https:\/\/quocanlikebanana\.github\.io\/.*/, /http:\/\/localhost.*/],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
		optionsSuccessStatus: 204,
		credentials: true,
	});

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
