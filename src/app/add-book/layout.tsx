import { requireSession } from "@/lib/session";

export default async function AddBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Private route: adding a book requires a logged-in session.
  await requireSession("/add-book");

  return <>{children}</>;
}
