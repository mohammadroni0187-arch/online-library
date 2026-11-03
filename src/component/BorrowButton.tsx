"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

interface BorrowButtonProps {
  book: {
    _id: string;
    title: string;
    image: string;
    availableCopies?: number;
    totalCopies?: number;
  };
}

const BorrowButton = ({ book }: BorrowButtonProps) => {
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const availableCopies =
    book.availableCopies ?? book.totalCopies ?? 0;

 const handleBorrow = async () => {
  if (!session?.user) {
    toast.error("Please login first!");
    return;
  }

  try {
    setLoading(true);

    console.log("Borrow request started");

    const res = await fetch("http://localhost:8000/borrows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId: book._id,
        bookTitle: book.title,
        bookImage: book.image,
        userEmail: session.user.email,
        borrowDate: new Date().toISOString(),
        returnDate: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
      }),
    });

    console.log("Response status:", res.status);

    const data = await res.json();

    console.log("Backend response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Borrow failed");
    }

    toast.success("Book borrowed successfully!");

  } catch (error) {
    console.error("Borrow error:", error);

    toast.error(
      error instanceof Error ? error.message : "Something went wrong!"
    );
  } finally {
    setLoading(false);
    console.log("Borrow request finished");
  }
};

  return (
    <button
      onClick={handleBorrow}
      disabled={availableCopies <= 0 || loading}
      className="mt-8 w-full cursor-pointer rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {loading
        ? "Borrowing..."
        : availableCopies > 0
          ? "Borrow This Book"
          : "Currently Unavailable"}
    </button>
  );
};

export default BorrowButton;