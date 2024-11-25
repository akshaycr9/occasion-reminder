import { NavLink } from "react-router";
import { User } from "~/interface/user.interface";

export default function UserList({ users }: { users: User[] }) {
  if (users.length === 0) {
    return <p className="text-center">No users found</p>;
  }

  return (
    <ul className="flex flex-col gap-2 h-full overflow-y-auto py-2">
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
