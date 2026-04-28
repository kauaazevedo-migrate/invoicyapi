import { useMemo } from "react";
import { Icon } from "@iconify/react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CATEGORY_LABEL, flattenEndpoints } from "@/lib/api-data";

const STATIC_ENTRIES: Array<{ id: string; title: string; hint: string }> = [
  { id: "intro-overview", title: "Visão Geral", hint: "Página" },
  { id: "intro-authentication", title: "Autenticação", hint: "Página" },
  { id: "codigos-retorno", title: "Códigos de Retorno", hint: "Página" },
];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (id: string) => void;
}

export function CommandPalette({ open, onOpenChange, onSelect }: CommandPaletteProps) {
  const endpoints = useMemo(() => flattenEndpoints(), []);

  const handleSelect = (id: string) => {
    onSelect(id);
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Buscar endpoint, página ou método..." />
      <CommandList className="max-h-[480px]">
        <CommandEmpty>Nenhum resultado.</CommandEmpty>
        <CommandGroup heading="Páginas">
          {STATIC_ENTRIES.map((entry) => (
            <CommandItem
              key={entry.id}
              value={`${entry.title} ${entry.hint}`}
              onSelect={() => handleSelect(entry.id)}
            >
              <Icon icon="lucide:book-open" className="mr-2 h-4 w-4 text-brand-orange" />
              <span>{entry.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Endpoints">
          {endpoints.map((ep) => {
            const categoryLabel = CATEGORY_LABEL[ep.category] ?? ep.category;
            return (
              <CommandItem
                key={ep.id}
                value={`${ep.title} ${ep.method} ${ep.path} ${categoryLabel}`}
                onSelect={() => handleSelect(ep.id)}
              >
                <span className="mr-2 inline-flex w-12 shrink-0 justify-center text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                  {ep.method}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="truncate">{ep.title}</span>
                  <span className="text-[11px] text-muted-foreground truncate">
                    {categoryLabel} · {ep.path}
                  </span>
                </div>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
