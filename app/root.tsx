import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
} from "@remix-run/react";
import type {
  LinksFunction,
  LoaderFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";

import "./tailwind.css";
import { Navbar } from "./components/Navbar";
import { getSession } from "./modules/auth/session.server";
import { User } from "./interface/user.interface";

export const links: LinksFunction = () => [
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

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const signedInUser = session.get("user");
  return json({ user: signedInUser });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const matches = useMatches();
  const hideNavbarRoutes = ["/login", "/verify"];

  const showNavbar = !matches.some((match) =>
    hideNavbarRoutes.includes(match.pathname)
  );

  const { user } = useLoaderData<typeof loader>() as { user: User | undefined };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-plus-jakarta-sans">
        <div className="h-screen w-screen flex flex-col gap-2">
          {showNavbar && <Navbar user={user} />}
          {children}
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
