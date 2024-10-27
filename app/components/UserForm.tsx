import { Form, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function UserForm({ user }: { user?: any }) {
  const navigate = useNavigate();
  return (
    <Form method="post" className="space-y-4">
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          defaultValue={user?.firstName}
          required
        />
      </div>
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          defaultValue={user?.lastName}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={user?.email}
          required
        />
      </div>
      <div>
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dob"
          name="dob"
          type="date"
          defaultValue={user?.dob}
          required
        />
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
