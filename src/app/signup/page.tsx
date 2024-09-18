import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SignupForm } from "./form";

export default async function SignupPage() {
  return (
    <>
      <main className="mt-8 flex w-full flex-col items-center">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline" tabIndex={7}>
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
export interface ActionResult {
  error: string;
}
