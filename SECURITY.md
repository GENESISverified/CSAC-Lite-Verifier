# Security Policy

CSAC-Lite Verifier is currently in early foundation stage.

This repository exposes a public verification surface and demonstration backend scaffold. It does not expose proprietary Genesis Verified proof-generation internals or enterprise verification profiles.

---

## Supported status

Current version:

```text
0.1.0-public-safe
```

Security status:

```text
Public demonstration / controlled evaluation only
```

Do not treat this repository as audited production cryptography.

---

## Responsible disclosure

If you identify a vulnerability or accidental disclosure, report it privately to the project maintainer through the official GitHub account or repository contact channel.

Please do not open a public issue for sensitive vulnerabilities, secrets, exploit paths, or protocol-disclosure concerns.

---

## Sensitive information policy

Never commit:

- API keys;
- private keys;
- tokens;
- real proof-generation secrets;
- protected verification profiles;
- production registry data;
- enterprise operator credentials;
- confidential customer packages.

---

## Public repository boundary

The public repository may include:

- frontend interface;
- public documentation;
- safe demonstration packages;
- basic public-safe backend surface;
- non-sensitive deployment notes.

The public repository must not include:

- proprietary transcript construction;
- full CSAC proof-generation logic;
- confidential-computing attestation internals;
- ZK circuit internals;
- enterprise profile implementations;
- registry internals;
- customer-specific verification data.

---

## Production warning

Before production use, the project requires:

- independent cryptographic review;
- implementation audit;
- API hardening;
- rate limiting;
- CORS restriction;
- strict payload validation;
- legal and licensing review;
- threat model publication.
