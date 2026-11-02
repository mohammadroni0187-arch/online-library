import React from 'react';


import Image from "next/image";
import Link from "next/link";
import { BookOpen, UserRound, ArrowLeft } from "lucide-react";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies?: number;
  availableCopies?: number;
  userName?: string;
  userEmail?: string;
}

interface BookDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BookDetailsPage = async ({ params }: BookDetailsPageProps) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/books/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Book Not Found</h1>
        <Link href="/books" className="mt-5 text-emerald-700">
          Back to All Books
        </Link>
      </div>
    );
  }

  const book: Book = await res.json();

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 font-medium text-emerald-700 hover:text-emerald-900"
        >
          <ArrowLeft size={18} />
          Back to All Books
        </Link>

        <div className="grid gap-10 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">

          {/* Book Image */}
          <div className="relative min-h-[350px] overflow-hidden rounded-xl bg-slate-100">
            {book.image ? (
              <Image
                src={book.image}
                alt={book.title}
                fill
                unoptimized
                className="object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <BookOpen size={70} className="text-slate-400" />
              </div>
            )}
          </div>

          {/* Book Information */}
          <div className="flex flex-col justify-center">

            <span className="w-fit rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              {book.category}
            </span>

            <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
              {book.title}
            </h1>

            <div className="mt-4 flex items-center gap-2 text-slate-600">
              <UserRound size={20} />
              <span>By {book.author}</span>
            </div>

            <div className="my-6 border-t border-slate-200" />

            <h2 className="text-lg font-bold text-slate-900">
              About This Book
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              {book.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Total Copies</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {book.totalCopies ?? 0}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Available Copies</p>
                <p className="mt-1 text-2xl font-bold text-emerald-700">
                  {book.availableCopies ?? book.totalCopies ?? 0}
                </p>
              </div>
            </div>

            <button
              disabled={(book.availableCopies ?? book.totalCopies ?? 0) <= 0}
              className="mt-8 w-full rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {(book.availableCopies ?? book.totalCopies ?? 0) > 0
                ? "Borrow This Book"
                : "Currently Unavailable"}
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetailsPage;
