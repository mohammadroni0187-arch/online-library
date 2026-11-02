import React from 'react';


import Image from "next/image";
import { BookOpen, CalendarDays, RotateCcw } from "lucide-react";

interface Book {
  _id: string;
 
  bookTitle: string;
  image: string;
  borrowDate: string;
  returnDate: string;
  userEmail: string;

}

const MyBorrows = async () => {
 const res = await fetch("http://localhost:8000/my-borrows", {
  cache: "no-store",
});

const result = await res.text();

console.log("Status:", res.status);
console.log("Backend response:", result);

if (!res.ok) {
  throw new Error(`Failed to fetch: ${res.status} - ${result}`);
}

const borrows:Book[] = JSON.parse(result);

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <BookOpen className="mx-auto mb-3 text-emerald-700" size={35} />

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            My Borrowed Books
          </h1>

          <p className="mt-2 text-slate-500">
            Keep track of the books you have borrowed.
          </p>
        </div>

        {/* Borrowed Books */}
        {borrows.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-emerald-900 text-white">
                  <tr>
                    <th className="px-5 py-4 text-sm font-semibold">Book</th>
                    <th className="px-5 py-4 text-sm font-semibold">Borrow Date</th>
                    <th className="px-5 py-4 text-sm font-semibold">Return Date</th>
                    <th className="px-5 py-4 text-sm font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {borrows.map((borrow) => (
                    <tr key={borrow._id} className="transition hover:bg-slate-50">

                      {/* Book Info */}
                      <td className="px-5 py-4">
                        <div className="flex min-w-[220px] items-center gap-3">
                          {borrow.image ? (
                            <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={borrow.image}
                                alt={borrow.bookTitle}
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="flex h-16 w-12 shrink-0 items-center justify-center rounded-md bg-slate-100">
                              <BookOpen className="text-slate-400" />
                            </div>
                          )}

                          <span className="font-semibold text-slate-800">
                            {borrow.bookTitle}
                          </span>
                        </div>
                      </td>

                      {/* Borrow Date */}
                      <td className="px-5 py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={16} />
                          {borrow.borrowDate}
                        </div>
                      </td>

                      {/* Return Date */}
                      <td className="px-5 py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={16} />
                          {borrow.returnDate}
                        </div>
                      </td>

                      {/* Return Button */}
                      <td className="px-5 py-4">
                        <button
                          className="flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                        >
                          <RotateCcw size={15} />
                          Return
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <BookOpen className="mx-auto mb-3 text-slate-400" size={40} />

            <h2 className="text-xl font-semibold text-slate-800">
              No Borrowed Books
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              You haven't borrowed any books yet.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default MyBorrows;
