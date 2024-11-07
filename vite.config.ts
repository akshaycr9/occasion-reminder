import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { remixDevTools } from "remix-development-tools";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remixDevTools(),
    remix({
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "home.tsx", { index: true });
          route("login", "auth/login.tsx");
          route("verify", "auth/verify.tsx");
          route("logout", "auth/logout.tsx");
          route("magic-link", "auth/magic-link.tsx");
          route("/users", "users/route.tsx", () => {
            route("", "users/index.tsx", { index: true });
            route(":userId", "users/user.tsx");
            route(":userId/edit", "users/edit.tsx");
            route("create", "users/create.tsx");
          });
        });
      },
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
});
