import { Module } from '@nestjs/common';
import { UseCaseModule } from '../useCases';
import { AttendeesController } from './attendees.controller';
import { PresentationsController } from './presentations.controller';

@Module({
  imports: [UseCaseModule],
  controllers: [AttendeesController, PresentationsController],
})
export class ControllerModule {}

// 1tMf4FjC5qBcuiQI
