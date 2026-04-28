import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Sidebar } from "@/components/Sidebar";
import { ReturnCodesTable } from "@/components/ReturnCodesTable";
import { AuthenticationSection } from "@/components/AuthenticationSection";
import { OverviewSection } from "@/components/OverviewSection";
import { EndpointsSections } from "@/components/EndpointsSections";
import { CommandPalette } from "@/components/CommandPalette";
import { flattenEndpoints } from "@/lib/api-data";

export default function Index() {
  const [activeId, setActiveId] = useState("intro-overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const allEndpoints = useMemo(() => flattenEndpoints(), []);
  const allIds = useMemo(
    () => ["intro-overview", "intro-authentication", "codigos-retorno", ...allEndpoints.map((e) => e.id)],
    [allEndpoints],
  );

  // Scroll-spy
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    const visible = new Map<string, number>();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        });
        if (visible.size > 0) {
          const top = [...visible.entries()].sort((a, b) => b[1] - a[1])[0][0];
          setActiveId(top);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [allIds]);

  const handleNavigate = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Cmd+K / Ctrl+K opens command palette
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((cur) => !cur);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar
        activeId={activeId}
        onNavigate={handleNavigate}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-card/85 backdrop-blur border-b border-border">
          <div className="flex items-center gap-3 px-4 md:px-8 h-14">
            <button
              className="lg:hidden p-2 -ml-2 rounded-md hover:bg-secondary"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
            >
              <Icon icon="lucide:menu" className="h-5 w-5 text-brand-deep" />
            </button>
            <h1 className="text-sm md:text-base font-semibold text-brand-deep truncate">
              Documentação InvoiCy
            </h1>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                aria-label="Abrir busca rápida"
                className="hidden md:inline-flex items-center gap-2.5 min-w-[260px] px-3.5 py-2 rounded-lg border border-border bg-secondary/60 text-sm text-muted-foreground hover:text-brand-deep transition-colors"
              >
                <Icon icon="lucide:search" className="h-4 w-4" />
                <span className="flex-1 text-left">Buscar endpoints...</span>
                <kbd className="inline-flex items-center gap-0.5 rounded bg-card border border-border px-2 py-0.5 font-mono text-[11px] font-semibold text-brand-deep">
                  Ctrl K
                </kbd>
              </button>
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                aria-label="Abrir busca rápida"
                className="md:hidden inline-flex items-center justify-center h-8 w-8 rounded-md text-brand-deep hover:bg-secondary transition-colors"
              >
                <Icon icon="lucide:search" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        <CommandPalette
          open={paletteOpen}
          onOpenChange={setPaletteOpen}
          onSelect={handleNavigate}
        />

        <main className="flex-1 px-4 md:px-8 py-8 md:py-10 max-w-[1400px] w-full mx-auto space-y-6">
          <OverviewSection />

          <AuthenticationSection />

          <ReturnCodesTable />

          <EndpointsSections />

          <footer className="pt-10 pb-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} InvoiCy · Documentação técnica da API REST
          </footer>
        </main>
      </div>
    </div>
  );
}
