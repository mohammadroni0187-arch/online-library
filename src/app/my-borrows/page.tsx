
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { BookOpen, AlertCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import LoadingState from "@/component/LoadingState";
import PageTitle from "@/component/PageTitle";

interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
  status?: string;
}

const MyBorrows = () => {
  const { data: session, isPending } = authClient.useSession();

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returningId, setReturningId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBorrows = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        const res = await apiFetch("/my-borrows", { cache: "no-store" });

        if (!res.ok) {
          throw new Error("Failed to fetch borrowed books");
        }

        const data: Borrow[] = await res.json();
        setBorrows(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load borrowed books");
        toast.error("Failed to load borrowed books");
      } finally {
        setLoading(false);
      }
    };

    if (!isPending) {
      fetchBorrows();
    }
  }, [session, isPending]);

  // Return Book Function
  const handleReturn = async (borrowId: string) => {
    if (returningId) return;

    try {
      setReturningId(borrowId);

      const res = await apiFetch(`/borrows/${borrowId}`, {
        method: "DELETE",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to return book");
      }

      // Remove the returned book from the list
      setBorrows((previousBorrows) =>
        previousBorrows.filter((book) => book._id !== borrowId)
      );

      toast.success("Book returned successfully!");
    } catch (err) {
      console.error("Return error:", err);

      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong!"
      );
    } finally {
      setReturningId(null);
    }
  };

  if (isPending || loading) {
    return <LoadingState label="Loading your borrows..." />;
  }

  if (!session) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Please login first
        </h1>
        <p className="mt-3 text-slate-500">
          You need to be signed in to see your borrowed books.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
        >
          Go to Login
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <PageTitle title="My Borrows" />
      <h1 className="mb-8 text-3xl font-bold">
        My Borrowed Books
      </h1>

      {error && (
        <div className="mb-8 flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm font-medium text-red-600">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {!error && borrows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <BookOpen className="mx-auto mb-3 text-slate-400" size={40} />

          <h2 className="text-xl font-semibold text-slate-800">
            No Borrowed Books
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            You haven&apos;t borrowed any books yet.
          </p>

          <Link
            href="/books"
            className="mt-5 inline-block rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Browse Books
          </Link>
        </div>
      ) : (
        !error && (
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">Book</th>
                  <th className="p-4">Borrow Date</th>
                  <th className="p-4">Return Date</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {borrows.map((book) => (
                  <tr key={book._id} className="border-t">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-16 w-12 shrink-0">
                          {book.bookImage ? (
                            <Image
                              src={book.bookImage}
                              alt={book.bookTitle}
                              fill
                              unoptimized
                              className="rounded object-contain"
                              sizes="48px"
                            />
                          ) : (
                            <BookOpen
                              className="mx-auto text-slate-400"
                              size={24}
                            />
                          )}
                        </div>

                        <span className="font-medium">
                          {book.bookTitle}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">
                      {new Date(book.borrowDate).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      {new Date(book.returnDate).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <AlertDialog>
                        <AlertDialogTrigger
                          render={
                            <button
                              disabled={returningId === book._id}
                              className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {returningId === book._id
                                ? "Returning..."
                                : "Return"}
                            </button>
                          }
                        />

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Return this book?
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                              You are about to return {book.bookTitle}. The
                              copy will be added back to the library.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>
                              Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction
                              onClick={() => handleReturn(book._id)}
                            >
                              Yes, Return
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </section>
  );
};

export default MyBorrows;
