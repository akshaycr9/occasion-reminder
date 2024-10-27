import { User } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react";
import { getUserById, updateUser } from "prisma/user";
import UserForm from "~/components/UserForm";

export const loader: LoaderFunction = async ({ params }) => {
  const user = await getUserById(Number(params.userId));
  return json(user);
};

export const action: LoaderFunction = async ({ request, params }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as unknown as Omit<
      User,
      "id" | "createdAt" | "updatedAt"
    >;

    await updateUser(Number(params.userId), data);
    return redirect(`/users/${params.userId}`);
  } catch (error) {
    console.error(error);
  }
};

export default function EditUser() {
  const user = useLoaderData<typeof loader>();

  return <UserForm user={user} />;
}
