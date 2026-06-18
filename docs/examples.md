# Public Examples

This page explains the safe demonstration examples included in the repository.

The examples are intentionally simplified. They are made for frontend testing, documentation, and operator education.

They are not enterprise proof packages.

---

## Valid demo package

File:

```text
examples/valid_demo_package.json
```

This package contains the public fields required by the demo verifier:

- version;
- algorithm identifier;
- result summary;
- proof reference object;
- metadata.

It should return a positive result in public demo mode.

---

## Invalid demo package

File:

```text
examples/invalid_demo_package.json
```

This package intentionally omits public proof reference data.

It should fail in public demo mode.

---

## Remote backend examples

When a Scaleway backend is configured, the frontend sends the uploaded package to the configured endpoint.

The backend then returns the final decision.

The frontend does not need to know the protected verification method.

---

## Safe demonstration principle

All public examples must remain safe.

They should demonstrate:

- how a package is loaded;
- how a status is displayed;
- how the backend response is rendered;
- how operators can understand the verification result.

They should not disclose proprietary proof construction.
