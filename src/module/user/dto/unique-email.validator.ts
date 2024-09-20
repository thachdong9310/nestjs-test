import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Validate, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async validate(email: string): Promise<boolean> {
        console.log(this.userRepository);

        const user = await this.userRepository.findOne({ where: { email: email } });
        return !user;
    }

    defaultMessage(): string {
        return 'Email ($value) already exists. Choose another one.';
    }
}

export function IsUniqueEmail(validationOptions?: any) {
    return Validate(IsUniqueEmailConstraint, validationOptions);  // Applies the custom validator class
}