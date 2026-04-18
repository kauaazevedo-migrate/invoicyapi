import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  value: unknown;
  language?: "json" | "text";
  className?: string;
}

function syntaxHighlight(json: string): string {
  return json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls = "text-[hsl(var(--code-number))]";
        if (/^"/.test(match)) {
          cls = /:$/.test(match)
            ? "text-[hsl(var(--code-key))]"
            : "text-[hsl(var(--code-string))]";
        } else if (/true|false/.test(match)) {
          cls = "text-[hsl(var(--code-bool))]";
        } else if (/null/.test(match)) {
          cls = "text-[hsl(var(--code-bool))]";
        }
        return `<span class="${cls}">${match}</span>`;
      },
    );
}

export function CodeBlock({ value, language = "json", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const text =
    typeof value === "string" ? value : JSON.stringify(value, null, 2);

  const html =
    language === "json" ? syntaxHighlight(text) : text.replace(/</g, "&lt;");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={cn("relative group code-surface rounded-xl overflow-hidden", className)}>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1.5 text-xs font-medium text-[hsl(var(--code-fg))] backdrop-blur transition hover:bg-white/15"
        aria-label="Copiar código"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-[hsl(var(--method-get))]" />
            Copiado
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copiar
          </>
        )}
      </button>
      <pre className="p-5 pr-20 text-[13px] leading-relaxed font-mono overflow-x-auto max-h-[480px] scrollbar-thin">
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}
