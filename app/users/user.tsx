import { LoaderFunction, LoaderFunctionArgs } from "react-router";
import { Form, Link, redirect } from "react-router";
import { deleteUser, getUserById } from "prisma/user";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { Route } from "./+types/user";
import { User } from "~/interface/user.interface";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const user = await getUserById(Number(params.userId));
  return user;
};

export const action = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const userId = Number(formData.get("userId"));
  await deleteUser(userId);
  return redirect("/users");
};

export default function UserData({ loaderData }: Route.ComponentProps) {
  const { firstName, lastName, email, dob, id } = loaderData as unknown as User;

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Name:</strong> {firstName} {lastName}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Date of Birth:</strong>{" "}
          {new Date(dob).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="flex gap-2">
          <Link to={`/users/${id}/edit`}>
            <Button type="button">Edit</Button>
          </Link>
          <Form method="post">
            <input type="hidden" name="userId" value={id} />
            <Button type="submit">Delete</Button>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
