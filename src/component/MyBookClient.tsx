
"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen, UserRound, Tag } from "lucide-react";
import { toast } from "react-toastify";
import EditBook from "@/component/EditBook";
import DeleteBook from "./DeleteBook";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies?: number;
}

interface MyBookClientProps {
  books: Book[];
}

const MyBookClient = ({ books }: MyBookClientProps) => {
  const [myBooks, setMyBooks] = useState<Book[]>(books);

 const handleUpdate = async (
  id: string,
  updatedBook: Partial<Book>
) => {
  try {
    const res = await fetch(`http://localhost:8000/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });

    const result = await res.json();

    if (!res.ok) {
  throw new Error(result.message || "Failed to update book");
}

    setMyBooks((previousBooks) =>
  previousBooks.map((book) =>
    book._id === id
      ? { ...book, ...updatedBook }
      : book
  )
);

    toast.success("Book updated successfully!");
  } catch (error) {
    console.error("Update error:", error);
    toast.error("Failed to update book!");
  }
};

const handleDelete = (id: string) => {
  setMyBooks((previousBooks) =>
    previousBooks.filter((book) => book._id !== id)
  );
};

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            My Books
          </h1>
          <p className="mt-2 text-slate-500">
            Manage and explore your personal book collection.
          </p>
        </div>

        {myBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myBooks.map((book) => (
              <div
                key={book._id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-100">
                  {book.image ? (
                    <Image
                         src={book.image}
                           alt={book.title}
                            fill
                            className="object-contain"
                             sizes="(max-width: 768px) 100vw, 33vw"
                           />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      No Image Available
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="line-clamp-1 text-xl font-bold text-slate-900">
                    {book.title}
                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <UserRound size={16} />
                    {book.author}
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <Tag size={16} />
                    {book.category}
                  </div>

                  <p className="mt-4 line-clamp-2 text-sm text-slate-600">
                    {book.description}
                  </p>

                       <div className="mt-5 flex gap-3">
                <EditBook
                  book={book}
                  onUpdate={handleUpdate}
                />

                <DeleteBook
                  bookId={book._id}
                  onDelete={handleDelete}
                />
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

export default MyBookClient;
