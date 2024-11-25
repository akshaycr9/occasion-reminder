import { ActionFunction } from "react-router";
import { redirect, useActionData } from "react-router";
import { createUser } from "prisma/user";
import UserForm from "~/components/UserForm";
import { User } from "~/interface/user.interface";
import { z } from "zod";

const UserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  dob: z.string().date(),
});

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    let data = Object.fromEntries(formData);
    const parsed = UserSchema.safeParse(data);
    if (!parsed.success) {
      return { error: parsed.error?.flatten().fieldErrors };
    }

    const parsedData = parsed.data;
    const user = await createUser(parsedData);
    return redirect(`/users/${user.id}`);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function CreateUser() {
  const data =
    (useActionData<typeof action>() as {
      error: Record<keyof User, string[]>;
    }) || null;

  return <UserForm data={data} />;
}
