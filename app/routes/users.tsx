import { LoaderFunction } from "@remix-run/node";
import {
  Link,
  MetaFunction,
  Outlet,
  useLoaderData,
  NavLink,
  Form,
} from "@remix-run/react";
import { getAllUsers } from "prisma/user";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { User } from "~/interface/user.interface";

export const meta: MetaFunction = () => {
  return [
    { title: "Occasion Reminder - Users" },
    { name: "description", content: "User List" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const users = await getAllUsers(q as string);
  return { users, q };
};

export default function Users() {
  const { users, q } = useLoaderData<typeof loader>() as {
    users: User[];
    q: string;
  };

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <aside className="w-96 h-full">
        <div className="flex gap-4 p-4">
          <Form role="search" id="search-form">
            <Input
              placeholder="Search"
              type="search"
              name="q"
              id="q"
              defaultValue={q || ""}
            />
          </Form>
          <Link to="/users/create">
            <Button>Add User</Button>
          </Link>
        </div>
        <Separator />
        <ScrollArea className="h-full p-4">
          <ul className="flex flex-col gap-4">
            {users.map((user) => (
              <li key={user.id}>
                <NavLink
                  to={`/users/${user.id}`}
                  key={user.id}
                  className={({ isActive }) =>
                    isActive ? "font-bold" : "font-normal"
                  }
                >
                  {user.firstName} {user.lastName}
                </NavLink>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </aside>
      <Separator orientation="vertical" />
      <section className="flex-1 h-full">
        <Outlet />
      </section>
    </div>
  );
}
