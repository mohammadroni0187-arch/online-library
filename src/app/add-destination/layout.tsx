import { requireSession } from "@/lib/session";

export default async function AddDestinationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Private route: legacy alias of /add-book, guarded the same way.
  await requireSession("/add-destination");

  return <>{children}</>;
}
