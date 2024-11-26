import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "react-router";
import "./tailwind.css";
import { Navbar } from "./components/Navbar";
import { getSession } from "./modules/auth/session.server";
import { User } from "./interface/user.interface";
import type { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap",
  },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const signedInUser = session.get("user");
  return { user: signedInUser };
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-plus-jakarta-sans">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  const matches = useMatches();
  const hideNavbarRoutes = ["/login", "/verify"];

  const showNavbar = !matches.some((match) =>
    hideNavbarRoutes.includes(match.pathname)
  );

  const { user } = loaderData as { user: User | undefined };

  return (
    <div className="h-screen w-screen flex flex-col gap-2">
      {showNavbar && <Navbar user={user} />}
      <Outlet />
    </div>
  );
}
