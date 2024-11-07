import { User } from "~/interface/user.interface";
import { prisma } from "~/lib/db.server";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60 });

export const getAllUsers = async (q?: string) => {
  let users;
  if (!q) {
    if (cache.has("users")) {
      return cache.get("users");
    } else {
      users = await prisma.user.findMany();
      cache.set("users", users);
      cache.ttl("users", 60 * 60 * 24);
      return users;
    }
  } else {
    users = await prisma.user.findMany({
      where: {
        OR: [{ firstName: { contains: q } }, { lastName: { contains: q } }],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });
    return users;
  }
};

export const getUserById = async (id: number) => {
  if (cache.has(id)) {
    return cache.get(id);
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  cache.set(id, user);
  cache.ttl(id, 60 * 60 * 24);
  return user;
};

export const createUser = async (user: Omit<User, "id">) => {
  const newUser = await prisma.user.create({ data: user });
  cache.take("users");
  return newUser;
};

export const updateUser = async (
  userId: number,
  user: Omit<User, "id" | "createdAt" | "updatedAt">
) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: user,
  });
  cache.take(userId);
  return updatedUser;
};

export const deleteUser = async (userId: number) => {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  cache.take("users");
};

export const checkUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};
