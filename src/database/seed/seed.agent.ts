import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../../modules/users/entities/users.entity';
import { Agent } from '../../modules/agent/entities/agent.entity';
import { TransferCase } from '../../modules/transfer/entities/transfer.entity';

export async function seedUserAndAgents(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const agentRepo = dataSource.getRepository(Agent);
  const transferRepo = dataSource.getRepository(TransferCase);

  // =========================
  // 1. SEED USER (IDEMPOTENT)
  // =========================
  let user = await userRepo.findOne({
    where: { username: 'openclaw-system' },
  });

  if (!user) {
    const hashedPassword = await bcrypt.hash('OpenClaw@123', 10);

    user = await userRepo.save(
      userRepo.create({
        name: 'OpenClaw System User',
        username: 'openclaw-system',
        password: hashedPassword,
        accountType: 'SERVICE',
        scopes: 'transfer.read,workitem.create',
        isActive: true,
      }),
    );

    console.log('✅ User created');
  } else {
    console.log('⚠️ User already exists');
  }

  // =========================
  // 2. SEED AGENTS (ONLY ONCE)
  // =========================
  const existingAgents = await agentRepo.count();

  if (existingAgents === 0) {
    const basePassword = await bcrypt.hash('OpenClaw@123', 10);

    const agents: Partial<Agent>[] = [
      {
        username: 'openclaw-or-registry',
        password: basePassword,
        serviceName: 'OpenClaw Registry Service',
        isActive: true,
        scopes: ['transfer.read', 'workitem.create'],
        userId: user.id,
      },
      {
        username: 'openclaw-audit-service',
        password: basePassword,
        serviceName: 'Audit Logging Service',
        isActive: true,
        scopes: ['transfer.read'],
        userId: user.id,
      },
      {
        username: 'openclaw-transfer-reader',
        password: basePassword,
        serviceName: 'Transfer Reader Service',
        isActive: true,
        scopes: ['transfer.read'],
        userId: user.id,
      },
      {
        username: 'openclaw-workitem-service',
        password: basePassword,
        serviceName: 'Work Item Service',
        isActive: true,
        scopes: ['workitem.create'],
        userId: user.id,
      },
      {
        username: 'openclaw-kyc-processor',
        password: basePassword,
        serviceName: 'KYC Processing Service',
        isActive: true,
        scopes: ['transfer.read'],
        userId: user.id,
      },
      {
        username: 'openclaw-compliance-engine',
        password: basePassword,
        serviceName: 'Compliance Engine',
        isActive: true,
        scopes: ['transfer.read'],
        userId: user.id,
      },
      {
        username: 'openclaw-risk-analyzer',
        password: basePassword,
        serviceName: 'Risk Analysis Service',
        isActive: true,
        scopes: ['transfer.read', 'workitem.create'],
        userId: user.id,
      },
      {
        username: 'openclaw-support-bot',
        password: basePassword,
        serviceName: 'Support Automation Bot',
        isActive: true,
        scopes: ['workitem.create'],
        userId: user.id,
      },
      {
        username: 'openclaw-reporting-service',
        password: basePassword,
        serviceName: 'Reporting Service',
        isActive: true,
        scopes: ['transfer.read'],
        userId: user.id,
      },
      {
        username: 'openclaw-internal-admin',
        password: basePassword,
        serviceName: 'Internal Admin Service',
        isActive: true,
        scopes: ['transfer.read', 'workitem.create'],
        userId: user.id,
      },
    ];

    await agentRepo.save(agents);
    console.log('🔥 Agents seeded successfully');
  } else {
    console.log('⚠️ Agents already exist, skipping seed');
  }

  // =========================
  // 3. SEED TRANSFER CASES (NEW)
  // =========================
  const existingTransfers = await transferRepo.count();

  if (existingTransfers === 0) {
    const transfers: Partial<TransferCase>[] = [
      {
        id: 1,
        investorName: 'Ali Raza',
        email: 'ali.raza@gmail.com',
        phone: '+92-300-1234567',
        passportNumber: 'PAK1234567',
        cnic: '35202-1234567-1',
        bankAccount: 'PK12HBL000123456789',
        amount: 5000,
        currency: 'USD',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        investorName: 'Sarah Khan',
        email: 'sarah.khan@gmail.com',
        phone: '+92-301-7654321',
        passportNumber: 'PAK9876543',
        cnic: '35202-9876543-2',
        bankAccount: 'PK12UBL000987654321',
        amount: 12000,
        currency: 'USD',
        status: 'APPROVED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        investorName: 'John Smith',
        email: 'john.smith@gmail.com',
        phone: '+1-555-000111',
        passportNumber: 'US99887766',
        cnic: 'N/A',
        bankAccount: 'US12CHASE000112233',
        amount: 7500,
        currency: 'USD',
        status: 'REJECTED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        investorName: 'Emma Watson',
        email: 'emma.watson@gmail.com',
        phone: '+44-7700-900123',
        passportNumber: 'UK55667788',
        cnic: 'N/A',
        bankAccount: 'UK12HSBC000445566',
        amount: 20000,
        currency: 'USD',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        investorName: 'David Miller',
        email: 'david.miller@gmail.com',
        phone: '+1-222-333444',
        passportNumber: 'US11223344',
        cnic: 'N/A',
        bankAccount: 'US12BOA000778899',
        amount: 9800,
        currency: 'USD',
        status: 'APPROVED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await transferRepo.save(transfers);
    console.log('💰 5 Transfer cases seeded successfully');
  } else {
    console.log('⚠️ Transfer cases already exist, skipping seed');
  }
}