import { Controller, Get, Req, UseGuards, Query } from '@nestjs/common';
import { AgentService } from './agent.service';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { AgentContextQueryDto } from './dto/agent-context.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Agent')
@ApiBearerAuth('JWT')
@Controller('api/internal/openclaw/v1/agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}


  @UseGuards(JwtAuthGuard)
  @Get('context')
  async getContext(
    @Req() req: any,
    @Query() query: AgentContextQueryDto,
  ) {
    return this.agentService.getContext(req.user, query.agentName);
  }

  // 🔥 LIST ALL AGENTS
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllAgents() {
    return this.agentService.findAll();
  }
}