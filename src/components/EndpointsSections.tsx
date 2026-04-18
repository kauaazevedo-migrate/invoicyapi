import { EndpointCard } from "@/components/EndpointCard";
import { CATEGORY_ORDER, CATEGORY_LABEL, ENDPOINTS_DB } from "@/lib/api-data";

export function EndpointsSections() {
  return (
    <>
      {CATEGORY_ORDER.map((cat) => {
        const items = ENDPOINTS_DB[cat] || [];
        if (items.length === 0) return null;
        return (
          <section key={cat} className="space-y-4">
            <div className="flex items-baseline gap-3 pt-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-deep tracking-tight">
                {CATEGORY_LABEL[cat] ?? cat}
              </h2>
            </div>
            {items.map((ep) => (
              <EndpointCard key={ep.id} endpoint={ep} category={cat} />
            ))}
          </section>
        );
      })}
    </>
  );
}
