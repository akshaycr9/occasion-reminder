// app/routes/logout.tsx
import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/modules/auth/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.logout(request, {
    redirectTo: "/login",
  });
}
