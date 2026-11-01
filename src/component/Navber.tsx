
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
    { title: "Add Book", href: "/add-book" },
    { title: "My Books", href: "/my-books" },
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
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>

          <Button className="bg-blue-900 text-white hover:bg-blue-800" asChild>
            <Link href="/singUp">Register</Link>
          </Button>
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
