import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mt-8 flex flex-col items-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Evan's Next.js Starter</CardTitle>
          <CardDescription>My very own Next.js starter</CardDescription>
        </CardHeader>
        <CardContent>
          <p>By Evan</p>
          <p>Happy Hacking!</p>
        </CardContent>
      </Card>
    </main>
  );
}
