import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { ObjectId } from 'mongodb';
import { MongoMemoryServerFactory } from '../src/common/mongodb-memory-server.provider';
import { useContainer, Validator } from "class-validator";

describe('User e2e', () => {
  let app: INestApplication;
  let userId: ObjectId;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.init();
  });

  afterAll(async () => {
    await MongoMemoryServerFactory.stop();
    await app.close();
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


  it('should fail validation on create user with missing fields', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      })
      .expect(400); // Bad Request

    expect(response.body).toHaveProperty('message'); // Ensure error message is present
    expect(response.body.message).toContain('Tên là bắt buộc'); // Check custom error messages
    expect(response.body.message).toContain('Họ là bắt buộc');
    expect(response.body.message).toContain('Email bắt buộc');
    expect(response.body.message).toContain('Mật khẩu bắt buộc');
  });

  it('should fail validation on create user with invalid email', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        password: 'password123',
      })
      .expect(400); // Bad Request

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Sai định dạng email');
  });

  it('should fail validation on create user with short password', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: '123',
      })
      .expect(400); // Bad Request

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Mật khẩu cần ít nhất 6 kí tự');
  });
});


