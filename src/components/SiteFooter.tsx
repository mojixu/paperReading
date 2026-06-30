import { applicant } from "@/data/siteContent";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#111827]/10 bg-[#F8F5EF] py-8">
      <div className="section-shell flex flex-col justify-between gap-3 text-sm text-[#6B7280] sm:flex-row">
        <p>GRIP Insight · Interactive Research Report</p>
        <p>
          {applicant.name} · {applicant.school} · {applicant.email}
        </p>
      </div>
    </footer>
  );
}
