import { PrismaClient } from '@prisma/client';
import { fa, faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    await prisma.role.createMany({
        data: [
            {
                name: 'CURATOR',
            },
            {
                name: 'EXPLORATOR',
            },
            {
                name: 'USER',
            },
        ],
    });

    await prisma.user.create({
        data: {
            name: "Admin",
            email: 'admin@admin.com',
            password: await bcrypt.hash('admin', 10),
            phoneNumber: '+243999999999',
            address: faker.location.streetAddress(),
            roles: {
                connect: {
                    id: 1
                },
            }
        },
    });

    for (let i = 1; i < 31; i++) {
        await prisma.thematic.create({
            data: {
                name: faker.company.buzzPhrase(),
            }
        })
    }

    for (let i = 1; i < 5; i++) {
        await prisma.call.create({
            data: {
                name: faker.commerce.productName(),
                description: faker.lorem.paragraph(),
                thematics: {
                    connect: {
                        id: faker.number.int({ min: 1, max: 17 })
                    }
                }
            }
        })
    }

    for (let i = 1; i < 18; i++) {
        await prisma.goal.create({
            data: {
                name: faker.company.buzzPhrase(),
            }
        })
    }

}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });