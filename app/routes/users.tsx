import { LoaderFunction } from "@remix-run/node";
import { Link, MetaFunction, Outlet, useLoaderData } from "@remix-run/react";
import { getAllUsers } from "prisma/user";
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

export const loader: LoaderFunction = async () => {
  const users = await getAllUsers();
  return users;
};

export default function Users() {
  const users: User[] = useLoaderData();

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <aside className="w-96 h-full">
        <div className="flex gap-4 p-4">
          <Input placeholder="Search" type="search" name="search" />
          <Link to="/users/create">
            <Button>Add User</Button>
          </Link>
        </div>
        <Separator />
        <ScrollArea className="h-full p-4">
          <ul className="flex flex-col gap-4">
            {users.map((user) => (
              <li>
                <Link to={`/users/${user.id}`} key={user.id}>
                  {user.firstName} {user.lastName}
                </Link>
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
