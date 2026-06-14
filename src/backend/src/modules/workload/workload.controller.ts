import { Controller, Get, Put, Body, Param, UseGuards, Req, ParseUUIDPipe } from '@nestjs/common';
import { WorkloadService } from './workload.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UpdateWorkloadDto } from '../../dtos/workload.dto';

@Controller('workload')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WorkloadController {
  constructor(private readonly workloadService: WorkloadService) {}

  @Get('me')
  async getMyWorkload(@Req() req: any) {
    return this.workloadService.getWorkload(req.user.id);
  }

  @Get(':investigatorId')
  async getInvestigatorWorkload(@Param('investigatorId', ParseUUIDPipe) investigatorId: string) {
    return this.workloadService.getWorkload(investigatorId);
  }

  @Put(':investigatorId')
  @Roles('coordinador')
  async updateWorkload(
    @Param('investigatorId', ParseUUIDPipe) investigatorId: string,
    @Body() workloadData: UpdateWorkloadDto,
  ) {
    return this.workloadService.updateWorkload(investigatorId, workloadData);
  }
}
