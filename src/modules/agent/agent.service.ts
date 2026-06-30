import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agent } from './entities/agent.entity';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
  ) {}

  // 🔥 GET CONTEXT (with optional agentName validation)
  async getContext(auth: any, agentName: string) {
    const agent = await this.agentRepository.findOne({
      where: {
        userId: auth.id,
         username: agentName,
      },
      relations: {
        user: true,
      },
    });

    if (!agent) {
      throw new NotFoundException('Agent not found or not authorized');
    }

    return {
      serviceAccount: agent.username,
      serviceName: agent.serviceName,
      authenticated: true,
      environment: process.env.NODE_ENV || 'development',
      permissions: agent.scopes,
      user: agent.user
        ? {
            id: agent.user.id,
            name: agent.user.name,
            username: agent.user.username,
            accountType: agent.user.accountType,
          }
        : null,
    };
  }

  // 🔥 LIST ALL AGENTS
  async findAll() {
    const agents = await this.agentRepository.find({
      relations: {
        user: true,
      },
    });

    return agents.map((agent) => ({
      id: agent.id,
      username: agent.username,
      serviceName: agent.serviceName,
      isActive: agent.isActive,
      scopes: agent.scopes,
      user: agent.user
        ? {
            id: agent.user.id,
            name: agent.user.name,
            username: agent.user.username,
            accountType: agent.user.accountType,
          }
        : null,
    }));
  }

  // keep for login
  async findByUsername(username: string) {
    return this.agentRepository.findOne({
      where: { username },
    });
  }
}