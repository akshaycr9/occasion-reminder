import { createCookieSessionStorage } from "react-router";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_auth",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET ?? "secret"],
    secure: process.env.NODE_ENV === "production",
    maxAge: 60,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
