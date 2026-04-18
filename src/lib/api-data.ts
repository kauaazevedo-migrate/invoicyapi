import endpointsRaw from "@/data/endpoints.json";
import returnCodesRaw from "@/data/returnCodes.json";
import type { Endpoint, EndpointsDb, ReturnCode } from "@/types/api";

export const ENDPOINTS_DB = endpointsRaw as unknown as EndpointsDb;
export const RETURN_CODES_DB = returnCodesRaw as unknown as ReturnCode[];

// Display order; "WebHooks" in JSON normalized to display "Webhooks"
export const CATEGORY_ORDER = [
  "Empresas",
  "WebHooks",
  "Exportações",
  "Extensões",
  "NF-e",
  "NFC-e",
  "NFS-e",
  "NFCom",
  "MDF-e",
  "CT-e",
] as const;

export const CATEGORY_LABEL: Record<string, string> = {
  WebHooks: "Webhooks",
};

export const ARTICLE_LINKS: Record<string, string> = {
  "NF-e": "https://desenvolvedores.migrate.info/ModulosFiscais/Documentos/NFe/",
  "NFC-e": "https://desenvolvedores.migrate.info/ModulosFiscais/Documentos/NFCe/",
  "NFS-e": "https://desenvolvedores.migrate.info/ModulosFiscais/Documentos/NFSe/",
  "CT-e": "https://desenvolvedores.migrate.info/ModulosFiscais/Documentos/CTe/",
  "MDF-e": "https://desenvolvedores.migrate.info/ModulosFiscais/Documentos/MDFe/",
  NFCom: "https://desenvolvedores.migrate.info/ModulosFiscais/Documentos/NFCom/",
  Extensões: "https://desenvolvedores.migrate.info/Extensoes/DashboarddeGestaoFiscal/",
};

export function getMethodClass(method: string): string {
  const m = method.toUpperCase();
  if (["GET", "POST", "PUT", "DELETE", "PATCH"].includes(m)) {
    return `method-${m}`;
  }
  return "method-GET";
}

export function flattenEndpoints(): Array<Endpoint & { category: string }> {
  const out: Array<Endpoint & { category: string }> = [];
  CATEGORY_ORDER.forEach((cat) => {
    (ENDPOINTS_DB[cat] || []).forEach((e) => out.push({ ...e, category: cat }));
  });
  return out;
}
