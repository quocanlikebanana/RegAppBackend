import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import cron from 'node-cron';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {
		cron.schedule('*/14 * * * * *', () => {
			this.ping();
		});
	}

	@Get('/ping')
	ping() {
		return "ping";
	}
}
