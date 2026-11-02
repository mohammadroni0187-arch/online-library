
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, UserRound, Search } from "lucide-react";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies?: number;
  availableCopies?: number;
}

const AllBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:8000/books");

        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="py-20 text-center">Loading books...</p>;
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Explore Our Library
          </p>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            All Books
          </h1>

          <p className="mt-3 text-slate-500">
            Explore our collection and discover your next favorite book.
          </p>
        </div>

        {/* Search Interface */}
        <div className="mx-auto mb-10 max-w-xl">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-emerald-600">
            <Search className="text-slate-400" size={20} />

            <input
              type="text"
              placeholder="Search books by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Book Count */}
        <div className="mb-6">
          <p className="font-semibold text-slate-700">
            Showing {filteredBooks.length} of {books.length} Books
          </p>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-64 bg-slate-100">
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      <BookOpen size={50} />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {book.category}
                  </span>

                  <h2 className="mt-4 line-clamp-1 text-xl font-bold text-slate-900">
                    {book.title}
                  </h2>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <UserRound size={16} />
                    {book.author}
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                    {book.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">
                      Available: {book.availableCopies ?? book.totalCopies ?? 0}
                    </span>

                    <Link
                      href={`/books/${book._id}`}
                      className="rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <BookOpen className="mx-auto mb-3 text-slate-400" size={40} />

            <h2 className="text-xl font-semibold text-slate-800">
              No Books Found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try searching with another book title.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBooks;
