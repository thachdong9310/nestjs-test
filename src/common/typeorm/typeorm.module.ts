import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mongodb",
            host: "localhost",
            port: 27017,
            database: "admin",
            // "entities": [__dirname + '/**/*.entity.{ts,js}'],
            entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
            synchronize: true, // Set to false in production
            useUnifiedTopology: true,
            logging: true
        }),
    ],
})
export class TypeOrmConfigModule { }
