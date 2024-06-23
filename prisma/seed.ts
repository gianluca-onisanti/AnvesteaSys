import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.foo.upsert({
        where: {
            foo_name: 'Foo Fighter'
        },
        update: {},
        create: {
            foo_name: 'Foo Fighter',
            foo_address: 'Mr. Foo-fee, 321',
        },
    })
    console.log({user})
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })