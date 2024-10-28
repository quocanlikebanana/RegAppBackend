import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Post('register')
    registerUser(@Body() createUserDto: any): string {
        // Logic to handle user registration goes here
        return 'User registered successfully';
    }

    @Get()
    getAllUsers(): string {
        // Logic to get all users goes here
        return 'All users';
    }

    @Get(':id')
    getUserById(@Param('id') id: string): string {
        // Logic to get a user by id goes here
        return `User with id ${id}`;
    }
}
