# CSAC-Lite Verifier — Public Overview

CSAC-Lite Verifier is a public verification surface for structured proof packages.

It is designed to help operators, developers, auditors, and institutions inspect whether a submitted computation result is consistent with a declared verification package.

This repository deliberately exposes the user interface, the public documentation, and a safe demonstration format. It does not expose the proprietary proof-generation engine or the full enterprise protocol internals.

---

## Why this project exists

Digital operators increasingly rely on automated decisions and sensitive computation pipelines:

- eligibility scoring;
- financial risk calculations;
- public-sector arbitration;
- compliance workflows;
- confidential computation outputs;
- AI or model-assisted decisions;
- regulated SaaS processes.

In these environments, the question is no longer only:

> What result did the system return?

The stronger question is:

> Can this result be independently checked against a proof package?

CSAC-Lite Verifier is built for that second question.

---

## Public verifier role

The public verifier is not the full proof engine.

Its role is to:

1. Load a submitted proof package.
2. Display its declared profile and metadata.
3. Run safe public checks.
4. Send the package to a private backend when advanced verification is required.
5. Return a clear verification status.

The public verifier helps build trust and adoption while keeping the sensitive verification profiles protected.

---

## Protected backend role

The protected backend should be hosted separately, for example on Scaleway.

Its role is to:

- apply controlled verification profiles;
- enforce rate limits and API rules;
- protect proprietary verification logic;
- generate audit logs;
- support future enterprise profiles;
- integrate with private proof-layer services.

This design allows GitHub to act as the public front office while Scaleway hosts the sensitive back office.

---

## What is intentionally not public

This repository does not publish:

- proprietary proof-generation logic;
- full transcript construction;
- confidential-computing orchestration;
- attestation pipeline internals;
- ZK circuit implementation details;
- production registry design;
- enterprise operator dashboard internals.

This boundary is intentional.

---

## Positioning

CSAC-Lite Verifier is best understood as:

> A public interface for verifying submitted proof packages, connected to protected verification services when needed.

Genesis Verified remains the broader trust infrastructure brand, while CSAC-Lite Verifier is the open entry point for adoption.
