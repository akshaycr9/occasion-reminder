import { redirect } from "react-router";
import { User } from "~/interface/user.interface";
import { authenticator } from "~/modules/auth/auth.server";

export const requireAuthentication = async (request: Request) => {
  const session = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return session as User;
};
