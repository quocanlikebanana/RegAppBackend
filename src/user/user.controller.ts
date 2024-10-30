import { Controller, Post, Body, Get, Param, ParseIntPipe, ValidationPipe, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDTO from './dto/create-user.dto';
import LoginUserDTO from './dto/login-user.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Post('register')
	register(@Body(ValidationPipe) createUserDto: CreateUserDTO) {
		return this.userService.create(createUserDto);
	}

	@Post('login')
	login(@Body(ValidationPipe) loginUserDTO: LoginUserDTO) {
		return this.userService.verify(loginUserDTO);
	}

	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	find(@Param('id', ParseIntPipe) id: number) {
		return this.userService.find(id);
	}

	@Delete('clear')
	clear() {
		return this.userService.deleteAll();
	}
}
