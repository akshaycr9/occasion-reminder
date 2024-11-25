// app/routes/logout.tsx
import type { ActionFunctionArgs } from "react-router";
import { authenticator } from "~/modules/auth/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.logout(request, {
    redirectTo: "/login",
  });
}
