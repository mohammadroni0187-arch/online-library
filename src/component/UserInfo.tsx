
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

const UserInfo = () => {
  const { data: session, isPending } = authClient.useSession();

  const [open, setOpen] = useState(false);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = session?.user;

  const hasValidImage = Boolean(
    user?.image && failedSrc !== user.image
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sign Out
  const handleSignOut = async () => {
    try {
      await authClient.signOut();

      setOpen(false);

      toast.success("Signed out successfully!");

      window.location.replace("/");
    } catch (error) {
      console.error("Sign out failed:", error);

      toast.error("Failed to sign out. Please try again.");
    }
  };

  if (isPending) {
    return (
      <div className="h-8 w-24 animate-pulse rounded-full bg-gray-200" />
    );
  }

  // Logged-in User
  if (user) {
    const initials =
      user.name?.charAt(0).toUpperCase() ||
      user.email?.charAt(0).toUpperCase() ||
      "U";

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white p-1 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500/20"
          aria-expanded={open}
          aria-label="User menu"
        >
          {hasValidImage ? (
            <img
              src={user.image!}
              alt={user.name || "User"}
              referrerPolicy="no-referrer"
              onError={() => setFailedSrc(user.image!)}
              className="h-8 w-8 rounded-full border border-gray-100 object-cover sm:h-9 sm:w-9"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white sm:h-9 sm:w-9">
              {initials}
            </div>
          )}

          <span className="hidden max-w-32 truncate text-sm font-semibold text-gray-800 sm:block">
            {user.name}
          </span>

          <span className="hidden pr-1 text-xs text-gray-500 sm:block">
            {open ? "▲" : "▼"}
          </span>
        </button>

        {open && (
          <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl sm:top-14">

            {/* User Information */}
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
              {hasValidImage ? (
                <img
                  src={user.image!}
                  alt={user.name || "User"}
                  referrerPolicy="no-referrer"
                  onError={() => setFailedSrc(user.image!)}
                  className="h-10 w-10 shrink-0 rounded-xl border border-gray-100 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-base font-bold text-white">
                  {initials}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-bold text-gray-900">
                  {user.name || "Name not available"}
                </h2>

                <p className="truncate text-xs text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Dropdown Links */}
            <div className="mt-2 space-y-1">
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
              >
                <FiUser className="text-base text-gray-500" />
                <span>My Profile</span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-left text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                <FiLogOut className="text-base text-red-500" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Guest User
  return (
    <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
      <Link
        href="/login"
        className="text-xs font-bold text-gray-800 transition hover:text-green-600 sm:text-sm"
      >
        Login
      </Link>

      <Link
        href="/singUp"
        className="rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white shadow-md transition hover:bg-green-700 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 lg:text-sm"
      >
       Registration
      </Link>
    </div>
  );
};

export default UserInfo;
