import { ActionFunction } from "@remix-run/node";
import { Form, Link, redirect } from "@remix-run/react";
import { createUser } from "prisma/user";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
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
  return (
    <Form method="post">
      <Label htmlFor="firstName">First Name</Label>
      <Input type="text" name="firstName" />

      <Label htmlFor="lastName">Last Name</Label>
      <Input type="text" name="lastName" />

      <Label htmlFor="email">Email</Label>
      <Input type="email" name="email" />

      <Label htmlFor="dob">Date of Birth</Label>
      <Input type="date" name="dob" />

      <Button type="submit">Submit</Button>
      <Button type="reset">Reset</Button>
      <Link to="/users">Cancel</Link>
    </Form>
  );
}
