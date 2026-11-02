import React from 'react';


import Image from "next/image";
import { BookOpen, UserRound, Tag } from "lucide-react";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
}

const MyBook = async () => {
  const res = await fetch("http://localhost:8000/my-book", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const data:Book[] = await res.json();

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            My Books
          </h1>
          <p className="mt-2 text-slate-500">
            Manage and explore your personal book collection.
          </p>
        </div>

        {/* Book Cards */}
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((book) => (
              <div
                key={book._id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-56 w-full bg-slate-100">
                  {book.image ? (
                  <Image
                   src={book.image}
                   alt={book.title}
                   width={300}
                          height={300}
                          className="h-56 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-56 items-center justify-center bg-slate-200">
                          No Image Available
                        </div>
                      )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="line-clamp-1 text-xl font-bold text-slate-900">
                    {book.title}
                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <UserRound size={16} />
                    <span>{book.author}</span>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <Tag size={16} />
                    <span>{book.category}</span>
                  </div>

                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
                    {book.description}
                  </p>

                  {/* Buttons */}
                  <div className="mt-5 flex gap-3">
                    <button className="flex-1 rounded-lg bg-emerald-700 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800">
                      Edit
                    </button>

                    <button className="flex-1 rounded-lg border border-red-200 bg-red-50 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100">
                      Delete
                    </button>
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
              You haven't added any books yet.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default MyBook;
