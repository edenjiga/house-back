import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { CreatePresentationDto } from 'src/shared/entities/presentations';
import { CreateAttendeesDto } from 'src/shared/entities/attendees';

describe('Attendees controller', () => {
  let app: INestApplication;

  const createFakePresentation = () => ({
    details: faker.name.jobDescriptor(),
    presentation: faker.name.firstName(),
    room: +faker.random.numeric(),
    speaker: {
      name: faker.name.firstName(),
      bio: faker.random.alphaNumeric(),
      company: faker.company.companyName(),
      email: faker.internet.email(),
    },
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('POST /presentations', () => {
    it('should return a code 201 with the object presentation created', async () => {
      const createPresentationDto: CreatePresentationDto =
        createFakePresentation();

      const response = await request(app.getHttpServer())
        .post('/presentations')
        .send(createPresentationDto);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toMatchObject(createPresentationDto);
    });
  });

  describe('POST /presentation/:presentation_id/attendees', () => {
    it('should return 200 with the presentation updated', async () => {
      // create a attendees
      const attendees: CreateAttendeesDto = {
        company: faker.company.companyName(),
        name: faker.name.firstName(),
        email: faker.internet.email(),
      };

      const {
        body: { _id: attendeesId },
      } = await request(app.getHttpServer()).post('/attendees').send(attendees);

      const createPresentationDto: CreatePresentationDto =
        createFakePresentation();

      // create presentation
      const response = await request(app.getHttpServer())
        .post('/presentations')
        .send(createPresentationDto);

      expect(response.statusCode).toEqual(201);

      const { body: presentationToBeUpdated } = response;

      const secondRequest = await request(app.getHttpServer())
        .post(`/presentations/${presentationToBeUpdated._id}/attendees`)
        .send({ email: attendees.email });

      expect(secondRequest.statusCode).toEqual(200);
      expect(secondRequest.body.attendees).toContain(attendeesId);
    });
  });
});
