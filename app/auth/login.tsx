import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  MetaFunction,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import { Loader2 } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { authenticator } from "~/modules/auth/auth.server";
import { commitSession, getSession } from "~/modules/auth/session.server";
import { checkUserByEmail } from "prisma/user";

export const meta: MetaFunction = () => {
  return [
    { title: "Login - Occasion Reminder" },
    { name: "description", content: "Login to Occasion Reminder" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
  const session = await getSession(request.headers.get("Cookie"));
  const authError = session.get(authenticator.sessionErrorKey);

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

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.clone().formData();
  const email = formData.get("email");
  const userExist = await checkUserByEmail(email as string);
  if (!userExist) {
    return json({ error: "User does not exist" }, { status: 404 });
  }

  await authenticator.authenticate("TOTP", request, {
    successRedirect: "/verify",
    failureRedirect: "/login",
    context: { formData },
  });
};

export default function LoginForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email to receive a verification code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <Input
                  type="email"
                  name="email"
                  placeholder="Please enter your email"
                  required
                  autoComplete="off"
                />
                {actionData?.error && (
                  <p className="text-sm text-red-500">{actionData.error}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Code
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
