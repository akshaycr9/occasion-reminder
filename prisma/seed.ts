const { PrismaClient } = require("@prisma/client")

const seeds = [
    {
        firstName: 'Cristiano',
        lastName: 'Ronaldo',
        email: 'cristiano@cr7.com',
        dob: '1985-02-05'
    },
    {
        firstName: 'Wayne',
        lastName: 'Rooney',
        email: 'wayne@rooney.com',
        dob: '1985-11-23'
    },
    {
        firstName: 'Lionel',
        lastName: 'Messi',
        email: 'lionel@messi.com',
        dob: '1987-06-24'
    }
]

async function seedData() {
    const prisma = new PrismaClient();

    try {
        for (const data of seeds) {
            await prisma.user.create({
                data
            })
        }
    }catch (error) {
        console.error("Error in seeding data", error);
    }finally{
        await prisma.$disconnect();
    }
}

seedData();