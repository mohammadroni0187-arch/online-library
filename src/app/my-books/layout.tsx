import { requireSession } from "@/lib/session";

export default async function MyBooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Private route: My Books requires a logged-in session.
  await requireSession("/my-books");

  return <>{children}</>;
}
