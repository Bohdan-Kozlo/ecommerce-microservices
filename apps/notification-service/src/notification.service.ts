import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationService {
  constructor(private mailerService: MailerService) {}

  async sendUserRegistrationEmail(to: string, username: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Welcome to Our Platform!',
        template: './user-registration',
        context: {
          username,
        },
      });
    } catch (e) {
      console.error(`Failed to send user registration email to ${to}`, e);
      return null;
    }
  }

  async sendOrderConfirmationEmail(to: string, orderId: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Order Confirmation',
        template: './order-confirmation',
        context: {
          orderId,
        },
      });
    } catch (e) {
      console.error(`Failed to send order confirmation email to ${to}`, e);
      return null;
    }
  }

  async sendShoppingUpdateEmail(to: string, updateDetails: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Shopping Update',
        template: './shopping-update',
        context: {
          updateDetails,
        },
      });
    } catch (e) {
      console.error(`Failed to send shopping update email to ${to}`, e);
      return null;
    }
  }
}
