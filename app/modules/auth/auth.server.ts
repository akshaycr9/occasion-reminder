import { Authenticator } from "remix-auth";
import { TOTPStrategy } from "remix-auth-totp";
import { sessionStorage } from "./session.server";
import { prisma } from "~/lib/db.server";

export let authenticator = new Authenticator(sessionStorage, {
  throwOnError: true,
});

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
      customErrors: {
        invalidTotp: "Your TOTP code is invalid",
        expiredTotp: "Your TOTP code has expired",
        missingSessionEmail: "Your session does not have an email",
        requiredEmail: "Please enter your email",
        invalidEmail: "Please enter a valid email",
      },
    },
    async ({ email }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error("User not found");
      return user;
    }
  )
);
