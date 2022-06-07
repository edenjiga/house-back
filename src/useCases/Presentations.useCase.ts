import { Injectable } from '@nestjs/common';
import { AttendeesService } from 'src/data/Attendees.data';
import { PresentationsService } from 'src/data/Presentations.data';
import { CreatePresentationDto } from 'src/shared/entities/presentations';

@Injectable()
export class PresentationsUseCases {
  constructor(
    private attendeesService: AttendeesService,
    private presentationsService: PresentationsService,
  ) {}

  public async getAll() {
    return this.presentationsService.getAll();
  }

  public async addAttendees(email: string, presentationId: string) {
    const attendees = await this.attendeesService.getByEmail(email);

    return this.presentationsService.addAttendeesById(
      presentationId,
      // @ts-ignore
      attendees._id,
    );
  }

  public async create(createPresentationDto: CreatePresentationDto) {
    return this.presentationsService.create(createPresentationDto);
  }
}
