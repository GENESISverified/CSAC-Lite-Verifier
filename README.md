# CSAC-Lite Verifier

**Open verification. Enterprise-grade proof.**

CSAC-Lite Verifier is a modern open-source verification interface for CSAC-Lite proof packages. It is designed to make critical computations easier to audit, verify, and explain through lightweight cryptographic checks.

The project provides a free verification layer for operators, developers, auditors, institutions, and integrators who need to validate that a computation result has not been altered after execution.

> CSAC-Lite Verifier verifies proof packages. It does not generate full enterprise proof infrastructure by itself.

---

## Purpose

Critical digital systems increasingly produce results that must be trusted by third parties: scoring engines, public decision systems, compliance workflows, financial risk calculations, confidential computation services, and GovTech platforms.

A classical signature can prove that a server signed a result. CSAC-Lite aims to go further by linking the result to a structured proof transcript.

The verifier checks whether a proof package is internally consistent by validating:

- the result commitment;
- the session binding;
- the transcript hash;
- the signature over the transcript;
- the declared proof metadata;
- the tamper-evidence chain.

The goal is simple:

> Transform a computation result into a verifiable result.

---

## What is CSAC-Lite?

CSAC-Lite is a compact verification model derived from the broader CSAC protocol family. It reduces the number of transmitted proof objects by using a single transcript hash as the central verification anchor.

At a high level, a CSAC-Lite proof package binds together:

```text
result -> commitment -> proof transcript -> signature -> verification status
```

A simplified verification chain is:

```text
R + N_init          -> C
C + proof metadata  -> T
T + public key      -> signature verification
```

Where:

- `R` is the computation result;
- `N_init` is the initial session nonce;
- `C` is the result commitment;
- `T` is the transcript hash;
- `signature` proves that the declared signer approved the transcript;
- `proof_package` is the complete object submitted to the verifier.

---

## Open-source scope

This repository focuses on the free and public verification layer.

Included in the open version:

- proof package format documentation;
- local browser-based verifier;
- example valid and invalid proof packages;
- transcript hash verification;
- result commitment verification;
- signature verification demo;
- developer-friendly SDK examples;
- audit-style verification report output.

Not included in the open verifier:

- full proof generation engine;
- production TEE orchestration;
- enterprise ZK proving circuits;
- confidential computing deployment;
- proof registry infrastructure;
- regulated operator dashboards;
- managed API, SLA, or compliance support.

Those capabilities belong to the enterprise-grade proof layer.

---

## Product architecture

The intended ecosystem is divided into two layers.

### 1. CSAC-Lite Verifier — open-source

Free verification interface for proof packages.

It allows anyone to inspect, validate, and understand a CSAC-Lite proof package without depending on a closed server.

### 2. Genesis Verified Proof Layer — enterprise

Premium infrastructure for generating, orchestrating, storing, and certifying proof packages in high-assurance environments.

Typical enterprise capabilities include:

- API-based proof generation;
- confidential computing integration;
- TEE attestation adapters;
- ZK circuit customization;
- audit registry;
- proof history;
- webhooks;
- enterprise SDKs;
- sovereign or private deployment;
- compliance-oriented reporting.

---

## Example proof package

A minimal CSAC-Lite proof package may look like this:

```json
{
  "version": "CSAC-LITE-v1",
  "algorithm_id": "demo_arbitrage_v1",
  "result": {
    "decision": "APPROVED",
    "score": 87
  },
  "session": {
    "N_init": "base64-session-nonce"
  },
  "proof": {
    "C": "hex-result-commitment",
    "T": "hex-transcript-hash",
    "signature": "base64-signature",
    "public_key": "base64-public-key"
  },
  "hashes": {
    "quote_init_hash": "hex-quote-init-hash",
    "zk_proof_hash": "hex-zk-proof-hash",
    "result_hash": "hex-result-hash"
  },
  "metadata": {
    "created_at": "2026-06-18T00:00:00Z",
    "operator": "Genesis Verified",
    "trust_profile": "lite-demo"
  }
}
```

The verifier recomputes the expected values and returns a structured result:

```json
{
  "valid": true,
  "checks": {
    "commitment": "valid",
    "transcript": "valid",
    "signature": "valid",
    "format": "valid"
  }
}
```

---

