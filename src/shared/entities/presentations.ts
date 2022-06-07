export class CreatePresentationDto {
  presentation: string;
  room: number;
  details: string;
  speaker: {
    name: string;
    company: string;
    email: string;
    bio: string;
  };
  attendees?: Array<string>;
}
