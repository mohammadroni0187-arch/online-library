
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
}

interface EditBookProps {
  book: Book;
  onUpdate: (id: string, updatedBook: Partial<Book>) => void;
}

const EditBook = ({ book, onUpdate }: EditBookProps) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [category, setCategory] = useState(book.category);
  const [image, setImage] = useState(book.image);
  const [description, setDescription] = useState(book.description);
  const [totalCopies, setTotalCopies] = useState(book.totalCopies);
  const [isEditing, setIsEditing] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await onUpdate(book._id, {
      title,
      author,
      category,
      image,
      description,
      totalCopies,
    });

    setIsEditing(false);
  } catch (error) {
    console.error("Update failed:", error);
  }
};

  return (
    <Dialog  open={isEditing} onOpenChange={setIsEditing}>
      <DialogTrigger
        render={
          <button className="flex-1 rounded-lg bg-emerald-700 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800">
            Edit
          </button>
        }
      />

      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Update your book information and save your changes.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-5">
            <Field>
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Field>

            <Field>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="min-h-24 w-full rounded-md border bg-transparent p-3 text-sm"
              />
            </Field>

            <Field>
              <Label htmlFor="copies">Total Copies</Label>
              <Input
                id="copies"
                type="number"
                min="0"
                value={totalCopies}
                onChange={(e) => setTotalCopies(Number(e.target.value))}
                required
              />
            </Field>
          </FieldGroup>

            <DialogFooter className="mt-5">
          <DialogClose
            render={
              <Button type="button" variant="outline">
                Cancel
              </Button>
            }
          />

          <Button type="submit">
            Update Book
          </Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBook;
