import { Injectable } from '@nestjs/common';
import { AttendeesService } from 'src/data/Attendees.data';
import { CreateAttendeesDto } from 'src/shared/entities/attendees';

@Injectable()
export class AttendeesUseCases {
  constructor(private attendeesService: AttendeesService) {}

  public async create(createAttendeesDto: CreateAttendeesDto) {
    return this.attendeesService.create(createAttendeesDto);
  }
}
