import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { RETURN_CODES_DB } from "@/lib/api-data";

const ITEMS_PER_PAGE = 10;

export function ReturnCodesTable() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    setPage(1);
    if (!q) return RETURN_CODES_DB;
    return RETURN_CODES_DB.filter((row) =>
      Object.values(row).some((v) => String(v ?? "").toLowerCase().includes(q)),
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const headers = useMemo(() => {
    const sample = RETURN_CODES_DB[0] ?? {};
    return Object.keys(sample);
  }, []);

  return (
    <section id="codigos-retorno" className="endpoint-card p-6 md:p-8 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-deep">Códigos de Retorno</h2>
      <p className="text-sm text-muted-foreground mt-3">
        Tabela completa de códigos de retorno da API para todos os módulos fiscais.
      </p>

      <div className="mt-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por código ou mensagem..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                {headers.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-brand-deep"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((row, i) => (
                <tr key={i} className="border-t border-border hover:bg-secondary/50 transition-colors">
                  {headers.map((h) => (
                    <td key={h} className="px-4 py-3 align-top text-foreground/80">
                      {String(row[h] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={headers.length} className="px-4 py-8 text-center text-muted-foreground">
                    Nenhum resultado encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <span>
            {filtered.length === 0
              ? "0 resultados"
              : `${(page - 1) * ITEMS_PER_PAGE + 1}–${Math.min(page * ITEMS_PER_PAGE, filtered.length)} de ${filtered.length}`}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-md border border-border hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-md border border-border hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Próxima página"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
