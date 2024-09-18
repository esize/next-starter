import { SearchX } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="mt-8 flex w-full flex-col items-center">
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="flex items-center text-3xl">
            <SearchX className="mr-2 h-6 w-6" />
            Page Not Found
          </CardTitle>
          <CardDescription>404 - Page Not Found</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </main>
  );
}
