import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsUniqueEmailConstraint } from './dto/unique-email.validator';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service'; 

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        UserService,
        IsUniqueEmailConstraint
    ],
    exports: [UserService],
})
export class UserModule { }
