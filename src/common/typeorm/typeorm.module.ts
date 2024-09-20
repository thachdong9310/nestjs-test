import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { MongoMemoryServerFactory } from '../mongodb-memory-server.provider';

@Module({
    imports: [
        // TypeOrmModule.forRoot({
        //     type: "mongodb",
        //     host: "localhost",
        //     port: 27017,
        //     database: "admin",
        //     useUnifiedTopology: true,  
        //     // "entities": [__dirname + '/**/*.entity.{ts,js}'],
        //     entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
        //     synchronize: true, // Set to false in production
        //     logging: true
        // }),
        TypeOrmModule.forRootAsync({
            useFactory: async () => ({
                type: 'mongodb',
                url: await MongoMemoryServerFactory.start(), // Use the in-memory MongoDB URI
                useUnifiedTopology: true,
                entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
                synchronize: true,  
                logging: ['query', 'error']
            }),
        }),
    ],
    exports: [TypeOrmModule],
})
export class TypeOrmConfigModule { }
