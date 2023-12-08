import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {Prisma} from '@prisma/client';
import * as bcrypt from 'bcrypt'
import {paginate} from "../helpers/paginate";
import * as fs from 'fs';
import {promisify} from 'util';

const unlinkAsync = promisify(fs.unlink);

@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService,
    ) {
    }

    async create(createUserDto: Prisma.UserCreateInput & { roles: number[] }): Promise<any> {
        const {email} = createUserDto;
        const user = await this.prismaService.user.findUnique({
            where: {email},
        });
        if (user)
            throw new HttpException("L'utilisateur existe déjà", HttpStatus.CONFLICT);
        try {
            const password: string = 'admin1234';
            const hash = await this.hashPassword(password)
            await this.prismaService.user.create({
                data: {
                    ...createUserDto,
                    password: hash,
                    roles: {
                        connect: createUserDto.roles.map((id) => ({
                            id
                        }))
                    }
                },
            })
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

    async register(registerDto: Prisma.UserCreateInput): Promise<any> {
        const email: string = registerDto.email as string
        const password: string = registerDto.password as string
        const hash = await this.hashPassword(password)
        const user = await this.prismaService.user.findUnique({
            where: {email},
        });
        if (user)
            throw new HttpException("L'utilisateur existe déjà", HttpStatus.CONFLICT);
        await this.prismaService.user.create({
            data: {
                ...registerDto,
                password: hash,
                roles: {
                    connect: {
                        name: 'USER'
                    }
                }
            },
        })
        return {
            statusCode: HttpStatus.CREATED,
            message: "L'inscription est réussie",
        };
    }

    async findAll(page: number): Promise<any> {
        const {offset, limit} = paginate(page, 12)
        const users = await this.prismaService.user.findMany({
            skip: offset,
            take: limit,
            include: {
                roles: true
            },
        })
        return {
            statusCode: HttpStatus.OK,
            data: users,
        };
    }

    async findById(id: number): Promise<any> {
        const user = await this.prismaService.user.findUnique({
            where: {id},
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

    async findOrCreate(email: string, name: string): Promise<any> {
        const user = await this.prismaService.user.findUnique({
            where: {email}
        })
        if (user) {
            return {
                statusCode: HttpStatus.OK,
                data: user
            };
        } else {
            await this.prismaService.user.create({
                data: {
                    email,
                    name,
                    roles: {
                        connect: {
                            id: 3
                        }
                    }
                }
            })
        }
    }

    async findByEmail(email: string): Promise<any> {
        const user = await this.prismaService.user.findUnique({
            where: {email},
            include: {
                roles: true
            }
        })
        if (!user) throw new HttpException("L'utilisateur n'a pas été trouvé", HttpStatus.NOT_FOUND);
        return user;
    }

    async update(id: number, updateUserDto: Prisma.UserUpdateInput): Promise<any> {
        try {
            await this.prismaService.user.update({
                where: {id},
                data: updateUserDto
            })
        } catch {
            throw new HttpException('Rôles non valides', HttpStatus.BAD_REQUEST);
        }
        return {
            statusCode: HttpStatus.OK,
            message: "Mise à jour de l'utilisateur réussie",
        };
    }


    async remove(id: number): Promise<any> {
        const user = await this.prismaService.user.findUnique({
            where: {id},
        })
        if (!user) throw new HttpException("L'utilisateur n'a pas été trouvé", HttpStatus.NOT_FOUND);
        await this.prismaService.user.delete({
            where: {id},
        });
        return {
            statusCode: HttpStatus.OK,
            message: "L'utilisateur est supprimé avec succès",
        };
    }


    async uploadImage(id: number, image: Express.Multer.File): Promise<any> {
        const user = await this.prismaService.user.findUnique({
            where: {id}
        })
        if (user.profile) {
            await unlinkAsync(`./uploads/${user.profile}`);
        }
        await this.prismaService.user.update({
            where: {id},
            data: {
                ...user,
                profile: image.filename
            }
        })
        return {
            statusCode: HttpStatus.CREATED,
            message: "L'upload a réussi",
        };
    }


    async deleteImage(id: number): Promise<any> {
        const user = await this.prismaService.user.findUnique({
            where: {id}
        })
        if (!user) throw new NotFoundException("L'utilisateur n'existe pas");
        await unlinkAsync(`./uploads/${user.profile}`);
        await this.prismaService.user.update({
            where: {id},
            data: {
                ...user,
                profile: null,
            }
        })
        return {
            statusCode: HttpStatus.OK,
            message: "L'image a été suppimé",
        };
    }

}
