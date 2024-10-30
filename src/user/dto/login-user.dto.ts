import { IsNotEmpty, IsString } from "class-validator";

export default class LoginUserDTO {
	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}