## Verification model

A simplified CSAC-Lite verifier performs the following checks:

### 1. Validate proof package structure

The verifier confirms that the package contains the required fields:

- `version`
- `algorithm_id`
- `result`
- `session.N_init`
- `proof.C`
- `proof.T`
- `proof.signature`
- `proof.public_key`
- `hashes`

### 2. Recompute the result commitment

```text
C_check = H(canonical_json(result) || N_init)
```

Then compare:

```text
C_check == proof.C
```

### 3. Recompute the transcript hash

```text
T_check = H(
  domain_separator ||
  quote_init_hash ||
  C ||
  zk_proof_hash ||
  result_hash ||
  algorithm_id
)
```

Then compare:

```text
T_check == proof.T
```

### 4. Verify the signature

```text
Verify(public_key, signature, T_check)
```

### 5. Return a human-readable decision

The verifier produces:

- global status: `VALID` or `INVALID`;
- failed check reason;
- transcript hash;
- algorithm identifier;
- timestamp;
- report-ready verification summary.

---

## Planned repository structure

```text
csac-lite-verifier/
│
├── README.md
├── LICENSE
├── docs/
│   ├── protocol.md
│   ├── proof-package-format.md
│   └── examples.md
│
├── web/
│   ├── index.html
│   ├── app.js
│   └── style.css
│
├── sdk/
│   ├── python/
│   │   └── csac_verify.py
│   └── js/
│       └── csacVerify.js
│
├── examples/
│   ├── valid_proof_package.json
│   └── invalid_proof_package.json
│
└── server/
    └── optional_fastapi_demo.py
```

---

## Roadmap

### Phase 0 — Repository foundation

- README
- proof package format
- examples
- open-source positioning

### Phase 1 — Web verifier

- modern browser interface
- drag-and-drop JSON upload
- local verification
- visual proof chain
- valid / invalid status panel

### Phase 2 — SDKs

- JavaScript verifier
- Python verifier
- command-line verification example

### Phase 3 — Reports

- audit-style verification report
- JSON export
- PDF export

### Phase 4 — Advanced verification adapters

- TEE attestation hash handling
- ZK proof hash metadata validation
- external registry compatibility

### Phase 5 — Enterprise bridge

- API verification mode
- proof registry integration
- enterprise proof package profiles

---

## Intended use cases

CSAC-Lite Verifier is designed for environments where computation results must be auditable and tamper-evident:

- public-sector decision systems;
- GovTech platforms;
- financial risk scoring;
- compliance workflows;
- confidential computing proofs;
- AI or model-output audit trails;
- procurement and grant arbitration;
- regulated operator reporting;
- critical SaaS decision engines.

---

## Security status

This repository is currently in early foundation stage.

The initial implementation is intended for:

- public demonstration;
- protocol explanation;
- developer testing;
- proof package format stabilization;
- verifier UX development.

It should not be treated as audited production cryptography until the following are completed:

- independent cryptographic review;
- implementation audit;
- test vectors;
- signature verification hardening;
- canonical serialization review;
- threat model publication;
- versioned specification release.

---

## Intellectual property notice

CSAC-Lite Verifier is published as an open verification layer.

The open-source verifier does not imply publication of the full enterprise proof generation engine, confidential computing orchestration layer, TEE deployment logic, ZK circuit generation infrastructure, or premium Genesis Verified proof services.

The CSAC protocol family and related proof-layer concepts may be subject to intellectual property protection, filings, or proprietary enterprise implementations.

---

## Brand separation

- **Genesis Verified**: trust and proof infrastructure brand.
- **CSAC-Lite**: compact proof verification model.
- **CSAC-Lite Verifier**: open-source verifier for proof packages.
- **Genesis Verified Proof Layer**: enterprise-grade proof generation, attestation, registry, and audit platform.

---

## Status

Current stage: **repository foundation**.

Next milestone: **first local web verifier**.

---

## License

License to be defined before public release.

Recommended options under review:

- Apache-2.0 for broad adoption;
- MIT for maximum simplicity;
- custom dual-license model for open-core strategy.

---

## Contact

Project maintained under the Genesis Verified initiative.

For enterprise proof-layer discussions, deployment, or integration inquiries, contact the project owner through the official GitHub organization or repository channels.
