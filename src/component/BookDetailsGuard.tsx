
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface BookDetailsGuardProps {
  children: React.ReactNode;
}

const BookDetailsGuard = ({ children }: BookDetailsGuardProps) => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold">Checking login...</p>
      </div>
    );
  }

  if (!session) return null;

  return <>{children}</>;
};

export default BookDetailsGuard;
