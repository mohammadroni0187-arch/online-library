"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
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
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

interface BorrowButtonProps {
  book: {
    _id: string;
    title: string;
    image: string;
    availableCopies?: number;
    totalCopies?: number;
  };
}

const toDateInputValue = (date: Date) => {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60 * 1000)
    .toISOString()
    .slice(0, 10);
};

const addDays = (date: Date, days: number) =>
  new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

const BorrowButton = ({ book }: BorrowButtonProps) => {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [borrowDate, setBorrowDate] = useState(() =>
    toDateInputValue(new Date())
  );
  const [returnDate, setReturnDate] = useState(() =>
    toDateInputValue(addDays(new Date(), 7))
  );

  const availableCopies =
    book.availableCopies ?? book.totalCopies ?? 0;

  const user = session?.user;

  const handleBorrow = async () => {
    if (!user) {
      toast.error("Please login first!");
      router.push(
        `/login?callbackURL=${encodeURIComponent(`/books/${book._id}`)}`
      );
      return;
    }

    if (!borrowDate || !returnDate) {
      toast.error("Please select borrow and return dates");
      return;
    }

    if (new Date(returnDate) <= new Date(borrowDate)) {
      toast.error("Return date must be after the borrow date");
      return;
    }

    try {
      setLoading(true);

      const res = await apiFetch("/borrows", {
        method: "POST",
        body: JSON.stringify({
          bookId: book._id,
          borrowDate: new Date(borrowDate).toISOString(),
          returnDate: new Date(returnDate).toISOString(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Borrow failed");
      }

      toast.success("Book borrowed successfully!");

      setOpen(false);

      // Refresh the server component so the available copies are up to date.
      router.refresh();
    } catch (error) {
      console.error("Borrow error:", error);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            disabled={availableCopies <= 0}
            className="mt-8 w-full cursor-pointer rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {availableCopies > 0
              ? "Borrow This Book"
              : "Currently Unavailable"}
          </button>
        }
      />

      <DialogContent className="sm:max-w-lg">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleBorrow();
          }}
        >
          <DialogHeader>
            <DialogTitle>Borrow: {book.title}</DialogTitle>
            <DialogDescription>
              Confirm your details and choose when you will borrow and return
              this book.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-5">
            <Field>
              <Label htmlFor="borrower-name">Your Name</Label>
              <Input
                id="borrower-name"
                value={user?.name || ""}
                readOnly
                className="bg-slate-50"
              />
            </Field>

            <Field>
              <Label htmlFor="borrower-email">Your Email</Label>
              <Input
                id="borrower-email"
                type="email"
                value={user?.email || ""}
                readOnly
                className="bg-slate-50"
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field>
                <Label htmlFor="borrow-date">Borrow Date</Label>
                <Input
                  id="borrow-date"
                  type="date"
                  value={borrowDate}
                  onChange={(event) => setBorrowDate(event.target.value)}
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="return-date">Return Date</Label>
                <Input
                  id="return-date"
                  type="date"
                  value={returnDate}
                  min={borrowDate}
                  onChange={(event) => setReturnDate(event.target.value)}
                  required
                />
              </Field>
            </div>
          </FieldGroup>

          <DialogFooter className="mt-5">
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={loading}>
                  Cancel
                </Button>
              }
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Borrowing..." : "Confirm Borrow"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowButton;
