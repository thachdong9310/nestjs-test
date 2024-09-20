import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { registerDecorator, Validate, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>
    ) {
     }

    async validate(email: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { email } });
        return !user;
    }

    defaultMessage(): string {
        return 'Email ($value) already exists. Choose another one.';
    }
}

export function IsUniqueEmail(validationOptions?: any) {
    return Validate(IsUniqueEmailConstraint, validationOptions);
}