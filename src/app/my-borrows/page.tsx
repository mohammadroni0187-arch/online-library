
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
}

const MyBorrows = () => {
  const { data: session, isPending } = authClient.useSession();

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBorrows = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:8000/my-borrows?email=${encodeURIComponent(
            session.user.email
          )}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch borrowed books");
        }

        const data: Borrow[] = await res.json();
        setBorrows(data);
      } catch (error) {
        console.error(error);
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
    try {
      setReturningId(borrowId);

      const res = await fetch(
        `http://localhost:8000/borrows/${borrowId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to return book");
      }

      // UI থেকে Returned Book সরিয়ে দেওয়া
      setBorrows((previousBorrows) =>
        previousBorrows.filter((book) => book._id !== borrowId)
      );

      toast.success("Book returned successfully!");
    } catch (error) {
      console.error("Return error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setReturningId(null);
    }
  };

  if (isPending || loading) {
    return <p className="py-20 text-center">Loading...</p>;
  }

  if (!session) {
    return <p className="py-20 text-center">Please login first.</p>;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">
        My Borrowed Books
      </h1>

      {borrows.length === 0 ? (
        <p className="py-10 text-center text-gray-500">
          You haven't borrowed any books yet.
        </p>
      ) : (
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
                        <Image
                          src={book.bookImage}
                          alt={book.bookTitle}
                          fill
                          className="rounded object-contain"
                          sizes="48px"
                        />
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
                    <button
                      onClick={() => handleReturn(book._id)}
                      disabled={returningId === book._id}
                      className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {returningId === book._id
                        ? "Returning..."
                        : "Return"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MyBorrows;
