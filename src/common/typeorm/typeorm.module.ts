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
            entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
            synchronize: true,
            useUnifiedTopology: true,
            logging: true
        }),
    ],
})
export class TypeOrmConfigModule { }
