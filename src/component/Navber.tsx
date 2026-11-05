
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronDown, Menu, X } from "lucide-react";

import { toast } from "react-toastify";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

const publicLinks = [
  { title: "Home", href: "/" },
  { title: "All Books", href: "/books" },
];

const privateLinks = [
  { title: "Add Book", href: "/add-book" },
  { title: "My Books", href: "/my-books" },
  { title: "My Borrows", href: "/my-borrows" },
];

const navLinks = user
  ? [...publicLinks, ...privateLinks]
  : publicLinks;
  const closeMenu = () => setIsOpen(false);

 
const handleSignOut = async () => {
  try {
    await authClient.signOut();

    toast.success("Signed out successfully!");
    window.location.replace("/");
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Failed to sign out. Please try again.");
  }
};
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <div className="rounded-lg bg-blue-900 p-2 text-white">
            <BookOpen size={25} />
          </div>

          <span className="text-2xl font-bold tracking-tight text-blue-950">
            Book<span className="text-orange-500">Nook</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  render={<Link href={link.href} />}
                  className={navigationMenuTriggerStyle()}
                >
                  {link.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 lg:flex">
          {!isPending && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex cursor-pointer items-center gap-1.5 rounded-full outline-none"
                  aria-label="Open account menu"
                >
                  <Image
                    src={user.image || "/default-avatar.svg"}
                    alt={user.name || "User Profile"}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border-2 border-blue-900 object-cover"
                  />
                  <ChevronDown size={16} className="text-slate-500" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-semibold text-slate-900">
                    <span className="block truncate">
                      {user.name || "BookNook User"}
                    </span>
                    <span className="block truncate text-xs font-normal text-slate-500">
                      {user.email}
                    </span>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => router.push("/UserProfile")}>
                    My Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    variant="destructive"
                    onClick={handleSignOut}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                >
                  Register
                </Link>
              </>
            )
          )}
        </div>

        {/* Mobile & Tablet Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </Button>
      </div>

      {/* Mobile & Tablet Menu */}
      {isOpen && (
        <div className="border-t bg-white px-4 py-5 shadow-lg lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">

            {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="rounded-md px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-900"
                  >
                    {link.title}
                  </Link>
                ))}
            <div className="mt-3 flex flex-col gap-3 border-t pt-4 sm:flex-row">
              {!isPending && (
                user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="flex h-12 w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-slate-200 px-3 text-left outline-none"
                      aria-label="Open account menu"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <Image
                          src={user.image || "/default-avatar.svg"}
                          alt={user.name || "User Profile"}
                          width={40}
                          height={40}
                          className="h-9 w-9 shrink-0 rounded-full border-2 border-blue-900 object-cover"
                        />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-slate-900">
                            {user.name || "BookNook User"}
                          </span>
                          <span className="block truncate text-xs text-slate-500">
                            {user.email}
                          </span>
                        </span>
                      </span>

                      <ChevronDown size={18} className="shrink-0 text-slate-500" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem
                        onClick={() => {
                          closeMenu();
                          router.push("/UserProfile");
                        }}
                      >
                        My Profile
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => {
                          closeMenu();
                          handleSignOut();
                        }}
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="flex h-10 w-full items-center justify-center rounded-md border text-sm font-medium hover:bg-gray-100"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={closeMenu}
                      className="flex h-10 w-full items-center justify-center rounded-md bg-blue-900 text-sm font-medium text-white hover:bg-blue-800"
                    >
                      Register
                    </Link>
                  </>
                )
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
