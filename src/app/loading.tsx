import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="text-muted-foreground flex w-full items-center justify-center text-sm">
      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
    </div>
  );
}
