import { PrismaClient } from "@prisma/client";
import { sendBirthdayEmail } from "../mailer/birthday.js";

export const sendBirthdayEmails = async () => {
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();

    const today = new Date();
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
    const currentDay = String(today.getDate()).padStart(2, '0');

    const users = await prisma.user.findMany({
      where: {
        dob: {
          endsWith: `-${currentMonth}-${currentDay}`
        }
      }
    });

    if(users.length) {
      await Promise.all(users.map(user => sendBirthdayEmail(user.email, `${user.firstName} ${user.lastName}`)));
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};
