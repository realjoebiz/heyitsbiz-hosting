const CF_API = "https://api.cloudflare.com/client/v4";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name} — see SETUP.md #4`);
  }
  return value;
}

async function cfFetch(path: string, init: RequestInit = {}): Promise<any> {
  const token = requireEnv("CLOUDFLARE_API_TOKEN");
  const res = await fetch(`${CF_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  const body = await res.json();
  if (!res.ok || body.success === false) {
    throw new Error(`Cloudflare API error on ${path}: ${JSON.stringify(body.errors ?? body)}`);
  }
  return body.result;
}

export interface CreatedZone {
  zoneId: string;
  nameservers: string[];
}

export async function createZone(domain: string): Promise<CreatedZone> {
  const accountId = requireEnv("CLOUDFLARE_ACCOUNT_ID");
  const zone = await cfFetch("/zones", {
    method: "POST",
    body: JSON.stringify({
      name: domain,
      account: { id: accountId },
      type: "full",
    }),
  });

  return { zoneId: zone.id, nameservers: zone.name_servers ?? [] };
}

export async function getZoneNameservers(zoneId: string): Promise<string[]> {
  const zone = await cfFetch(`/zones/${zoneId}`);
  return zone.name_servers ?? [];
}
