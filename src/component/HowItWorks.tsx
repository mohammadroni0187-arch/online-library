
import { Search, BookOpen, RotateCcw } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Explore Books",
    description:
      "Browse our collection and discover books that match your interests.",
    icon: Search,
  },
  {
    number: "02",
    title: "Borrow a Book",
    description:
      "Choose your favorite book and borrow it with just a few clicks.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Read & Return",
    description:
      "Enjoy reading your book and return it when you are finished.",
    icon: RotateCcw,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#0b1510] px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-lime-400">
            Simple Process
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">
            How <span className="text-lime-400">BookNook</span> Works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Getting your next favorite book is easier than ever.
            Follow these three simple steps.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group rounded-2xl border border-white/10 bg-[#14221a] p-8 transition duration-300 hover:-translate-y-2 hover:border-lime-400/50"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="rounded-xl bg-lime-400/10 p-4 text-lime-400">
                    <Icon size={30} />
                  </div>

                  <span className="text-3xl font-bold text-white/10">
                    {step.number}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="leading-7 text-gray-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
