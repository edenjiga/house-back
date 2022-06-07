import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Attendee {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop()
  company: string;

  @Prop({ default: new Date() })
  registered: Date;
}

export type AttendeesDocument = Attendee & Document;
export const AttendeesSchema = SchemaFactory.createForClass(Attendee);
