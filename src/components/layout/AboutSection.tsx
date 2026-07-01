import { Award, Clock3, Scissors, Sparkles } from "lucide-react";

const values = [
  {
    title: "Tailoring First",
    description:
      "Every silhouette starts with proportion, movement, and comfort before it becomes a statement piece.",
    icon: Scissors,
  },
  {
    title: "Made To Last",
    description:
      "We choose finishes and fabric feel with repeat wear in mind, so the garment keeps its character over time.",
    icon: Award,
  },
  {
    title: "Thoughtful Details",
    description:
      "Small decisions around trim, structure, and drape are what give each collection its polished identity.",
    icon: Sparkles,
  },
];

const milestones = [
  { value: "10+", label: "Years refining signature fits" },
  { value: "500+", label: "Clients styled for daily and occasion wear" },
  { value: "100%", label: "Focus on comfort, finish, and visual impact" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-y border-black/5 bg-[linear-gradient(180deg,rgba(252,250,248,0.6),rgba(245,241,236,0.7))] py-24 lg:py-32"
    >
      <div className="absolute inset-y-0 left-[-10%] w-[28rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-[-8%] top-12 h-72 w-72 rounded-full bg-primary-soft/90 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1600px] gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-16">
        <div
          id="about-copy"
          className="space-y-8 rounded-[2rem] border border-white/70 bg-white/72 p-8 shadow-[0_30px_80px_rgba(124,92,255,0.10)] backdrop-blur-xl lg:p-10"
        >
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-text-muted">
              About Us
            </span>
          </div>

          <div className="space-y-5">
            <h2
              className="max-w-3xl font-serif leading-tight text-text"
              style={{ fontSize: "var(--text-fluid-h1)" }}
            >
              Krishna Creation builds clothing that feels graceful in motion and grounded in craft.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-text-muted lg:text-lg">
              We design for people who want elegance without stiffness, and detail without excess. Our work blends
              modern wearability with a couture-inspired eye for shape, finish, and confidence.
            </p>
            <p className="max-w-2xl text-base leading-7 text-text-muted lg:text-lg">
              From the first fitting idea to the final surface detail, the goal stays the same: create pieces that
              look elevated, feel comfortable, and belong naturally in real life.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {milestones.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-primary/10 bg-white/70 px-5 py-6 shadow-lg shadow-primary/5"
              >
                <p className="font-serif text-3xl text-text">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div
            id="about-quote"
            className="glass rounded-[2rem] p-8 lg:p-10"
          >
            <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/15 bg-primary-soft/40 text-primary">
              <Clock3 size={24} strokeWidth={1.75} />
            </div>
            <p className="max-w-xl font-serif text-2xl leading-relaxed text-text lg:text-3xl">
              “True style is not only how a garment looks. It is how naturally it belongs to the person wearing it.”
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.28em] text-text-muted">
              Krishna Creation Nashik
            </p>
          </div>

          <div
            id="about-values"
            className="grid gap-4"
          >
            {values.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-[1.75rem] border border-white/70 bg-white/76 p-6 shadow-[0_20px_50px_rgba(124,92,255,0.08)] backdrop-blur-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-soft/50 text-primary">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-text">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-muted lg:text-base">{description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
