import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
export declare class NotificationsService {
    private mailService;
    private configService;
    constructor(mailService: MailerService, configService: ConfigService);
    welcome({ payload }: {
        payload: any;
    }): Promise<void>;
    passwordReset({ payload }: {
        payload: any;
    }): Promise<void>;
}
