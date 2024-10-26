import { User } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import {
  Form,
  json,
  redirect,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { getUserById, updateUser } from "prisma/user";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

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
  const navigate = useNavigate();

  return (
    <Form method="post">
      <Label htmlFor="firstName">First Name</Label>
      <Input type="text" name="firstName" defaultValue={user.firstName} />

      <Label htmlFor="lastName">Last Name</Label>
      <Input type="text" name="lastName" defaultValue={user.lastName} />

      <Label htmlFor="email">Email</Label>
      <Input type="email" name="email" defaultValue={user.email} />

      <Label htmlFor="dob">Date of Birth</Label>
      <Input type="date" name="dob" defaultValue={user.dob} />
      <Button type="submit">Submit</Button>

      <Button type="button" onClick={() => navigate(-1)}>
        Cancel
      </Button>
    </Form>
  );
}
