import { useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { RETURN_CODES_DB } from "@/lib/api-data";
import { cn } from "@/lib/utils";

export function ReturnCodesTable() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return RETURN_CODES_DB;
    return RETURN_CODES_DB.filter((row) => {
      return Object.values(row).some((v) =>
        String(v ?? "").toLowerCase().includes(q),
      );
    });
  }, [query]);

  const headers = useMemo(() => {
    const sample = RETURN_CODES_DB[0] ?? {};
    return Object.keys(sample);
  }, []);

  return (
    <section id="codigos-retorno" className="endpoint-card p-6 md:p-8 scroll-mt-24">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 text-left group"
      >
        <ChevronDown
          className={cn(
            "h-5 w-5 text-brand-blue transition-transform",
            open ? "rotate-0" : "-rotate-90",
          )}
        />
        <h2 className="text-2xl md:text-3xl font-bold text-brand-deep">Códigos de Retorno</h2>
      </button>
      <p className="text-sm text-muted-foreground mt-3">
        Tabela completa de códigos de retorno da API para todos os módulos fiscais.
      </p>

      {open && (
        <div className="mt-6 animate-fade-in">
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
                {filtered.map((row, i) => (
                  <tr key={i} className="border-t border-border hover:bg-secondary/50 transition-colors">
                    {headers.map((h) => (
                      <td key={h} className="px-4 py-3 align-top text-foreground/80">
                        {String(row[h] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={headers.length} className="px-4 py-8 text-center text-muted-foreground">
                      Nenhum resultado encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
