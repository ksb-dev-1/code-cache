import { Metadata } from "next";

import SignInForm from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in - CodeCache",
  description: "Sign in to your CodeCache account to explore",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <SignInForm />
    </div>
  );
}
