import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { CreateAttendeesDto } from 'src/shared/entities/attendees';

describe('Attendees controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('POST /attendees', () => {
    it('should return a code 201 with the object attendees created', async () => {
      const createAttendee: CreateAttendeesDto = {
        company: faker.company.companyName(),
        name: faker.name.firstName(),
        email: faker.internet.email(),
      };
      const response = await request(app.getHttpServer())
        .post('/attendees')
        .send(createAttendee);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toMatchObject(createAttendee);
    });
  });
});
