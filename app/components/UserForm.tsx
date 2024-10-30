import { User } from "@prisma/client";
import { Form, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

export default function UserForm({
  user,
  data,
}: {
  user?: User;
  data?: { error: Record<string, string[]> };
}) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Create User</h1>
      <Form method="post" className="grid grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="firstName"
            className={cn("after:content-['*'] after:ml-0.5", {
              "text-red-500": data?.error.firstName,
            })}
          >
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            defaultValue={user?.firstName}
          />
          {data && data.error.firstName && (
            <p className="text-sm text-red-500 mt-1">
              {data.error.firstName[0]}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor="lastName"
            className={cn("after:content-['*'] after:ml-0.5", {
              "text-red-500": data?.error.lastName,
            })}
          >
            Last Name
          </Label>
          <Input id="lastName" name="lastName" defaultValue={user?.lastName} />
          {data && data.error.lastName && (
            <p className="text-sm text-red-500 mt-1">
              {data.error.lastName[0]}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor="email"
            className={cn("after:content-['*'] after:ml-0.5", {
              "text-red-500": data?.error.email,
            })}
          >
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={user?.email}
          />
          {data && data.error.email && (
            <p className="text-sm text-red-500 mt-1">{data.error.email[0]}</p>
          )}
        </div>
        <div>
          <Label
            htmlFor="dateOfBirth"
            className={cn("after:content-['*'] after:ml-0.5", {
              "text-red-500": data?.error.dob,
            })}
          >
            Date of Birth
          </Label>
          <Input id="dob" name="dob" type="date" defaultValue={user?.dob} />
          {data && data.error.dob && (
            <p className="text-sm text-red-500 mt-1">{data.error.dob[0]}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="submit">{user ? "Update User" : "Create User"}</Button>
          <Button type="button" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </Form>
    </div>
  );
}
