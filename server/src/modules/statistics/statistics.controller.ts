import { StatisticsService } from './statistics.service';
import { Controller, Get } from '@nestjs/common';

@Controller('statistics')
export class StatisticsController {
    constructor(private StatisticsService:StatisticsService){}

    @Get('total')
    getAdminStatistics()
    {
        return this.StatisticsService.findForAdmin()
    }

    @Get('monthly')
    getMonthlyStatisicts()
    {
        return this.StatisticsService.findMonthlyStatisicts()
    }
}
