"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { GitIcon, LogoGoogle } from "@/components/icons";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();

  const handleSignIn = async (provider: "google" | "github") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Sign in failed. Please try again.");
    }
  };

  return (
    <div className="flex h-dvh w-screen items-start justify-center bg-background pt-12 md:items-center md:pt-0">
      <div className="flex w-full max-w-md flex-col gap-12 overflow-hidden rounded-2xl p-4 sm:p-16">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h3 className="font-semibold text-2xl dark:text-zinc-50">SelamGPT</h3>
          <p className="text-gray-500 text-sm dark:text-zinc-400">
            Sign in to continue
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 h-12 text-base font-medium"
            onClick={() => handleSignIn("google")}
          >
            <LogoGoogle />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center gap-2 h-12 text-base font-medium"
            onClick={() => handleSignIn("github")}
          >
            <GitIcon />
            Continue with GitHub
          </Button>
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-zinc-400">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
