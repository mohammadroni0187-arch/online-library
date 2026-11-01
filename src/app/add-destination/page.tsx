
"use client";

import { BookOpen } from "lucide-react";
import { useState,  SubmitEvent  } from "react";

const initialForm = {
  title: "",
  author: "",
  category: "Fiction",
  totalCopies: 1,
  description: "",
  userName: "Your Name",
  userEmail: "your@email.com",
};

const AddBook = () => {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState<File | null>(null);

  // Update form values
  const update = (field: keyof typeof form, value: string | number) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  const res = await fetch('http://localhost:8000/add-destination',{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify(form)
  })
  const data = await res.json()
  console.log(data)
    const bookData = {
      ...form,
      image,
    };

    console.log("Book Data:", bookData);

    // Later: Send bookData to your API
  };
  

  return (
    <main className="min-h-screen bg-[#0b1510] text-white">
      {/* Header Section */}
      <section className="border-b border-white/5 bg-[#17251c] px-4 py-8 text-center sm:py-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <BookOpen className="mb-2 text-[#91d5a7]" size={26} />

          <h1 className="font-serif text-3xl font-bold sm:text-4xl">
            Add a Book
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Put a book from your shelf into the library.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-14">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Book Title & Author */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-medium">
                Book Title
              </label>

              <input
                id="title"
                type="text"
                placeholder="Enter book title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                required
                className="w-full rounded-md border border-[#35443a] bg-[#19251e] px-3 py-2.5 text-sm outline-none focus:border-[#91d5a7]"
              />
            </div>

            <div>
              <label htmlFor="author" className="mb-2 block text-sm font-medium">
                Author Name
              </label>

              <input
                id="author"
                type="text"
                placeholder="Enter author name"
                value={form.author}
                onChange={(e) => update("author", e.target.value)}
                required
                className="w-full rounded-md border border-[#35443a] bg-[#19251e] px-3 py-2.5 text-sm outline-none focus:border-[#91d5a7]"
              />
            </div>
          </div>

          {/* Category & Total Copies */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="category" className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                id="category"
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                required
                className="w-full rounded-md border border-[#35443a] bg-[#19251e] px-3 py-2.5 text-sm outline-none focus:border-[#91d5a7]"
              >
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Kids">Kids</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label htmlFor="copies" className="mb-2 block text-sm font-medium">
                Total Copies
              </label>

              <input
                id="copies"
                type="number"
                min="1"
                value={form.totalCopies}
                onChange={(e) =>
                  update("totalCopies", Number(e.target.value))
                }
                required
                className="w-full rounded-md border border-[#35443a] bg-[#19251e] px-3 py-2.5 text-sm outline-none focus:border-[#91d5a7]"
              />
            </div>
          </div>

          {/* Book Image */}
          <div>
            <label htmlFor="image" className="mb-2 block text-sm font-medium">
              Book Image
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              required
              className="w-full cursor-pointer rounded-md border border-[#35443a] bg-[#19251e] text-sm text-gray-300 file:mr-4 file:border-0 file:bg-[#26382c] file:px-4 file:py-2.5 file:text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-medium">
              Short Description
            </label>

            <textarea
              id="description"
              rows={4}
              placeholder="Write a short description about the book..."
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              required
              className="w-full resize-y rounded-md border border-[#35443a] bg-[#19251e] px-3 py-3 text-sm outline-none focus:border-[#91d5a7]"
            />
          </div>

          {/* User Information */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="userName" className="mb-2 block text-sm font-medium">
                User Name
              </label>

              <input
                id="userName"
                type="text"
                value={form.userName}
                readOnly
                className="w-full rounded-md border border-[#35443a] bg-[#19251e] px-3 py-2.5 text-sm text-gray-400 outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                User Email
              </label>

              <input
                id="email"
                type="email"
                value={form.userEmail}
                readOnly
                className="w-full rounded-md border border-[#35443a] bg-[#19251e] px-3 py-2.5 text-sm text-gray-400 outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-[#91d5a7] py-3 text-sm font-semibold text-[#102016] transition hover:bg-[#a8e5ba] active:scale-[0.99]"
          >
            Add Book
          </button>
        </form>
      </section>
    </main>
  );
};

export default AddBook;
