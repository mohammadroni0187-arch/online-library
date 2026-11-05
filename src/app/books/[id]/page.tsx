
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, UserRound, ArrowLeft, UserCheck } from "lucide-react";
import BorrowButton from "@/component/BorrowButton";
import { API_URL } from "@/lib/api";

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

async function fetchBook(id: string): Promise<Book | null> {
  try {
    const res = await fetch(`${API_URL}/books/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return (await res.json()) as Book;
  } catch (error) {
    console.error("Failed to fetch book:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: BookDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const book = await fetchBook(id);

  if (!book) {
    return { title: "Book Not Found" };
  }

  return {
    title: book.title,
    description: book.description,
  };
}

const BookDetailsPage = async ({ params }: BookDetailsPageProps) => {
  const { id } = await params;

  const book = await fetchBook(id);

  if (!book) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50 px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Book Not Found
        </h1>

        <p className="mt-3 text-slate-500">
          This book does not exist or has been removed.
        </p>

        <Link
          href="/books"
          className="mt-6 rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
        >
          Back to All Books
        </Link>
      </section>
    );
  }

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
                priority
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

            {/* Added by */}
            {(book.userName || book.userEmail) && (
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-slate-50 p-4">
                <UserCheck size={18} className="mt-0.5 text-emerald-700" />
                <div className="min-w-0">
                  <p className="text-sm text-slate-500">Added by</p>
                  <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                    {book.userName || "Unknown"}
                  </p>
                  {book.userEmail && (
                    <p className="truncate text-xs text-slate-500">
                      {book.userEmail}
                    </p>
                  )}
                </div>
              </div>
            )}

            <BorrowButton book={book} />

          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetailsPage;
