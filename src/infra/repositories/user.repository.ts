import { PrismaDatabaseService } from "../common/database/database.service";
import { User } from "src/domain/entities/user/user.entity";
import { Injectable } from "@nestjs/common";
import IUserRepository from "src/domain/abstract/repositories/user.repository.i";

@Injectable()
export class UserRepository implements IUserRepository {
	constructor(private readonly databaseService: PrismaDatabaseService) { }

	async create(user: User): Promise<number> {
		const result = await this.databaseService.user.create({
			data: {
				email: user.email,
				password: user.password,
				firstName: user.firstName,
				lastName: user.lastName,
				createdAt: new Date(),
			}
		});
		return result.id;
	}

	async update(user: User): Promise<void> {
		await this.databaseService.user.update({
			where: {
				id: +user.Id
			},
			data: {
				email: user.email,
				password: user.password,
				firstName: user.firstName,
				lastName: user.lastName,
			}
		});
	}

	async delete(id: number): Promise<void> {
		await this.databaseService.user.delete({
			where: {
				id: +id
			}
		});
	}
}