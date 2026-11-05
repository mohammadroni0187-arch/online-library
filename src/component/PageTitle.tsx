"use client";

import { useEffect } from "react";

interface PageTitleProps {
  title: string;
}

/**
 * Client pages cannot export Next.js metadata, so this sets
 * `document.title` (with the shared "| BookNook" suffix) instead.
 */
const PageTitle = ({ title }: PageTitleProps) => {
  useEffect(() => {
    const previous = document.title;
    document.title = title.includes("|") ? title : `${title} | BookNook`;

    return () => {
      document.title = previous;
    };
  }, [title]);

  return null;
};

export default PageTitle;
