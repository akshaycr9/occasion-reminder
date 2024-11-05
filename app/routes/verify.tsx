// app/routes/verify.tsx
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/modules/auth/auth.server";
import { getSession, commitSession } from "~/modules/auth/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

  const session = await getSession(request.headers.get("cookie"));
  const authEmail = session.get("auth:email");
  const authError = session.get(authenticator.sessionErrorKey);
  if (!authEmail) return redirect("/login");

  // Commit session to clear any `flash` error message.
  return json(
    { authError },
    {
      headers: {
        "set-cookie": await commitSession(session),
      },
    }
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const currentPath = url.pathname;

  await authenticator.authenticate("TOTP", request, {
    successRedirect: currentPath,
    failureRedirect: currentPath,
  });
}

export default function Verify() {
  const { authError } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center">
      {/* Code Verification Form */}
      <Form method="POST">
        <label htmlFor="code">Code</label>
        <input type="text" name="code" placeholder="Insert code .." required />
        <button type="submit">Continue</button>
      </Form>

      {/* Renders the form that requests a new code. */}
      {/* Email input is not required, it's already stored in Session. */}
      <Form method="POST">
        <button type="submit">Request new Code</button>
      </Form>

      {/* Errors Handling. */}
      <span>{authError?.message}</span>
    </div>
  );
}
