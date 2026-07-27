import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { signInWithGitHub, signInWithGoogle } from "@/actions/auth/sign-in";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import SignInButton from "./sign-in-button";

const OAUTH_PROVIDERS = [
  {
    action: signInWithGoogle,
    icon: <FcGoogle size={20} aria-hidden="true" />,
    label: "Sign in with Google",
  },
  {
    action: signInWithGitHub,
    icon: <FaGithub size={20} aria-hidden="true" />,
    label: "Sign in with GitHub",
  },
] as const;

export default function SignInForm() {
  return (
    <Card className="max-w-xs w-full">
      <CardHeader>
        <CardTitle className="text-center">Sign in to CodeCache</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {OAUTH_PROVIDERS.map(({ action, icon, label }) => (
            <form key={label} action={action}>
              <SignInButton aria-label={label} icon={icon} text={label} />
            </form>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
