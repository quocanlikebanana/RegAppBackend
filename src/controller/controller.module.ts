import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { UsecaseModule } from 'src/usecases/usecase.module';
import LocalStrategy from './common/passport/local.strategy';
import JwtStrategy from './common/passport/jwt.strategy';

@Module({
	imports: [UsecaseModule],
	controllers: [
		UserController,
		AuthController,
	],
	providers: [
		LocalStrategy,
		JwtStrategy,
	],
})
export class ControllerModule { }
