import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ObjectId } from 'mongodb';

describe('AppController e2e', () => {
  let app: INestApplication;
  let userId: ObjectId;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('get hello', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });


  it('should perform CRUD operations on a user', async () => {
    // Create
    const createResponse = await request(app.getHttpServer())
      .post('/user')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      })
      .expect(201);

    expect(createResponse.body).toHaveProperty('_id');
    userId = new ObjectId(createResponse.body._id);

    // Read
    const getResponse = await request(app.getHttpServer())
      .get(`/user/${userId}`)
      .expect(200);

    expect(getResponse.body).toHaveProperty('email', 'john.doe@example.com');

    // Update
    const updateResponse = await request(app.getHttpServer())
      .patch(`/user/${userId}`)
      .send({ email: 'jane@example.com' })
      .expect(200);

    expect(updateResponse.body).toHaveProperty('email', 'jane@example.com');

    // Delete
    await request(app.getHttpServer())
      .delete(`/user/${userId}`)
      .expect(204); // Expect 204 No Content since no response body on delete
  });
});


