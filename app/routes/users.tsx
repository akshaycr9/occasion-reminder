import { LoaderFunction } from "@remix-run/node";
import {
  Link,
  MetaFunction,
  Outlet,
  useLoaderData,
  json,
  Form,
  useSubmit,
  useLocation,
} from "@remix-run/react";
import { getAllUsers } from "prisma/user";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import UserList from "~/components/UserList";
import { useDebounce } from "~/hooks/useDebounce";
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
  const [query, setQuery] = useState(q);
  const [debouncedQuery, isDebouncing] = useDebounce(query, 500);

  const submit = useSubmit();
  const location = useLocation();

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  useEffect(() => {
    let searchParams = new URLSearchParams(location.search);
    if (debouncedQuery) {
      searchParams.set("q", debouncedQuery);
    } else {
      searchParams.delete("q");
    }
    submit(searchParams, { method: "get" });
  }, [debouncedQuery]);

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 p-4 border-r flex flex-col gap-4">
        <div className="flex gap-4 w-full items-start">
          <div className="w-full flex flex-col gap-1">
            <Input
              id="q"
              type="search"
              name="q"
              placeholder="Search users..."
              defaultValue={q || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
            />
            {isDebouncing && <span>Searching...</span>}
          </div>
          <Link to="/users/create">
            <Button>Add New User</Button>
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
