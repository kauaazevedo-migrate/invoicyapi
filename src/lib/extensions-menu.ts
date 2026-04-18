import type { Endpoint } from "@/types/api";

export const EXTENSIONS_CATEGORY = "Extensões";

export const EXTENSION_GROUP_ORDER = [
  "Importação de Documentos",
  "Manifestação do destinatário",
  "InvoiCy Compliance",
  "InvoiCy Certificado Digital",
  "InvoiCy GNRE",
  "InvoiCy OCR",
  "InvoiCy ECONF",
  "InvoiCy Tax Template",
] as const;

export function getExtensionGroup(item: Pick<Endpoint, "id" | "title" | "path">) {
  const id = item.id.toLowerCase();
  const title = item.title.toLowerCase();
  const path = item.path.toLowerCase();

  if (
    id.includes("importar-documentos") ||
    id.includes("consultar-importacao") ||
    id.includes("consulta-retroativa-nfs-e")
  ) {
    return "Importação de Documentos";
  }

  if (title.includes("distribuição dfe") || title.includes("distribuicao dfe")) {
    return "Manifestação do destinatário";
  }

  if (id.includes("agerartoken") || id.includes("conciliacao")) {
    return "InvoiCy Compliance";
  }

  if (
    id.includes("gerar-link-de-venda") ||
    id.includes("gerar-senha") ||
    id.includes("validade-certificado") ||
    id.includes("baixar-certificado")
  ) {
    return "InvoiCy Certificado Digital";
  }

  if (id.includes("gnre") || path.includes("/gnre")) {
    return "InvoiCy GNRE";
  }

  if (
    id.includes("importacao-de-nfs-e") ||
    id.includes("consulta-importacao") ||
    id.includes("ocr")
  ) {
    return "InvoiCy OCR";
  }

  if (id.includes("econf")) {
    return "InvoiCy ECONF";
  }

  if (title.includes("serviços do município") || title.includes("servicos do municipio")) {
    return "InvoiCy Tax Template";
  }

  return "Outras Extensões";
}
