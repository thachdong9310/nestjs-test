import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('vao day');

    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);

      throw new ConflictException('Email is already in use.');
    }

  }

  async validateUniqueEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !user;
  }

  async findAll(): Promise<Array<User>> {
    console.log(1);

    return await this.userRepository.find();
  }

  async findOne(id: ObjectId): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { _id: id } });
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { _id: id } });
    await this.userRepository.update(user._id, updateUserDto);
    const updatedUser = await this.findOne(id);
    return updatedUser;
  }

  async remove(id: ObjectId) {
    const user = await this.userRepository.findOne({ where: { _id: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.remove(user);
  }
}
