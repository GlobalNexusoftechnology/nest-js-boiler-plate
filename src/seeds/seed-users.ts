import { AuthProvider, Users } from 'src/user/entities/user.entity';
import { AppDataSource } from '../data-source';
import { Roles } from '../roles/entities/roles.entity';

export async function seedUsers() {
  const now = Math.floor(Date.now() / 1000);
  const roleRepo = AppDataSource.getRepository(Roles);
  const userRepo = AppDataSource.getRepository(Users);

  const adminRole = await roleRepo.findOne({ where: { name: 'admin' } });
  const userRole = await roleRepo.findOne({ where: { name: 'user' } });

  if (!adminRole || !userRole) {
    throw new Error('Required roles not found. Run seedRoles first.');
  }

  const users = [
    {
      username: 'admin',
      email: 'admin@business-talk.com',
      password: 'admin123',
      role_id: adminRole.id,
      auth_provider: AuthProvider.PHONE,
      is_verified: true,
      created_on: now,
      deleted: false,
    },
    {
      username: 'user',
      email: 'user@business-talk.com',
      password: 'user123',
      role_id: userRole.id,
      auth_provider: AuthProvider.PHONE,
      is_verified: true,
      created_on: now,
      deleted: false,
    },
  ];

  for (const u of users) {
    const exists = await userRepo.findOne({ where: { username: u.username } });
    if (!exists) {
      await userRepo.save(userRepo.create(u));
      console.log(`✅ User ${u.username} inserted`);
    } else {
      console.log(`ℹ️ User ${u.username} already exists, skipped`);
    }
  }
}
