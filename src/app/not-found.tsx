import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50 px-4 py-20 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-700 text-white">
        <BookOpen size={30} />
      </div>

      <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
        Error 404
      </p>

      <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
        Page Not Found
      </h1>

      <p className="mt-4 max-w-md text-slate-500">
        The page you are looking for does not exist or has been moved.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
        >
          Back to Home
        </Link>

        <Link
          href="/books"
          className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Browse All Books
        </Link>
      </div>
    </main>
  );
}
