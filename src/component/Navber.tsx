
"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu } from "lucide-react";

const Navbar = () => {
  const navLinks = [
    { title: "Home", href: "/" },
    { title: "All Books", href: "/books" },
    { title: "Add Book", href: "/add-destination" },
    { title: "My Books", href: "/my-book" },
    { title: "My Borrows", href: "/my-borrows" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
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

        {/* Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
                <Link
                  href="/login"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Login
                </Link>

                <Link
                  href="/signUp"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800"
                >
                  Register
                </Link>
              </div>

        {/* Mobile Menu Icon */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>

      </div>
    </header>
  );
};

export default Navbar;
