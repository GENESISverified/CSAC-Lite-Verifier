# Frontend Architecture

The CSAC-Lite Verifier frontend is designed as a public verification surface hosted from GitHub.

It should remain lightweight, readable, and safe to publish.

---

## Architecture principle

The frontend must not contain sensitive protocol logic.

It should provide:

- a premium public landing page;
- proof package upload;
- safe public demo checks;
- visual verification status;
- configurable backend endpoint;
- documentation links;
- public examples.

The protected verification logic should run on a private backend.

---

## Recommended deployment model

```text
GitHub Pages
  Public landing page
  Public verifier interface
  Public documentation
        |
        v
Scaleway Backend API
  Protected verification profiles
  Audit logs
  Access control
  Rate limiting
  Future enterprise bridge
```

---

## Why GitHub for the frontend?

GitHub provides:

- public credibility;
- open-source visibility;
- easy documentation access;
- simple static hosting;
- developer trust;
- transparent project structure.

It is ideal for adoption and demonstration.

---

## Why Scaleway for the backend?

A private backend allows Genesis Verified to protect:

- verification profile internals;
- advanced validation logic;
- enterprise API rules;
- audit logs;
- future premium modules;
- operational security.

This avoids exposing the engine while still offering a public verifier.

---

## Public frontend responsibilities

The frontend can safely:

- load JSON files;
- display proof package metadata;
- validate basic public format requirements;
- show a verification decision returned by the backend;
- explain the status to the user;
- link to public documentation.

---

## Frontend non-goals

The frontend should not:

- generate enterprise proof packages;
- contain proprietary verification profiles;
- reveal protected proof construction;
- implement confidential-computing logic;
- expose registry internals;
- manage production secrets.

---

## Configurable backend endpoint

The frontend currently supports a configurable endpoint field.

Example target:

```text
https://api.genesisverified.com/verify
```

Temporary Scaleway target example:

```text
https://csac-lite-api.example.scaleway.app/verify
```

When no endpoint is configured, the frontend uses public demo mode only.

---

## Public demo mode

Public demo mode is intentionally limited.

It checks only safe package-level properties such as:

- required fields;
- supported public profile name;
- presence of a demonstration signature field;
- presence of a demonstration integrity reference.

It does not perform the protected enterprise verification logic.

---

## Security boundary

The core boundary is:

> GitHub explains and displays. Scaleway verifies and protects.

This boundary should remain stable as the project evolves.
