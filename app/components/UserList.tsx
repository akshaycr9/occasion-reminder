import { Link } from "@remix-run/react";
import { User } from "~/interface/user.interface";

export default function UserList({ users }: { users: User[] }) {
  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li key={user.id}>
          <Link
            to={`/users/${user.id}`}
            className="block p-2 hover:bg-gray-100 rounded"
          >
            {user.firstName} {user.lastName}
          </Link>
        </li>
      ))}
    </ul>
  );
}
