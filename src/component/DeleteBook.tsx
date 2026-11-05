"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api";

interface DeleteBookProps {
  bookId: string;
  onDelete: (id: string) => void;
}

const DeleteBook = ({ bookId, onDelete }: DeleteBookProps) => {
  const handleDelete = async () => {
    try {
      const res = await apiFetch(`/books/${bookId}`, {
        method: "DELETE",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete book");
      }

      toast.success("Book deleted successfully!");

      onDelete(bookId);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete book!"
      );
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button className="flex-1 rounded-lg border border-red-200 bg-red-50 py-2.5 text-sm font-semibold text-red-600">
            Delete
          </button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This book will be
            permanently deleted from your library.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBook;