import { User } from "@prisma/client";
import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, Link, useLoaderData } from "@remix-run/react";
import { getUserById } from "prisma/user";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const user = await getUserById(Number(params.userId));
  return json(user);
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
      </div>
    </div>
  );
}
