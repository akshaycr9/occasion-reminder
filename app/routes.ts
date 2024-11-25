import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "./home.tsx", { index: true }),
  route("login", "./auth/login.tsx"),
  route("verify", "./auth/verify.tsx"),
  route("logout", "./auth/logout.tsx"),
  route("magic-link", "./auth/magic-link.tsx"),
  route("/users", "./users/route.tsx", [
    route("", "./users/index.tsx", { index: true }),
    route(":userId", "./users/user.tsx"),
    route(":userId/edit", "./users/edit.tsx"),
    route("create", "./users/create.tsx"),
  ]),
] satisfies RouteConfig;
