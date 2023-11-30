import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { randomPassword } from '../helpers/random-password';
import { EmailPayload } from '../types/email-payload';
import { PrismaService } from "../database/prisma.service";
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly eventEmitter: EventEmitter2,
    ) { }

    async create(createUserDto: Prisma.UserCreateInput): Promise<any> {
        const { email } = createUserDto;
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });
        if (user)
            throw new HttpException("L'utilisateur existe déjà", HttpStatus.CONFLICT);
        try {
            const password: string = randomPassword();
            const hash = await this.hashPassword(password)
            await this.prismaService.user.create({
                data: {
                    ...createUserDto,
                    password: hash,
                },
            })
            const payload: EmailPayload = { email, password };
            this.eventEmitter.emit('user.created', { payload });
        } catch {
            throw new HttpException('Mauvaise demande, essayez à nouveau', HttpStatus.BAD_REQUEST);
        }
        return {
            statusCode: HttpStatus.CREATED,
            message: "L'utilisateur a été ajouté avec succès",
        };
    }

    async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    }

    async registerWithGoogle(registerDto: { name: string, email: string }): Promise<any> {
        await this.prismaService.user.create({
            data: {
                name: registerDto.name,
                email: registerDto.email,
            },
        })
        return {
            statusCode: HttpStatus.CREATED,
            message: "L'inscription est réussie",
        };
    }


    async register(registerDto: Prisma.UserCreateInput): Promise<any> {
        const email: string = registerDto.email as string
        const password: string = registerDto.password as string
        const hash = await this.hashPassword(password)
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });
        if (user)
            throw new HttpException("L'utilisateur existe déjà", HttpStatus.CONFLICT);
        await this.prismaService.user.create({
            data: {
                ...registerDto,
                password: hash,
                roles: {
                    connect: {
                        id: 3
                    }
                }
            },
        })
        return {
            statusCode: HttpStatus.CREATED,
            message: "L'inscription est réussie",
        };
    }

    async findAll(): Promise<any> {
        const users = await this.prismaService.user.findMany({
            select: {
                id: true,
                email: true,
                phoneNumber: true,
                address: true,
                name: true,
            },
        })
        return {
            statusCode: HttpStatus.OK,
            data: users,
        };
    }

    async findById(id: number): Promise<any> {
        const user = await this.prismaService.user.findUnique({
            where: { id },
            include: {
                roles: {
                    select: {
                        name: true,
                    },
                },
            },
        })
        if (!user) throw new HttpException("L'utilisateur n'a pas été trouvé", HttpStatus.NOT_FOUND);
        return {
            statusCode: HttpStatus.OK,
            data: user,
        };
    }

    async findByEmail(email: string): Promise<any> {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        })
        if (!user) throw new HttpException("L'utilisateur n'a pas été trouvé", HttpStatus.NOT_FOUND);
        return user;
    }

    async update(id: number, updateUserDto: Prisma.UserUpdateInput): Promise<any> {
        const user = await this.prismaService.user.findUnique({
            where: { id },
        })
        if (!user) throw new HttpException("L'utilisateur n'a pas été trouvé", HttpStatus.NOT_FOUND);
        const updatedUser = Object.assign(user, updateUserDto);
        try {
            await this.prismaService.user.update({
                where: { id },
                data: updatedUser
            })
        } catch {
            throw new HttpException('Rôles non valides', HttpStatus.BAD_REQUEST);
        }
        return {
            statusCode: HttpStatus.OK,
            message: "Mise à jour de l'utilisateur réussie",
        };
    }

    async updatePassword(user: User, password: string): Promise<void> {
        user.password = password;
        await this.prismaService.user.update({
            data: user,
            where: { id: user.id },
        });
    }

    async saveResetToken(user: User, password: string): Promise<any> {
        user.resetToken = password;
        await this.prismaService.user.update({
            data: user,
            where: { id: user.id },
        });
    }

    async remove(id: number): Promise<any> {
        const user = await this.prismaService.user.findUnique({
            where: { id },
        })
        if (!user) throw new HttpException("L'utilisateur n'a pas été trouvé", HttpStatus.NOT_FOUND);
        await this.prismaService.user.delete({
            where: { id },
        });
        return {
            statusCode: HttpStatus.OK,
            message: "L'utilisateur est supprimé avec succès",
        };
    }

    async findByResetToken(resetToken: string) {
        const user = await this.prismaService.user.findFirst({
            where: { resetToken },
        })
        if (!user) throw new HttpException("L'utilisateur n'a pas été trouvé", HttpStatus.NOT_FOUND);
        return user;
    }

    async removeResetToken(user: any) {
        user.reset_token = null;
        await this.prismaService.user.update(user);
    }
}
