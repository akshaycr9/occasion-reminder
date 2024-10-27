import { User } from "~/interface/user.interface";
import { prisma } from "~/lib/db.server";

export const getAllUsers = async (q?: string) => {
    return await prisma.user.findMany({
        where: {
            OR: [
                {firstName: {contains: q}},
                {lastName: {contains: q}}
            ]
        },
        select: {
            id: true,
            firstName: true,
            lastName: true
        }
    })
}

export const getUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: {
            id
        }
    });
}

export const createUser = async (user: Omit<User, "id">) => await prisma.user.create({data: user});

export const updateUser = async(userId: number, user: Omit<User, "id" | "createdAt" | "updatedAt">) => await prisma.user.update({
    where: {
        id: userId
    },
    data: user
})

export const deleteUser = async (userId: number) => await prisma.user.delete({
    where: {
        id: userId
    }
})