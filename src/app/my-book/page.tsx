import MyBookClient from "@/component/MyBookClient";

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies?: number;
}
const MyBook = async () => {
  const res = await fetch("http://localhost:8000/my-book", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const data: Book[] = await res.json();

  return <MyBookClient books={data} />;
};

export default MyBook;