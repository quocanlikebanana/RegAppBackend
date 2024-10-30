import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import CreateUserDTO from './dto/create-user.dto';
import { HelperService } from 'src/helper/helper.service';
import LoginUserDTO from './dto/login-user.dto';

@Injectable()
export class UserService {
	constructor(
		private readonly databaseService: DatabaseService,
		private readonly helperService: HelperService
	) { }

	// No need to await anything here, as the database service will handle the await
	async create(createUserDto: CreateUserDTO) {
		const existingUserUsername = await this.databaseService.user.findFirst({
			where: {
				username: createUserDto.username
			},
		});
		if (existingUserUsername) {
			throw new BadRequestException(`User with this username: ${createUserDto.username} already exists`);
		}
		const existingUserEmail = await this.databaseService.user.findFirst({
			where: {
				email: createUserDto.email
			},
		});
		if (existingUserEmail) {
			throw new BadRequestException(`User with this email: ${createUserDto.email} already exists`);
		}

		const newPassword = await this.helperService.hashPassword(createUserDto.password);
		return this.databaseService.user.create({
			data: {
				username: createUserDto.username,
				email: createUserDto.email,
				password: newPassword,
			}
		});
	}

	async verify(loginUserDTO: LoginUserDTO) {
		const user = await this.databaseService.user.findFirst({
			where: {
				username: loginUserDTO.username
			}
		});
		if (!user) {
			throw new NotFoundException(`User with username: ${loginUserDTO.username} not found`);
		}
		const isPasswordValid = await this.helperService.comparePassword(loginUserDTO.password, user.password);
		if (!isPasswordValid) {
			throw new BadRequestException('Invalid password');
		}
		return user;
	}

	async findAll() {
		const users = this.databaseService.user.findMany();
		return users;
	}

	async find(id: number) {
		const user = this.databaseService.user.findUnique({ where: { id } });
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}
		return user;
	}

	async deleteAll() {
		return this.databaseService.user.deleteMany();
	}
}
