import { AppDataSource } from 'src/data-source';
import { seedUsers } from './seed-users';
import { seedRoles } from './seed-roles';

async function runSeeds() {
  try {
    console.log('🔹 Initializing database connection...');
    await AppDataSource.initialize();

    console.log('🔹 Seeding roles...');
    await seedRoles();

    console.log('🔹 Seeding users...');
    await seedUsers();

    console.log('✅ All seeds completed successfully');
  } catch (err) {
    console.error('❌ Seeding failed', err);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
    console.log('🔹 Database connection closed');
  }
}

runSeeds();
