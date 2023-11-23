import { UsersService } from '../users/users.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { SerializedUser } from '../types/serialized-user';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
export declare class PasswordService {
    private readonly userService;
    private readonly eventEmitter;
    constructor(userService: UsersService, eventEmitter: EventEmitter2);
    updatePassword(currentUser: SerializedUser, updatePasswordDto: UpdatePasswordDto): Promise<any>;
    resetPasswordRequest(resetPasswordRequestDto: ResetPasswordRequestDto): Promise<any>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<any>;
}
