import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MODEL_NAMES } from 'src/constants';
import { AttendeesDocument, Attendee } from 'src/models';
import { CreateAttendeesDto } from 'src/shared/entities/attendees';

@Injectable()
export class AttendeesService {
  constructor(
    @InjectModel(MODEL_NAMES.ATTENDEES)
    private attendeesModel: Model<AttendeesDocument>,
  ) {}

  async getByEmail(email: string): Promise<Attendee> {
    return this.attendeesModel.findOne({ email });
  }

  async create(createAttendeesDto: CreateAttendeesDto): Promise<Attendee> {
    const createdAttendees = new this.attendeesModel(createAttendeesDto);
    return createdAttendees.save();
  }

  async getAll() {
    return this.attendeesModel.find({});
  }
}
