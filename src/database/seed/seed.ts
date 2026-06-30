import { DataSource } from 'typeorm';
import { seedUserAndAgents } from './seed.agent';
import { AppDataSource } from './data-source';


async function runSeeds()
 {
  try {
    console.log('🚀 Starting database seeds...');

    const dataSource: DataSource = await AppDataSource.initialize();

    await seedUserAndAgents(dataSource);

    await dataSource.destroy();

    console.log('✅ Seeding completed successfully');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

runSeeds();