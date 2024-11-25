import { Form, Link } from "react-router";
import { User } from "~/interface/user.interface";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

export const Navbar = ({ user }: { user: User | undefined }) => {
  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : "";
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      {/* Styled Home Link with a distinct design */}
      <Link
        to="/"
        className="px-5 py-2 text-xl font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
      >
        Home
      </Link>

      {/* Menu Items */}
      <div className="flex items-center space-x-4">
        {/* Styled Users Link */}
        <Link
          to="/users"
          className="px-4 py-2 rounded-md text-lg font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200"
        >
          Users
        </Link>

        {/* Account Dropdown with Initials Button */}
        {user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full bg-gray-200 text-black w-10 h-10 flex items-center justify-center font-bold"
              >
                {initials}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end">
              <Form method="post" action="/logout">
                <Button
                  className="block px-4 py-2 text-sm border-none shadow-none bg-white text-red-600 hover:bg-gray-100"
                  type="submit"
                >
                  Logout
                </Button>
              </Form>
            </PopoverContent>
          </Popover>
        ) : (
          <Link to="/login" className="text-lg font-medium">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
