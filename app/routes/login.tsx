// app/routes/login.tsx
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/modules/auth/auth.server";
import { getSession, commitSession } from "~/modules/auth/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
  const session = await getSession(request.headers.get("Cookie"));
  const authError = session.get(authenticator.sessionErrorKey);

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
  await authenticator.authenticate("TOTP", request, {
    // The `successRedirect` route will be used to verify the OTP code.
    // This could be the current pathname or any other route that renders the verification form.
    successRedirect: "/verify",

    // The `failureRedirect` route will be used to render any possible error.
    // This could be the current pathname or any other route that renders the login form.
    failureRedirect: "/login",
  });
}

export default function Login() {
  let { authError } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center">
      {/* Login Form. */}
      <Form method="POST">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Insert email .."
          required
        />
        <button type="submit">Send Code</button>
      </Form>

      {/* Login Errors Handling. */}
      <span>{authError?.message}</span>
    </div>
  );
}
