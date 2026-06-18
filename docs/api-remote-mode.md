# Remote API Mode

CSAC-Lite Verifier supports a remote API mode where the public frontend sends a submitted proof package to a protected backend.

This backend can be hosted on Scaleway or any controlled infrastructure operated by Genesis Verified.

---

## Goal

Remote API mode separates the public user experience from sensitive verification logic.

The frontend remains open and auditable. The backend remains protected and controlled.

---

## Public request shape

The public frontend sends a submitted package to the backend using a simple JSON request.

```http
POST /verify
Content-Type: application/json
```

```json
{
  "package": {
    "version": "CSAC-LITE-v1",
    "algorithm_id": "demo_decision_v1",
    "result": {},
    "proof": {},
    "metadata": {}
  }
}
```

This public shape is intentionally generic. It is not a disclosure of the full enterprise proof format.

---

## Public response shape

The backend should return a clear verification decision.

```json
{
  "valid": true,
  "status": "VERIFIED",
  "profile": "CSAC-LITE-v1",
  "summary": "The submitted package passed the configured verification profile.",
  "checks": {
    "format": "valid",
    "integrity": "valid",
    "signature": "valid",
    "metadata": "valid"
  }
}
```

For rejected packages:

```json
{
  "valid": false,
  "status": "INVALID",
  "summary": "The submitted package did not pass the configured verification profile.",
  "checks": {
    "format": "valid",
    "integrity": "invalid",
    "signature": "not_checked",
    "metadata": "valid"
  }
}
```

---

## Recommended backend endpoints

Minimum endpoints:

```text
GET  /health
POST /verify
```

Optional future endpoints:

```text
POST /report
POST /verify/batch
GET  /profiles/public
```

---

## Scaleway deployment recommendation

A first backend can be implemented as:

- FastAPI service;
- Docker container;
- Scaleway Serverless Containers or a small VPS;
- HTTPS endpoint;
- CORS restricted to the GitHub Pages domain;
- basic rate limiting;
- structured audit logs.

---

## Security recommendations

The backend should:

- reject oversized packages;
- validate JSON strictly;
- avoid returning sensitive diagnostic internals;
- return public-safe error messages;
- log verification attempts without storing sensitive user payloads by default;
- restrict CORS;
- implement rate limiting;
- version its public profiles.

---

## What the public API must not expose

The public API should not expose:

- proprietary verification algorithms;
- internal transcript construction;
- private attestation logic;
- key material;
- enterprise profile internals;
- registry internals;
- confidential-computing implementation details.

---

## Boundary principle

Remote API mode should obey this rule:

> The frontend receives a decision. It does not receive the protected method.

This keeps the public project useful without turning it into a reproduction guide.
