import { requireSession } from "@/lib/session";

export default async function MyBorrowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Private route: My Borrows requires a logged-in session.
  await requireSession("/my-borrows");

  return <>{children}</>;
}
