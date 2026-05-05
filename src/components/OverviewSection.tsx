export function OverviewSection() {
  return (
    <section id="intro-overview" className="endpoint-card p-6 md:p-10 scroll-mt-24 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-orange/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl pointer-events-none" />

      <div className="relative">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-full mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
          Documentação técnica
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-deep tracking-tight mb-3">
          Bem-vindo a Documentação do InvoiCy!
        </h1>
        <p className="text-base md:text-lg text-foreground/75 leading-relaxed max-w-2xl">
          Tudo o que você precisa para integrar NF-e, NFC-e, NFS-e, CT-e, MDF-e e NFCom à sua
          aplicação. Guias práticos, exemplos reais e referência completa da API.
        </p>

        <h2 className="text-lg font-bold text-brand-deep mt-10 mb-4">Ambientes disponíveis</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <EnvCard
            label="Homologação"
            url="https://apibrhomolog.invoicy.com.br"
            hint="Ambiente para testes e desenvolvimento"
          />
          <EnvCard
            label="Produção"
            url="https://apibr.invoicy.com.br/"
            hint="Ambiente de produção com documentos válidos"
            primary
          />
        </div>

        <h2 className="text-lg font-bold text-brand-deep mt-10 mb-4">Links úteis</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          <QuickLinkCard
            label="GitHub"
            href="https://github.com/migrate-company/integracao-InvoiCy-BR"
            hint="Repositório oficial da documentação, com exemplos e layouts."
          />
          <QuickLinkCard
            label="Portal para Devs"
            href="http://desenvolvedores.migrate.info/"
            hint="Guias completos e referência técnica."
          />
          <QuickLinkCard
            label="Coleção Postman"
            href="https://documenter.getpostman.com/view/9193875/SztEanQL?version=latest#intro"
            hint="Coleção Postman com todos os endpoints e exemplos de requisições."
          />
          <QuickLinkCard
            label="Site da Migrate"
            href="https://migrate.info/"
            hint="Site institucional e informações comerciais."
          />
        </div>
      </div>
    </section>
  );
}

function EnvCard({
  label,
  url,
  hint,
  primary,
}: {
  label: string;
  url: string;
  hint: string;
  primary?: boolean;
}) {
  return (
    <div
      className={
        primary
          ? "rounded-xl border border-brand-orange/30 bg-gradient-to-br from-brand-orange/5 to-transparent p-5"
          : "rounded-xl border border-border bg-secondary/40 p-5"
      }
    >
      <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </div>
      <code className="text-[13px] font-mono text-brand-navy break-all block mb-2">{url}</code>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function QuickLinkCard({ label, href, hint }: { label: string; href: string; hint: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-xl border border-border bg-card px-4 py-3 block hover:border-brand-orange/40 hover:bg-secondary/40 transition-colors"
    >
      <div className="text-sm font-bold text-brand-deep">{label}</div>
      <code className="text-[11px] font-mono text-brand-orange break-all block mt-1">{href}</code>
      <p className="text-xs text-muted-foreground mt-2">{hint}</p>
    </a>
  );
}
