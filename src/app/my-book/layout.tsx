import { requireSession } from "@/lib/session";

export default async function MyBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Private route: legacy alias of /my-books, guarded the same way.
  await requireSession("/my-book");

  return <>{children}</>;
}
