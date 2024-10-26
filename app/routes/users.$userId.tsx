import { User } from "@prisma/client";
import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, Link, redirect, useLoaderData } from "@remix-run/react";
import { deleteUser, getUserById } from "prisma/user";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const user = await getUserById(Number(params.userId));
  return json(user);
};

export const action = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const id = Number(formData.get("id"));
  await deleteUser(id);
  return redirect(`/users`);
};
export default function UserData() {
  const { id, firstName, lastName, email, dob } = useLoaderData<User>();

  return (
    <div>
      <h1>User Details</h1>
      <div>
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <p>Email: {email}</p>
        <p>
          DOB:{" "}
          {new Date(dob).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div>
        <Link to={`/users/${id}/edit`}>Edit</Link>
        <Form
          method="post"
          onSubmit={(event) => {
            const response = confirm(
              "Are you sure you want to delete this user?"
            );
            if (!response) {
              event.preventDefault();
            }
          }}
        >
          <input type="hidden" name="id" value={id} />
          <button type="submit">Delete</button>
        </Form>
      </div>
    </div>
  );
}
