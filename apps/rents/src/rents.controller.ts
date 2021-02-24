import { Controller, Get } from '@nestjs/common';
import { RentsService } from './rents.service';

@Controller()
export class RentsController {
  constructor(private readonly rentsService: RentsService) {}

  @Get()
  getHello(): string {
    return this.rentsService.getHello();
  }
}
