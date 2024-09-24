import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    JwtModule.register({}),
    RmqModule.register({
      name: 'USER',
    }),
    RmqModule.register({
      name: 'NOTIFICATION',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
