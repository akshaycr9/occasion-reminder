import { Authenticator } from "remix-auth";
import { TOTPStrategy } from "remix-auth-totp";
import { sessionStorage } from "./session.server";
import { prisma } from "~/lib/db.server";

export let authenticator = new Authenticator(sessionStorage);

authenticator.use(
  new TOTPStrategy(
    {
      secret: process.env.TOTP_SECRET ?? "secret",
      magicLinkPath: "/magic-link",
      sendTOTP: async ({ email, code, magicLink }) => {
        console.log("[Dev-Only] TOTP Code:", code);
        console.log("[Dev-Only] TOTP Email:", email);
        console.log("[Dev-Only] TOTP MagicLink:", magicLink);
      },
    },
    async ({ email }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error("User not found");
      return user;
    }
  )
);
