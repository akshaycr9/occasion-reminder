import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { User } from "~/interface/user.interface";
import { authenticator } from "~/modules/auth/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Occasion Reminder" },
    { name: "description", content: "Occasion Reminder" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return session as User;
}

export default function Index() {
  const user = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to Occasion Reminders
          </h1>
          <p>You are currently logged in as: {user.email}</p>
          <Form method="post" action="/logout">
            <Button type="submit">Logout</Button>
          </Form>
          <Link to="/users">Users</Link>
        </header>
      </div>
    </div>
  );
}
