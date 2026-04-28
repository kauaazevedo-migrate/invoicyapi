import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import invoicyDevLogo from "@/assets/invoicy-dev-logo.svg";
import {
  CATEGORY_ORDER,
  CATEGORY_LABEL,
  ENDPOINTS_DB,
  getMethodClass,
} from "@/lib/api-data";
import {
  EXTENSIONS_CATEGORY,
  EXTENSION_GROUP_ORDER,
  getExtensionGroup,
} from "@/lib/extensions-menu";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ activeId, onNavigate, mobileOpen, onCloseMobile }: SidebarProps) {
  const [query, setQuery] = useState("");
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = { introducao: true };
    CATEGORY_ORDER.forEach((c) => (init[c] = false));
    EXTENSION_GROUP_ORDER.forEach((group) => (init[`ext:${group}`] = true));
    init["ext:Outras Extensões"] = true;
    return init;
  });

  const toggleFolder = (key: string) =>
    setOpenFolders((p) => ({ ...p, [key]: !p[key] }));

  const filteredCats = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORY_ORDER.filter((cat) => (ENDPOINTS_DB[cat] || []).length > 0).map(
      (cat) => {
        const items = (ENDPOINTS_DB[cat] || []).filter((e) =>
          !q ||
          e.title.toLowerCase().includes(q) ||
          e.path.toLowerCase().includes(q) ||
          e.method.toLowerCase().includes(q),
        );
        return { cat, items };
      },
    );
  }, [query]);

  // Auto-expand folders that match search
  const searchActive = query.trim().length > 0;

  const handleClick = (id: string) => {
    onNavigate(id);
    if (window.innerWidth < 1024) onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-brand-deep/60 backdrop-blur-sm lg:hidden transition-opacity",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onCloseMobile}
      />

      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-[300px] flex flex-col bg-sidebar-gradient text-sidebar-foreground transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="relative flex items-center justify-center px-5 py-5 border-b border-sidebar-border">
          <img
            src={invoicyDevLogo}
            alt="InvoiCy for Dev"
            className="h-10 w-auto object-contain"
          />
          <button
            className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-sidebar-deep"
            onClick={onCloseMobile}
            aria-label="Fechar menu"
          >
            <Icon icon="lucide:x" className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-sidebar-border">
          <div className="relative">
            <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar endpoints..."
              className="w-full bg-sidebar-deep text-sidebar-foreground placeholder:text-sidebar-muted text-sm rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-orange/60"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-3">
          {/* Introdução */}
          {!searchActive && (
            <FolderBlock
              title="INTRODUÇÃO"
              icon={<Icon icon="lucide:book-open" className="h-3.5 w-3.5" />}
              open={openFolders.introducao}
              onToggle={() => toggleFolder("introducao")}
            >
              <NavItem
                label="Visão Geral"
                active={activeId === "intro-overview"}
                onClick={() => handleClick("intro-overview")}
              />
              <NavItem
                label="Autenticação"
                active={activeId === "intro-authentication"}
                onClick={() => handleClick("intro-authentication")}
              />
              <NavItem
                label="Códigos de Retorno"
                active={activeId === "codigos-retorno"}
                onClick={() => handleClick("codigos-retorno")}
              />
            </FolderBlock>
          )}

          {filteredCats.map(({ cat, items }) => {
            if (items.length === 0) return null;
            const isOpen = searchActive ? true : openFolders[cat];
            const isExtensions = cat === EXTENSIONS_CATEGORY;

            const extensionGroups = isExtensions
              ? Object.entries(
                  items.reduce<Record<string, typeof items>>((acc, item) => {
                    const group = getExtensionGroup(item);
                    if (!acc[group]) acc[group] = [];
                    acc[group].push(item);
                    return acc;
                  }, {}),
                ).sort((a, b) => {
                  const ai = EXTENSION_GROUP_ORDER.indexOf(a[0] as (typeof EXTENSION_GROUP_ORDER)[number]);
                  const bi = EXTENSION_GROUP_ORDER.indexOf(b[0] as (typeof EXTENSION_GROUP_ORDER)[number]);
                  if (ai === -1 && bi === -1) return a[0].localeCompare(b[0]);
                  if (ai === -1) return 1;
                  if (bi === -1) return -1;
                  return ai - bi;
                })
              : [];

            return (
              <FolderBlock
                key={cat}
                title={CATEGORY_LABEL[cat] ?? cat}
                icon={<Icon icon="lucide:folder" className="h-3.5 w-3.5" />}
                open={!!isOpen}
                onToggle={() => toggleFolder(cat)}
                count={items.length}
              >
                {isExtensions
                  ? extensionGroups.map(([groupLabel, groupItems]) => {
                      const groupKey = `ext:${groupLabel}`;
                      const groupOpen = searchActive ? true : !!openFolders[groupKey];
                      return (
                        <li key={groupLabel}>
                          <FolderBlock
                            title={groupLabel}
                            icon={<Icon icon="lucide:folder" className="h-3.5 w-3.5" />}
                            open={groupOpen}
                            onToggle={() => toggleFolder(groupKey)}
                            count={groupItems.length}
                          >
                            {groupItems.map((item) => (
                              <NavItem
                                key={item.id}
                                label={item.title}
                                method={item.method}
                                active={activeId === item.id}
                                onClick={() => handleClick(item.id)}
                              />
                            ))}
                          </FolderBlock>
                        </li>
                      );
                    })
                  : items.map((item) => (
                      <NavItem
                        key={item.id}
                        label={item.title}
                        method={item.method}
                        active={activeId === item.id}
                        onClick={() => handleClick(item.id)}
                      />
                    ))}
              </FolderBlock>
            );
          })}
        </nav>

        <div className="px-5 py-3 border-t border-sidebar-border text-[11px] text-sidebar-muted">
          © InvoiCy · Documentação técnica
        </div>
      </aside>
    </>
  );
}

function FolderBlock({
  title,
  icon,
  open,
  onToggle,
  count,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-deep transition-colors"
      >
        <Icon
          icon="lucide:chevron-right"
          className={cn(
            "h-3.5 w-3.5 text-sidebar-muted transition-transform shrink-0",
            open && "rotate-90",
          )}
        />
        <span className="text-sidebar-muted">{icon}</span>
        <span className="text-[12px] font-semibold uppercase tracking-wider flex-1 text-left">
          {title}
        </span>
        {count !== undefined && (
          <span className="text-[10px] font-bold text-sidebar-muted bg-sidebar-deep px-1.5 py-0.5 rounded">
            {count}
          </span>
        )}
      </button>
      {open && <ul className="mt-0.5 space-y-0.5 pl-2">{children}</ul>}
    </div>
  );
}

function NavItem({
  label,
  method,
  active,
  onClick,
}: {
  label: string;
  method?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className={cn(
          "w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-[13px] transition-all",
          active
            ? "bg-white/10 text-white font-semibold"
            : "text-sidebar-foreground/85 hover:bg-white/5 hover:text-white",
        )}
      >
        {method && (
          <span
            className={cn(
              "shrink-0 inline-flex items-center justify-center text-[9px] font-bold uppercase tracking-wider rounded px-1.5 py-0.5 text-white",
              getMethodClass(method),
            )}
          >
            {method}
          </span>
        )}
        <span className="truncate">{label}</span>
      </button>
    </li>
  );
}
