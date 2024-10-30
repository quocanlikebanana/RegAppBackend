import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { HelperModule } from 'src/helper/helper.module';

@Module({
	imports: [DatabaseModule, HelperModule],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule { }
