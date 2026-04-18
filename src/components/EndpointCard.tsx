import { useState } from "react";
import { ExternalLink, BookOpen } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import { getMethodClass } from "@/lib/api-data";
import type { Endpoint } from "@/types/api";
import { cn } from "@/lib/utils";

interface EndpointCardProps {
  endpoint: Endpoint;
  category: string;
}

export function EndpointCard({ endpoint, category }: EndpointCardProps) {
  const hasReq = endpoint.request_body !== null && endpoint.request_body !== undefined;
  const hasRes = endpoint.response_body !== null && endpoint.response_body !== undefined;
  const initialTab: "request" | "response" = hasReq ? "request" : "response";
  const [tab, setTab] = useState<"request" | "response">(initialTab);
  const hasCode = hasReq || hasRes;
  const hasRelatedContent =
    !!endpoint.article_url || !!endpoint.examples_url || !!endpoint.notes;

  return (
    <article
      id={endpoint.id}
      className="endpoint-card p-6 md:p-8 scroll-mt-24 animate-fade-in"
    >
      <div
        className={cn(
          "grid gap-6 md:gap-8",
          hasCode ? "lg:grid-cols-2" : "grid-cols-1",
        )}
      >
        {/* Coluna 1: método + explicação */}
        <div className="min-w-0">
          <header className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
            <span className={cn("method-badge mt-1", getMethodClass(endpoint.method))}>
              {endpoint.method}
            </span>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl md:text-2xl font-bold text-brand-deep mb-2 leading-tight">
                {endpoint.title}
              </h2>
              <code className="inline-block max-w-full overflow-x-auto text-[13px] font-mono text-brand-navy bg-secondary px-3 py-1.5 rounded-md border border-border break-all">
                {endpoint.path}
              </code>
            </div>
          </header>

          {endpoint.description && (
            <div
              className="prose prose-sm max-w-none text-foreground/80 leading-relaxed [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-brand-orange [&_code]:font-mono [&_code]:text-[12px] mb-6"
              dangerouslySetInnerHTML={{ __html: endpoint.description }}
            />
          )}

          {hasRelatedContent && (
            <aside className="rounded-xl border border-dashed border-brand-orange/40 bg-brand-orange/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-brand-orange" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-deep">
                  Artigo relacionado
                </span>
              </div>

              <div className="flex flex-col gap-1.5 mb-2">
                {endpoint.article_url && (
                  <a
                    href={endpoint.article_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-brand-orange hover:underline"
                  >
                    {endpoint.article_label ?? "Ler documentação completa"}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

                {endpoint.examples_url && (
                  <a
                    href={endpoint.examples_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-brand-orange hover:underline"
                  >
                    {endpoint.examples_label ?? "Ver exemplos no GitHub"}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>

              {endpoint.notes && (
                <p className="text-sm text-foreground/75 leading-relaxed whitespace-pre-line">
                  {endpoint.notes}
                </p>
              )}
            </aside>
          )}
        </div>

        {/* Coluna 2: código (request/response) */}
        {hasCode && (
          <div className="min-w-0 lg:sticky lg:top-20 lg:self-start">
            <div role="tablist" className="inline-flex bg-secondary rounded-lg p-1 mb-3">
              {hasReq && (
                <button
                  role="tab"
                  aria-selected={tab === "request"}
                  onClick={() => setTab("request")}
                  className={cn(
                    "px-4 py-1.5 text-sm font-semibold rounded-md transition-all",
                    tab === "request"
                      ? "bg-card text-brand-deep shadow-sm"
                      : "text-muted-foreground hover:text-brand-deep",
                  )}
                >
                  Request
                </button>
              )}
              {hasRes && (
                <button
                  role="tab"
                  aria-selected={tab === "response"}
                  onClick={() => setTab("response")}
                  className={cn(
                    "px-4 py-1.5 text-sm font-semibold rounded-md transition-all",
                    tab === "response"
                      ? "bg-card text-brand-deep shadow-sm"
                      : "text-muted-foreground hover:text-brand-deep",
                  )}
                >
                  Response
                </button>
              )}
            </div>
            {tab === "request" && hasReq && <CodeBlock value={endpoint.request_body} />}
            {tab === "response" && hasRes && <CodeBlock value={endpoint.response_body} />}
          </div>
        )}
      </div>
    </article>
  );
}
