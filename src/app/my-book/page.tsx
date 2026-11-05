
"use client";

import MyBookClient from "@/component/MyBookClient";
import PageTitle from "@/component/PageTitle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyBook() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace(
        `/login?callbackURL=${encodeURIComponent("/my-books")}`
      );
    }
  }, [session, isPending, router]);

  if (isPending) {
    return <p className="py-10 text-center">Loading...</p>;
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <PageTitle title="My Books" />
      <MyBookClient />
    </>
  );
}
