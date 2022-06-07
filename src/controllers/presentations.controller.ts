import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreatePresentationDto } from 'src/shared/entities/presentations';
import { PresentationsUseCases } from 'src/useCases/Presentations.useCase';

@Controller('presentations')
export class PresentationsController {
  constructor(private presentationsUseCases: PresentationsUseCases) {}

  @Post()
  public create(@Body() createPresentationDto: CreatePresentationDto) {
    return this.presentationsUseCases.create(createPresentationDto);
  }

  @Post('/:presentationId/attendees')
  @HttpCode(200)
  public addAttendees(
    @Body('email') email: string,
    @Param('presentationId') presentationId: string,
  ) {
    return this.presentationsUseCases.addAttendees(email, presentationId);
  }

  @Get()
  public getAll() {
    return this.presentationsUseCases.getAll();
  }
}
