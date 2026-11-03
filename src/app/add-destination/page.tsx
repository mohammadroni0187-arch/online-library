
"use client";

import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";

const initialForm = {
  title: "",
  author: "",
  category: "Fiction",
  totalCopies: 1,
  image: "",
  description: "",
  userName: "Your Name",
  userEmail: "your@email.com",
};

const AddBook = () => {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (
    field: keyof typeof form,
    value: string | number
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  // Step 1: Upload image to ImgBB
  const uploadImage = async () => {
  if (!image) {
    throw new Error("Please select a book image");
  }

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error("ImgBB API key is missing");
  }

  const formData = new FormData();
  formData.append("image", image);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.error?.message || "Image upload failed");
  }

  return data.data.url as string;
};

  // Step 2: Submit book information
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setLoading(true);

      // First upload image
      const imageUrl = await uploadImage();

      // Then create book data
      const bookData = {
        ...form,
        image: imageUrl,
        availableCopies: form.totalCopies,
        createdAt: new Date(),
      };

      // Send data to backend
      const res = await fetch(
        "http://localhost:8000/add-destination",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add book");
      }

      toast.success("Book added successfully!");

      setForm(initialForm);
      setImage(null);
      setPreview("");
    } catch (error) {
      console.error("Add Book Error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b1510] text-white">
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

      <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-14">
        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="title">Book Title</label>
              <input
                id="title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                required
                placeholder="Enter book title"
                className="w-full rounded-md border border-[#35443a] bg-[#19251e] px-3 py-2.5"
              />
            </div>

            <div>
              <label htmlFor="author">Author Name</label>
              <input
                id="author"
                value={form.author}
                onChange={(e) => update("author", e.target.value)}
                required
                placeholder="Enter author name"
                className="w-full rounded-md border border-[#35443a] bg-[#19251e] px-3 py-2.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="w-full rounded-md border border-[#35443a] bg-[#19251e] px-3 py-2.5"
              >
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Kids">Kids</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label htmlFor="copies">Total Copies</label>
              <input
                id="copies"
                type="number"
                min="1"
                value={form.totalCopies}
                onChange={(e) =>
                  update("totalCopies", Number(e.target.value))
                }
                required
                className="w-full rounded-md border border-[#35443a] bg-[#19251e] px-3 py-2.5"
              />
            </div>
          </div>

          <div>
            <label htmlFor="image">Book Image</label>

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0] ?? null;
                setImage(selectedFile);
                setPreview(
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : ""
                );
              }}
              required
              className="w-full cursor-pointer rounded-md border border-[#35443a] bg-[#19251e] text-sm text-gray-300 file:mr-4 file:border-0 file:bg-[#26382c] file:px-4 file:py-2.5 file:text-white"
            />

            {preview && (
              <div className="relative mt-4 h-64 w-48">
                <Image
                  src={preview}
                  alt="Book preview"
                  fill
                  unoptimized
                  className="rounded-lg object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="description">Short Description</label>
            <textarea
              id="description"
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              required
              placeholder="Write a short description..."
              className="w-full rounded-md border border-[#35443a] bg-[#19251e] px-3 py-3"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="userName">User Name</label>
              <input
                id="userName"
                value={form.userName}
                readOnly
                className="w-full rounded-md border border-[#35443a] bg-[#19251e] px-3 py-2.5"
              />
            </div>

            <div>
              <label htmlFor="email">User Email</label>
              <input
                id="email"
                type="email"
                value={form.userEmail}
                readOnly
                className="w-full rounded-md border border-[#35443a] bg-[#19251e] px-3 py-2.5"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#91d5a7] py-3 font-semibold text-[#102016] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Add Book"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default AddBook;
