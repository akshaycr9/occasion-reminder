import { User } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { json, redirect, useActionData, useLoaderData } from "@remix-run/react";
import { getUserById, updateUser } from "prisma/user";
import { z } from "zod";
import UserForm from "~/components/UserForm";

export const loader: LoaderFunction = async ({ params }) => {
  const user = await getUserById(Number(params.userId));
  return json(user);
};

const UserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  dob: z.string().date(),
});

export const action: LoaderFunction = async ({ request, params }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const parsed = UserSchema.safeParse(data);
    if (!parsed.success) {
      return json({ error: parsed.error?.flatten().fieldErrors });
    }
    const parsedData = parsed.data;

    await updateUser(Number(params.userId), parsedData);
    return redirect(`/users/${params.userId}`);
  } catch (error) {
    console.error(error);
  }
};

export default function EditUser() {
  const user = useLoaderData<typeof loader>();
  const data =
    (useActionData<typeof action>() as {
      error: Record<keyof User, string[]>;
    }) || null;

  return <UserForm user={user} data={data} />;
}
