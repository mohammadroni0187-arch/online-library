import React from 'react';


import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, UserRound, AlertCircle } from "lucide-react";
import { API_URL } from "@/lib/api";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
}


const NewArrivals = async () => {
  let books: Book[] = [];
  let loadError = false;

  try {
    const res = await fetch(`${API_URL}/books/latest`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch latest books");
    }

    books = await res.json();
  } catch (error) {
    // Next.js throws this while probing static generation - let it through.
    if (
      error instanceof Error &&
      error.message.includes("Dynamic server usage")
    ) {
      throw error;
    }

    // Keep the home page usable even when the API is not reachable.
    console.error("New Arrivals Error:", error);
    loadError = true;
  }

  return (
    <section className="bg-slate-50 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-700">
              Explore Our Collection
            </p>

            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              New Arrivals
            </h2>

            <p className="mt-3 text-slate-500">
              Discover the latest books added to our library.
            </p>
          </div>

          <Link
            href="/books"
            className="flex items-center gap-2 font-semibold text-emerald-700 hover:text-emerald-900"
          >
            View All Books
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Book Cards */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <div
                key={book._id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
               <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                    {book.image ? (
                      <Image
                        src={book.image}
                        alt={book.title || "Book cover"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <BookOpen size={45} className="text-slate-400" />
                      </div>
                    )}
                  </div>

                {/* Details */}
                <div className="p-5">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {book.category}
                  </span>

                  <h3 className="mt-4 line-clamp-1 text-xl font-bold text-slate-900">
                    {book.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <UserRound size={16} />
                    {book.author}
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                    {book.description}
                  </p>

                  <Link
                    href={`/books/${book._id}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                  >
                    View Details
                    <BookOpen size={17} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
            {loadError ? (
              <AlertCircle
                className="mx-auto mb-3 text-red-400"
                size={40}
              />
            ) : (
              <BookOpen
                className="mx-auto mb-3 text-slate-400"
                size={40}
              />
            )}

            <h3 className="text-lg font-semibold text-slate-800">
              {loadError
                ? "Could Not Load Books"
                : "No Books Available"}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {loadError
                ? "Please start the API server and refresh the page."
                : "New books will appear here."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;


