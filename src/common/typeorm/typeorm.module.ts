import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            "type": "mongodb",
            "host": "localhost",
            "port": 27017,
            "database": "admin",
            "entities": [__dirname + '/**/*.entity{.ts,.js}'],
            "synchronize": true, // Set to false in production
            "useUnifiedTopology": true,
            logging: true
        }),
    ],
})
export class TypeOrmConfigModule { }
