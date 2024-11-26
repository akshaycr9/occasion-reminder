import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { requireAuthentication } from "~/lib/auth.utils";
import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Occasion Reminder" },
    { name: "description", content: "Occasion Reminder" },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  return await requireAuthentication(request);
}

export default function Index() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
          Welcome to Occasion Reminders
        </h1>
      </div>
    </div>
  );
}
