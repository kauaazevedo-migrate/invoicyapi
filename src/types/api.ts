export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface Endpoint {
  id: string;
  title: string;
  method: HttpMethod | string;
  path: string;
  description?: string;
  request_body?: unknown;
  response_body?: unknown;
  usage_guide?: string;
  article_url?: string;
  article_label?: string;
  examples_url?: string;
  examples_label?: string;
  notes?: string;
}

export type EndpointsDb = Record<string, Endpoint[]>;

export interface ReturnCode {
  category?: string;
  code?: string | number;
  message?: string;
  [k: string]: unknown;
}
