import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'user_user',
      password: 'user_password',
      database: 'user_db',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth-service/.env',
    }),
    JwtModule.register({}),
    RmqModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthServiceModule {}
