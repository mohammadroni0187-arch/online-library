
import {
  LibraryBig,
  Clock,
  Users,
  BookOpenCheck,
} from "lucide-react";

const features = [
  {
    title: "Rich Book Collection",
    description:
      "Explore a growing collection of books across different categories.",
    icon: LibraryBig,
  },
  {
    title: "Easy Borrowing",
    description:
      "Borrow your favorite books through a simple and convenient process.",
    icon: BookOpenCheck,
  },
  {
    title: "Save Your Time",
    description:
      "Find and explore books online without visiting a physical library.",
    icon: Clock,
  },
  {
    title: "For Every Reader",
    description:
      "Discover books for students, book lovers and curious minds.",
    icon: Users,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#0b1510] px-4 py-20 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-lime-400">
            Why BookNook
          </p>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            Your Next Great Read
            <span className="text-lime-400"> Starts Here.</span>
          </h2>

          <p className="mt-6 max-w-xl leading-8 text-gray-400">
            BookNook makes discovering, borrowing and enjoying
            books simple. We bring readers and books together
            in one convenient place.
          </p>

          <div className="mt-8 h-1 w-24 rounded-full bg-lime-400" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-[#14221a] p-6 transition duration-300 hover:border-lime-400/50"
              >
                <div className="mb-5 inline-flex rounded-xl bg-lime-400/10 p-3 text-lime-400">
                  <Icon size={28} />
                </div>

                <h3 className="mb-3 text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
