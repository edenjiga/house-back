import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { MODEL_NAMES } from 'src/constants';
import { Attendee } from './attendees';

@Schema()
export class Presentation {
  @Prop({
    required: true,
  })
  presentation: string;

  @Prop()
  room: number;

  @Prop()
  details: string;

  @Prop(
    raw({
      name: { type: String },
      company: { type: String },
      email: { type: String },
      bio: { type: String },
    }),
  )
  speaker: {
    name: string;
    company: string;
    email: string;
    bio: string;
  };

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: MODEL_NAMES.ATTENDEES,
    default: [],
  })
  attendees: Array<string>;
}
export type PresentationsDocument = Presentation & Document;
export const PresentationsSchema = SchemaFactory.createForClass(Presentation);
