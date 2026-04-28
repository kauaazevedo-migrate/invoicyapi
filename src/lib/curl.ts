import type { Endpoint } from "@/types/api";

export function buildCurl(endpoint: Endpoint, baseUrl: string): string {
  const lines: string[] = [
    `curl -X ${endpoint.method} '${baseUrl}${endpoint.path}' \\`,
    `  -H 'Authorization: Bearer {accessToken}' \\`,
  ];

  const hasBody = endpoint.request_body !== null && endpoint.request_body !== undefined;
  if (hasBody) {
    lines.push(`  -H 'Content-Type: application/json' \\`);
    const body =
      typeof endpoint.request_body === "string"
        ? endpoint.request_body
        : JSON.stringify(endpoint.request_body, null, 2);
    lines.push(`  -d '${body.replace(/'/g, "'\\''")}'`);
  } else {
    lines[lines.length - 1] = `  -H 'Authorization: Bearer {accessToken}'`;
  }

  return lines.join("\n");
}
