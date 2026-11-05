import { requireSession } from "@/lib/session";

export default async function BookDetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Private route: Book Details requires a logged-in session.
  await requireSession(`/books/${id}`);

  return <>{children}</>;
}
