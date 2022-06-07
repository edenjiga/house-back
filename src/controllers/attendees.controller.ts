import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAttendeesDto } from 'src/shared/entities/attendees';
import { AttendeesUseCases } from 'src/useCases/Attendees.useCase';

@Controller('attendees')
export class AttendeesController {
  constructor(private attendeesUsesCase: AttendeesUseCases) {}

  @Post()
  public create(@Body() createAttendeesDto: CreateAttendeesDto) {
    return this.attendeesUsesCase.create(createAttendeesDto);
  }

  @Get()
  public getAll() {
    return this.attendeesUsesCase.getAll();
  }
}
