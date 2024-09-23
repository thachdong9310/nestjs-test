import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { MongoMemoryServerFactory } from '../mongodb-memory-server.provider';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => ({
                type: 'mongodb',
                url: await MongoMemoryServerFactory.start(), // Use the in-memory MongoDB URI
                entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
                synchronize: true,
                dropSchema: true,
                autoLoadEntities: true,
                logging: ['query', 'error']
            })
        }),
    ],
    exports: [TypeOrmModule],
})
export class TypeOrmConfigModule {}
