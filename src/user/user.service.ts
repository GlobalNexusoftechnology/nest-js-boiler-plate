import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...rest } = createUserDto;
      const hashPassword = await bcrypt.hash(password, 10);

      const record = this.userRepository.create({
        ...rest,
        password: hashPassword,
      });
      record.created_on = Math.floor(Date.now() / 1000);
      return await this.userRepository.save(record);
    } catch (error) {
      console.log('[Create User]:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.userRepository.find({
      where: {
        deleted: false,
      },
    });
  }

  async findOne(phone_number: string) {
    return await this.userRepository.findOne({
      where: {
        phone_number,
        deleted: false,
      },
    });
  }

  async findById(id: string) {
    return this.userRepository.findOne({ where: { id, deleted: false } });
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.findById(id);
    if (!user) throw new BadRequestException('User does not exist');

    const updateData: any = { ...dto };

    if (dto.skills) {
      updateData.skills = dto.skills.join(',');
    }

    updateData.modified_on = Math.floor(Date.now() / 1000);

    await this.userRepository.update(id, updateData);

    return { message: 'User updated successfully' };
  }

  async remove(id: string) {
    return await this.userRepository.update(id, { deleted: true });
  }
}
