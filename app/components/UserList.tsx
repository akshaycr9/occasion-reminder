import { NavLink } from "@remix-run/react";
import { User } from "~/interface/user.interface";

export default function UserList({ users }: { users: User[] }) {
  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li key={user.id}>
          <NavLink
            to={`/users/${user.id}`}
            className={({ isActive }) => {
              return isActive
                ? "block p-2 bg-gray-400 rounded"
                : "block p-2 hover:bg-gray-100 rounded";
            }}
          >
            {user.firstName} {user.lastName}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
