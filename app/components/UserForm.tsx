import { Form, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function UserForm({ user, data }: { user?: any; data: any }) {
  const navigate = useNavigate();
  return (
    <Form method="post" className="space-y-4">
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input id="firstName" name="firstName" defaultValue={user?.firstName} />
        {data && data.error.firstName && (
          <p className="text-sm text-red-500 mt-1">{data.error.firstName[0]}</p>
        )}
      </div>
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input id="lastName" name="lastName" defaultValue={user?.lastName} />
        {data && data.error.lastName && (
          <p className="text-sm text-red-500 mt-1">{data.error.lastName[0]}</p>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
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
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
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
  );
}
