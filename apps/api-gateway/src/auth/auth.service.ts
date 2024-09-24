import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER') private userClient: ClientProxy,
    @Inject('NOTIFICATION') private notificationClient: ClientProxy,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(authData: AuthDto) {
    const user = await this.userClient
      .send(
        { cmd: 'validate_user' },
        { email: authData.email, password: authData.password },
      )
      .toPromise();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync(
      { userId: user.id, email: authData.email, isAdmin: user.isAdmin },
      {
        expiresIn: '60m',
        secret: this.configService.getOrThrow('JWT_SECRET'),
      },
    );

    return { accessToken };
  }

  async register(authData: CreateUserDto) {
    const user = await this.userClient
      .send({ cmd: 'create_user' }, authData)
      .toPromise();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync(
      { userId: user.id, email: authData.email, isAdmin: user.isAdmin },
      {
        expiresIn: '60m',
        secret: this.configService.getOrThrow('JWT_SECRET'),
      },
    );

    await firstValueFrom(
      this.notificationClient.send(
        { cmd: 'user-registration-notification' },
        authData,
      ),
    );

    return { accessToken };
  }
}
