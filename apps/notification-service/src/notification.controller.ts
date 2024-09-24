import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern({ cmd: 'user-registration-notification' })
  async handleUserRegistration(
    @Payload() data: { email: string; username: string },
  ) {
    return this.notificationService.sendUserRegistrationEmail(
      data.email,
      data.username,
    );
  }

  @MessagePattern({ cmd: 'order-confirmation-notification' })
  async handleOrderConfirmation(
    @Payload() data: { email: string; orderId: string },
  ) {
    return this.notificationService.sendOrderConfirmationEmail(
      data.email,
      data.orderId,
    );
  }

  @MessagePattern({ cmd: 'shopping-update-notification' })
  async handleShoppingUpdate(
    @Payload() data: { email: string; updateDetails: string },
  ) {
    return this.notificationService.sendShoppingUpdateEmail(
      data.email,
      data.updateDetails,
    );
  }
}
