import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { TaskModule } from './module/task/task.module';
import * as dotenv from 'dotenv';
import { TypeOrmConfigModule } from './common/typeorm/typeorm.module';

dotenv.config();

@Module({
    imports: [
        UserModule,
        TaskModule,
        TypeOrmConfigModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
