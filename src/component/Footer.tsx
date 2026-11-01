
import Link from "next/link";
import {
  BookOpen,
  Mail,
  MapPin,
  Phone,
  
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <Link href="/" className="mb-4 flex items-center gap-2">
            <div className="rounded-lg bg-blue-900 p-2">
              <BookOpen size={25} />
            </div>
            <span className="text-2xl font-bold">
              Book<span className="text-orange-500">Nook</span>
            </span>
          </Link>

          <p className="max-w-xs text-sm leading-7 text-slate-400">
            Discover your next favorite book with BookNook.
            Explore, borrow, and enjoy reading with our online library.
          </p>

          <div className="mt-5 flex gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"
              aria-label="Facebook"
              className="rounded-full bg-slate-800 p-2 transition hover:bg-blue-600">
              <FaFacebookF size={18} />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full bg-slate-800 p-2 transition hover:bg-pink-600">
              <FaInstagram size={18} />
            </a>

            <a href="https://x.com" target="_blank" rel="noreferrer"
              aria-label="X"
              className="rounded-full bg-slate-800 p-2 transition hover:bg-slate-600">
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-orange-500">Home</Link></li>
            <li><Link href="/books" className="hover:text-orange-500">All Books</Link></li>
            <li><Link href="/add-book" className="hover:text-orange-500">Add Book</Link></li>
            <li><Link href="/my-books" className="hover:text-orange-500">My Books</Link></li>
            <li><Link href="/my-borrows" className="hover:text-orange-500">My Borrows</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Categories</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>Fiction</li>
            <li>Science</li>
            <li>History</li>
            <li>Kids</li>
            <li>Others</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Contact Us</h3>

          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-orange-500" />
              support@booknook.com
            </li>

            <li className="flex items-center gap-3">
              <Phone size={18} className="text-orange-500" />
              +880 1568836945
            </li>

            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-orange-500" />
              Bangladesh
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-sm text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} BookNook. All rights reserved.
          </p>

          <p>
            Made with <span className="text-red-500">♥</span> for book lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
