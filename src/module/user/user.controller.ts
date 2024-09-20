import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Types } from 'mongoose';
import { ObjectId } from 'mongodb';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ID format');
        }

        const user = await this.userService.findOne(new ObjectId(id));
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;;
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(new ObjectId(id), updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        console.log('delete', id);

        return this.userService.remove(new ObjectId(id));
    }
}
