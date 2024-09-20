import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: ['log', 'error', 'warn', 'debug', 'verbose'] });

    /** SWAGGER */
    const config = new DocumentBuilder()
        .setTitle("Your API Title")
        .setDescription("API description")
        .setVersion("1.0")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
    /** END SWAGGER */

    await app.listen(3000);
    console.log(
        ` 🚀 Server ready at: http://localhost:3000`
    );
}
bootstrap();

