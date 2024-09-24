import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'validate_user' })
  async validateUser(data: { email: string; password: string }) {
    console.log(data);
    return this.authService.validateUser(data.email, data.password);
  }

  @MessagePattern({ cmd: 'create_user' })
  async createEmail(data: any) {
    console.log(data);
    return this.authService.createUser(data);
  }

  @MessagePattern({ cmd: 'get_user' })
  async getUserById(@Payload() id: number) {
    return this.authService.getUser(id);
  }
}
