# CSAC-Lite Verifier API

This directory contains the minimal public-safe backend surface for CSAC-Lite Verifier.

It is designed to be deployed on Scaleway or another controlled backend environment.

The backend intentionally does not implement proprietary CSAC proof-generation logic, protected transcript construction, confidential-computing attestation logic, ZK verification internals, or enterprise registry workflows.

---

## Endpoints

```text
GET  /health
POST /verify
```

---

## Run locally

```bash
cd server
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8080
```

Health check:

```bash
curl http://127.0.0.1:8080/health
```

Verify demo package:

```bash
curl -X POST http://127.0.0.1:8080/verify \
  -H "Content-Type: application/json" \
  -d @../examples/valid_demo_package.json
```

If using the frontend contract, send:

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

---

## Docker

Build:

```bash
docker build -t csac-lite-verifier-api .
```

Run:

```bash
docker run --rm -p 8080:8080 \
  -e ALLOWED_ORIGINS="*" \
  csac-lite-verifier-api
```

---

## Scaleway deployment notes

Recommended first deployment:

- Scaleway Serverless Containers or a small VPS;
- Python FastAPI container;
- HTTPS endpoint;
- CORS restricted to the GitHub Pages domain;
- rate limiting at reverse proxy or platform level;
- structured request logs;
- no sensitive secrets in the public repo.

Example environment:

```text
ALLOWED_ORIGINS=https://genesisverified.github.io
MAX_PACKAGE_BYTES=200000
```

Then configure the frontend API field with:

```text
https://your-scaleway-api-domain/verify
```

---

## Public-safe profile

The current backend runs only a public-safe demonstration profile.

It checks:

- package structure;
- supported public profile name;
- public proof reference presence;
- public metadata presence.

It does not implement protected enterprise profiles.

---

## Enterprise boundary

Future enterprise modules should live outside this public-safe backend or behind private modules/services.

Do not publish:

- protected transcript logic;
- enterprise proof-generation engine;
- TEE attestation internals;
- ZK circuit internals;
- production registry logic;
- operator secrets or keys.
