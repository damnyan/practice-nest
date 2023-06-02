import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from 'supertest';
import { BadRequestException, HttpException, HttpStatus, INestApplication, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { ValidationError } from 'class-validator';

describe('User CRUD (e2e)', () => {
  let app: INestApplication;
  let request: supertest.SuperTest<supertest.Test>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test
      .createTestingModule({
        imports: [AppModule],
      })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
    request = supertest(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  it('can list', () => {
    return request
      .get('/mng/user')
      .expect(HttpStatus.OK);
  });

  it('can create', () => {
    return request
      .post('/mng/user')
      .send({
        // email: 'email@email.com',
        // name: 'asd'
      })
      .expect(HttpStatus.UNPROCESSABLE_ENTITY)
      .expect(res => {
        console.log(res.body);
      })
  });

  it('can show', () => {
    return request.get('/mng/user/70975')
      .expect(HttpStatus.OK);
  });
});
