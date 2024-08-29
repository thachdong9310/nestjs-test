import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { TaskModule } from './module/task/task.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/admin'),
        ConfigModule.forRoot({
            isGlobal: true, // makes env variables available throughout the app
        }),
        UserModule,
        TaskModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
