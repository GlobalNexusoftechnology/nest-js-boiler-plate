import { UserBaseModifiedEntity } from 'src/packages/core/base-entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum AuthProvider {
  PHONE = 'phone',
  GOOGLE = 'google',
}

@Entity('users')
export class Users extends UserBaseModifiedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 15, unique: true, nullable: true })
  phone_number?: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  password?: string;

  @Column({ type: 'uuid' })
  role_id: string;

  @Column({ type: 'text', unique: true, nullable: true })
  refresh_token?: string;

  @Column({ type: 'enum', enum: AuthProvider, default: AuthProvider.PHONE })
  auth_provider: AuthProvider;

  @Column({ type: 'boolean', default: false })
  is_verified: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profile_photo?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  full_name?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  profession?: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  company?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  short_bio?: string;

  @Column({ type: 'text', nullable: true })
  about?: string;

  @Column({ type: 'simple-array', nullable: true })
  skills?: string;

  @Column({ type: 'text', nullable: true })
  experience?: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  location?: string;
}
