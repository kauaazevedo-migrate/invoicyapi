import { CodeBlock } from "@/components/CodeBlock";

export function AuthenticationSection() {
  return (
    <section id="intro-authentication" className="endpoint-card p-6 md:p-8 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-deep mb-3">Autenticação</h2>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-4xl">
        A autenticação na API utiliza JWT e exige o header{" "}
        <code className="font-mono text-[12px] bg-secondary border border-border text-brand-orange px-1.5 py-0.5 rounded">
          Authorization: Bearer &#123;accessToken&#125;
        </code>.<br />
        O fluxo ocorre em duas etapas: primeiro o parceiro gera o <strong>JWT de Parceiro</strong>,
        depois esse token é usado para gerar o <strong>accessToken</strong>, que permite o cadastro de empresas.<br />
        Para emissão, consulta ou cancelamento de notas fiscais, deve ser gerado o <strong>JWT de Empresa</strong>.
      </p>

      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-brand-blue/25 bg-brand-blue/5 p-4">
          <h3 className="text-sm font-bold text-brand-deep mb-2">1) Gerar JWT de Parceiro</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Monte o payload com <code className="font-mono text-xs">iat</code>,{" "}
            <code className="font-mono text-xs">exp</code> e{" "}
            <code className="font-mono text-xs">sub</code> (chave do parceiro), e assine com o{" "}
            <code className="font-mono text-xs">Secret</code> do parceiro.
          </p>
        </div>
        <div className="rounded-xl border border-brand-orange/25 bg-brand-orange/5 p-4">
          <h3 className="text-sm font-bold text-brand-deep mb-2">2) Gerar JWT de Empresa</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Use o JWT de Parceiro para autorizar a geração do token da empresa, informando{" "}
            <code className="font-mono text-xs">sub</code> (CNPJ da empresa) e{" "}
            <code className="font-mono text-xs">partnerKey</code> (chave do parceiro).
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-brand-deep">
                Tipo de JWT
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-brand-deep">
                Campos obrigatórios
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-brand-deep">
                Assinatura
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-brand-deep">
                Finalidade
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-3 align-top font-semibold text-brand-deep">JWT de Parceiro</td>
              <td className="px-4 py-3 align-top text-foreground/80">iat, exp, sub (chave do parceiro)</td>
              <td className="px-4 py-3 align-top text-foreground/80">Secret do parceiro</td>
              <td className="px-4 py-3 align-top text-foreground/80">Cadastro de Empresas</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 align-top font-semibold text-brand-deep">JWT de Empresa</td>
              <td className="px-4 py-3 align-top text-foreground/80">iat, exp, sub (CNPJ), partnerKey</td>
              <td className="px-4 py-3 align-top text-foreground/80">Secret da empresa</td>
              <td className="px-4 py-3 align-top text-foreground/80">Emissão, Consulta e Cancelamento de Notas</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid xl:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-brand-deep">Exemplo de payload JWT de Parceiro</h3>
          <CodeBlock
            value={{
              iat: 1765997468,
              exp: 1765997588,
              sub: "ABCabcCBAcbaA+CabcCBAc==",
            }}
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-brand-deep">Exemplo de payload JWT de Empresa</h3>
          <CodeBlock
            value={{
              iat: 1765997468,
              exp: 1765997588,
              sub: "99999999999999",
              partnerKey: "ABCabcCBAcbaA+CabcCBAc==",
            }}
          />
        </div>
      </div>
    </section>
  );
}
