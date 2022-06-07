import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { MODEL_NAMES } from 'src/constants';
import { AttendeesSchema } from 'src/models';
import { PresentationsSchema } from 'src/models/presentations';

import environment from '../environment';
import { AttendeesService } from './Attendees.data';
import { PresentationsService } from './Presentations.data';
const commonModules = [AttendeesService, PresentationsService];
@Module({
  imports: [
    MongooseModule.forRoot(environment.mongo.url, {}),
    MongooseModule.forFeature([
      {
        name: MODEL_NAMES.ATTENDEES,
        schema: AttendeesSchema,
      },
      {
        name: MODEL_NAMES.PRESENTATIONS,
        schema: PresentationsSchema,
      },
    ]),
  ],
  exports: commonModules,
  providers: commonModules,
})
export class DataModule {}
