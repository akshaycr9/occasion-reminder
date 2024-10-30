import { LoaderFunction } from "@remix-run/node";
import {
  Link,
  MetaFunction,
  Outlet,
  useLoaderData,
  json,
  Form,
  useSubmit,
} from "@remix-run/react";
import { getAllUsers } from "prisma/user";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import UserList from "~/components/UserList";
import { User } from "~/interface/user.interface";

export const meta: MetaFunction = () => {
  return [
    { title: "Occasion Reminder - Users" },
    { name: "description", content: "User List" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const users = await getAllUsers(q);
  return json({ users, q });
};

export default function Users() {
  const { users, q } = useLoaderData<typeof loader>() as {
    users: User[];
    q: string;
  };

  const submit = useSubmit();

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 p-4 border-r flex flex-col gap-4">
        <div className="flex gap-4 w-full items-center">
          <Form
            className="w-full"
            method="get"
            onChange={(e) => submit(e.currentTarget)}
          >
            <Input
              type="search"
              name="q"
              placeholder="Search users..."
              defaultValue={q || ""}
            />
          </Form>
          <Link to="/users/create">
            <Button className="">Add New User</Button>
          </Link>
        </div>
        <UserList users={users} />
      </aside>
      <main className="w-3/4 p-4">
        <Outlet />
      </main>
    </div>
  );
}
