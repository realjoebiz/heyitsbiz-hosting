export interface RegistrantContact {
  name: string;
  email: string;
  addressLine1: string;
  city: string;
  postalCode: string;
  countryCode: string;
}

export interface DomainAvailability {
  domain: string;
  available: boolean;
  priceGbp: number;
}

export interface DomainRegistryClient {
  checkAvailability(domain: string): Promise<DomainAvailability>;
  register(
    domain: string,
    years: number,
    contact: RegistrantContact
  ): Promise<{ registeredAt: Date; expiresAt: Date }>;
  renew(domain: string, years: number): Promise<{ expiresAt: Date }>;
}

export class RegistryNotConfiguredError extends Error {
  constructor(domain?: string) {
    super(
      `No domain registry API is wired up yet${domain ? ` (checked: ${domain})` : ""}. ` +
        "Apply for a wholesale reseller account (OpenSRS, ResellerClub, or Enom/Tucows) — see SETUP.md #3 — " +
        "then implement DomainRegistryClient against their API in this file and swap it in below."
    );
    this.name = "RegistryNotConfiguredError";
  }
}

class NotConfiguredRegistryClient implements DomainRegistryClient {
  async checkAvailability(domain: string): Promise<DomainAvailability> {
    throw new RegistryNotConfiguredError(domain);
  }

  async register(domain: string): Promise<{ registeredAt: Date; expiresAt: Date }> {
    throw new RegistryNotConfiguredError(domain);
  }

  async renew(domain: string): Promise<{ expiresAt: Date }> {
    throw new RegistryNotConfiguredError(domain);
  }
}

// Swap this for a real implementation once a wholesale reseller account exists (SETUP.md #3).
export const domainRegistry: DomainRegistryClient = new NotConfiguredRegistryClient();
