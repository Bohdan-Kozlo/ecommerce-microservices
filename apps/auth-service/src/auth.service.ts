import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entitys/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async createUser(userDto: any) {
    const existingUser = await this.userRepository.findOne({
      where: { email: userDto.email },
    });
    if (existingUser) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = this.userRepository.create({
      ...userDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async getUser(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
