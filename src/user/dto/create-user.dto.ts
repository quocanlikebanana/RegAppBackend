import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import LoginUserDTO from "./login-user.dto";

export default class CreateUserDTO extends LoginUserDTO {
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email: string;

}