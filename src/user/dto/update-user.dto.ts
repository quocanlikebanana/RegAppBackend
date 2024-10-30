import CreateUserDTO from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types";

// Not used in this example
export default class UpdateUserDTO extends PartialType(CreateUserDTO) { }