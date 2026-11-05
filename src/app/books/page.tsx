
"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BookOpen, UserRound, Search, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { API_URL } from "@/lib/api";
import LoadingState from "@/component/LoadingState";

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

const CATEGORIES = ["All", "Fiction", "Science", "History", "Kids", "Others"];

const AllBooksContent = () => {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "All";

  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isPending } = authClient.useSession();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${API_URL}/books`);

        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }

        const data: Book[] = await res.json();
        setBooks(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Could not load the books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const normalizedCategory = CATEGORIES.includes(activeCategory)
    ? activeCategory
    : "All";

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      normalizedCategory === "All" || book.category === normalizedCategory;

    const query = search.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  if (loading || isPending) {
    return <LoadingState label="Loading books..." />;
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

        {/* Search */}
        <div className="mx-auto mb-6 max-w-xl">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-emerald-600">
            <Search className="text-slate-400" size={20} />

            <input
              type="text"
              placeholder="Search books by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2.5">
          {CATEGORIES.map((category) => {
            const isActive = category === normalizedCategory;

            return (
              <Link
                key={category}
                href={
                  category === "All"
                    ? "/books"
                    : `/books?category=${encodeURIComponent(category)}`
                }
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-600 hover:text-emerald-700"
                }`}
              >
                {category}
              </Link>
            );
          })}
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm font-medium text-red-600">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Book Count */}
        <div className="mb-6">
          <p className="font-semibold text-slate-700">
            Showing {filteredBooks.length} of {books.length} Books
          </p>
        </div>

        {/* Books Grid */}
        {!error && filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-100">
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      unoptimized
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      <BookOpen size={50} />
                    </div>
                  )}
                </div>

                {/* Book Information */}
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

                  {/* Available Copies + Details */}
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-600">
                      Available:{" "}
                      {book.availableCopies ?? book.totalCopies ?? 0}
                    </span>

                    <Link
                      href={`/books/${book._id}`}
                      className="rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !error && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
              <BookOpen
                className="mx-auto mb-3 text-slate-400"
                size={40}
              />

              <h2 className="text-xl font-semibold text-slate-800">
                No Books Found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try another search or category.
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

const AllBooks = () => {
  return (
    <Suspense fallback={<LoadingState label="Loading books..." />}>
      <AllBooksContent />
    </Suspense>
  );
};

export default AllBooks;
