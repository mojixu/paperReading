type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, subtitle, align = "left" }: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "mx-auto mb-12 max-w-3xl text-center" : "mb-12 max-w-3xl"}>
      <p className="mb-3 text-sm font-semibold uppercase text-[#8C1515]">{eyebrow}</p>
      <h2 className="academic-heading text-3xl font-bold text-[#111827] sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-[#4B5563] sm:text-lg">{subtitle}</p>
    </div>
  );
}
