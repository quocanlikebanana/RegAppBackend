import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { HelperModule } from './helper/helper.module';


@Module({
	imports: [
		DatabaseModule,
		HelperModule,

		// Models
		UserModule,

		// Default throttle configuration for all routes
		ThrottlerModule.forRoot([
			{
				ttl: 10000, // Time to live: 10 second
				limit: 10,	// 10 requests 
			},
		]),
	],
	controllers: [AppController],
	providers: [AppService, {
		provide: APP_GUARD,
		useClass: ThrottlerGuard,
	}],
})

export class AppModule { }
