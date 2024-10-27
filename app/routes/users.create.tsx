import { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { createUser } from "prisma/user";
import UserForm from "~/components/UserForm";
import { User } from "~/interface/user.interface";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  try {
    let data = Object.fromEntries(formData) as unknown as Omit<User, "id">;
    const user = await createUser(data);
    return redirect(`/users/${user.id}`);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function CreateUser() {
  return <UserForm />;
}
