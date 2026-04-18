import { useEffect, useMemo, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { ReturnCodesTable } from "@/components/ReturnCodesTable";
import { AuthenticationSection } from "@/components/AuthenticationSection";
import { OverviewSection } from "@/components/OverviewSection";
import { EndpointsSections } from "@/components/EndpointsSections";
import { CATEGORY_ORDER, ENDPOINTS_DB, flattenEndpoints } from "@/lib/api-data";

export default function Index() {
  const [activeId, setActiveId] = useState("intro-overview");
  const [mobileOpen, setMobileOpen] = useState(false);
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
              <Menu className="h-5 w-5 text-brand-deep" />
            </button>
            <h1 className="text-sm md:text-base font-semibold text-brand-deep truncate">
              Documentação InvoiCy — API REST
            </h1>
          </div>
        </header>

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
