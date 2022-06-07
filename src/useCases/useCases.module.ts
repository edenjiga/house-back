import { Module } from '@nestjs/common';

import { DataModule } from '../data';

import { AttendeesUseCases } from './Attendees.useCase';
import { PresentationsUseCases } from './Presentations.useCase';

const commonsModule = [AttendeesUseCases, PresentationsUseCases];
@Module({
  imports: [DataModule],
  exports: commonsModule,
  providers: commonsModule,
})
export class UseCaseModule {}
