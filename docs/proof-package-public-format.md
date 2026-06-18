# Public Proof Package Format

This document describes the safe public demonstration shape accepted by the CSAC-Lite Verifier frontend.

It is not a disclosure of the full enterprise proof package format.

---

## Public package goal

The public package format allows a user to submit a structured object containing:

- version information;
- algorithm identifier;
- visible result summary;
- public proof reference fields;
- metadata useful for audit display.

The protected backend may apply private verification profiles that are not documented in this public file.

---

## Safe public example

```json
{
  "version": "CSAC-LITE-v1",
  "algorithm_id": "demo_decision_v1",
  "result": {
    "decision": "APPROVED",
    "score": 87
  },
  "proof": {
    "integrity_ref": "demo-integrity-reference",
    "signature": "demo-signature-value",
    "public_key": "demo-public-key"
  },
  "metadata": {
    "created_at": "2026-06-18T00:00:00Z",
    "operator": "Genesis Verified",
    "trust_profile": "lite-demo"
  }
}
```

---

## Required public fields

For the public demo profile, the frontend expects:

- `version`
- `algorithm_id`
- `result`
- `proof`
- `metadata`

The demo verifier also checks whether a public proof object includes a demonstration signature reference and an integrity reference.

---

## Enterprise profiles

Enterprise profiles may require additional fields, stricter validation, confidential verification material, external references, registry identifiers, or protected backend logic.

Those profiles are intentionally not specified here.

---

## Design boundary

The public format is designed to support demonstration and operator understanding.

It must not become a reproduction guide for the protected proof engine.
