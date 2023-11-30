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
            name: "Berry Numbi",
            email: 'BerryN@lunnovel.org',
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