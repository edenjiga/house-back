import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MODEL_NAMES } from 'src/constants';
import { Presentation, PresentationsDocument } from 'src/models';
import { CreatePresentationDto } from 'src/shared/entities/presentations';

@Injectable()
export class PresentationsService {
  constructor(
    @InjectModel(MODEL_NAMES.PRESENTATIONS)
    private presentationsModel: Model<PresentationsDocument>,
  ) {}

  async getAll() {
    return this.presentationsModel.find({});
  }

  async addAttendeesById(presentationId: string, attendeeId) {
    return this.presentationsModel.findByIdAndUpdate(
      presentationId,
      {
        $push: {
          attendees: [attendeeId],
        },
      },
      {
        new: true,
      },
    );
  }

  getById(presentationId: string): any {
    throw new Error('Method not implemented.');
  }

  async create(
    createPresentationDto: CreatePresentationDto,
  ): Promise<Presentation> {
    const createdPresentations = new this.presentationsModel(
      createPresentationDto,
    );
    return createdPresentations.save();
  }
}
