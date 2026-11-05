
import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  Landmark,
  Baby,
  BookMarked,
} from "lucide-react";

const categories = [
  {
    name: "Fiction",
    description: "Stories, novels and adventures",
    icon: BookOpen,
  },
  {
    name: "Science",
    description: "Discover science and technology",
    icon: FlaskConical,
  },
  {
    name: "History",
    description: "Explore the past and civilizations",
    icon: Landmark,
  },
  {
    name: "Kids",
    description: "Fun and learning for young readers",
    icon: Baby,
  },
  {
    name: "Others",
    description: "Explore more interesting books",
    icon: BookMarked,
  },
];

const Categories = () => {
  return (
    <section className="bg-[#101d15] px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-lime-400">
            Find Your Interest
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Explore <span className="text-lime-400">Categories</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            From exciting fiction to educational books,
            find something you love to read.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                href={`/books?category=${encodeURIComponent(category.name)}`}
                key={category.name}
                className="group rounded-2xl border border-white/10 bg-[#17251c] p-6 text-center transition duration-300 hover:-translate-y-2 hover:border-lime-400/50 hover:bg-[#1d3023]"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-400/10 text-lime-400 transition group-hover:bg-lime-400 group-hover:text-black">
                  <Icon size={30} />
                </div>

                <h3 className="mb-2 text-lg font-semibold">
                  {category.name}
                </h3>

                <p className="text-sm leading-6 text-gray-400">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
