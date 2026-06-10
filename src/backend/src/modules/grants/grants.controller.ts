import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { GrantsService } from './grants.service';
import { ImportGrantDto } from '../../../../dtos/import-grant.dto';

@Controller('grants')
export class GrantsController {
  constructor(private readonly grantsService: GrantsService) {}

  @Get('search')
  async search(@Query('keyword') keyword: string) {
    return this.grantsService.search(keyword);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.grantsService.findOne(id);
  }

  @Post('import')
  async importGrant(@Body() importGrantDto: ImportGrantDto) {
    return this.grantsService.importGrant(importGrantDto.id);
  }
}
