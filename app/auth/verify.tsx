import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, MetaFunction, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/modules/auth/auth.server";
import { getSession, commitSession } from "~/modules/auth/session.server";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Verify OTP - Occasion Reminder" },
    { name: "description", content: "Verify OTP" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

  const session = await getSession(request.headers.get("cookie"));
  const authEmail = session.get("auth:email");
  const authError = session.get(authenticator.sessionErrorKey);
  if (!authEmail) return redirect("/login");

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
  const url = new URL(request.url);
  const currentPath = url.pathname;

  await authenticator.authenticate("TOTP", request, {
    successRedirect: currentPath,
    failureRedirect: currentPath,
  });
}

export default function Verify() {
  const { authError } = useLoaderData<typeof loader>();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Verify OTP</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your email.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Form method="POST">
            <div className="flex flex-col gap-4">
              <InputOTP
                name="code"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                autoFocus
                required
              >
                <InputOTPGroup className="flex justify-between w-full gap-1">
                  <InputOTPSlot
                    className="w-full h-12 p-3 text-lg text-center border rounded-md outline-none border-gray-300 focus:ring-2 focus:ring-blue-500"
                    index={0}
                  />
                  <InputOTPSlot
                    className="w-full h-12 p-3 text-lg text-center border rounded-md outline-none border-gray-300 focus:ring-2 focus:ring-blue-500"
                    index={1}
                  />
                  <InputOTPSlot
                    className="w-full h-12 p-3 text-lg text-center border rounded-md outline-none border-gray-300 focus:ring-2 focus:ring-blue-500"
                    index={2}
                  />
                  <InputOTPSlot
                    className="w-full h-12 p-3 text-lg text-center border rounded-md outline-none border-gray-300 focus:ring-2 focus:ring-blue-500"
                    index={3}
                  />
                  <InputOTPSlot
                    className="w-full h-12 p-3 text-lg text-center border rounded-md outline-none border-gray-300 focus:ring-2 focus:ring-blue-500"
                    index={4}
                  />
                  <InputOTPSlot
                    className="w-full h-12 p-3 text-lg text-center border rounded-md outline-none border-gray-300 focus:ring-2 focus:ring-blue-500"
                    index={5}
                  />
                </InputOTPGroup>
              </InputOTP>

              <div className="flex flex-col space-y-2">
                <Button type="submit" className="w-full">
                  Verify OTP
                </Button>
              </div>
            </div>
          </Form>
          <Form method="POST">
            <Button type="submit" variant="outline" className="w-full">
              Resend Code
            </Button>
          </Form>
        </CardContent>
        <span className="text-center text-red-700">{authError?.message}</span>
      </Card>
    </div>
  );
}
