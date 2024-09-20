import { MongoMemoryServer } from 'mongodb-memory-server';

export class MongoMemoryServerFactory {
    private static mongoServer: MongoMemoryServer;

    static async start(): Promise<string> {
        if (!this.mongoServer) {
            this.mongoServer = await MongoMemoryServer.create();
        }
        return this.mongoServer.getUri();
    }

    static async stop(): Promise<void> {
        if (this.mongoServer) {
            await this.mongoServer.stop();
        }
    }
}
