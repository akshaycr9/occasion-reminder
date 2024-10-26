import {PrismaClient} from "@prisma/client";
import { User } from "~/interface/user.interface";

const db = new PrismaClient();

export const getAllUsers = async (q?: string) => {
    let users = await db.user.findMany();
    if(q) {
        users = users.filter((user) => user.firstName.toLowerCase().includes(q.toLowerCase()) || user.lastName.toLowerCase().includes(q.toLowerCase()));
    }
    return users;
}

export const getUserById = async (id: number) => {
    return await db.user.findUnique({
        where: {
            id
        }
    });
}

export const createUser = async (user: Omit<User, "id">) => await db.user.create({data: user});

export const updateUser = async(userId: number, user: Omit<User, "id" | "createdAt" | "updatedAt">) => await db.user.update({
    where: {
        id: userId
    },
    data: user
})

export const deleteUser = async (userId: number) => await db.user.delete({
    where: {
        id: userId
    }
})