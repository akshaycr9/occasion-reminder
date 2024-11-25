// app/routes/magic-link.tsx
import type { LoaderFunctionArgs } from "react-router";
import { authenticator } from "~/modules/auth/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.authenticate("TOTP", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
}
